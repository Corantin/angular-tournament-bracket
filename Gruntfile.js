module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-open');

    grunt.initConfig({
        bower: {
            dev: {
                dest: 'demo/libs'
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src/', src: '**/*.js', dest: 'dist/js/' }
                ]
            },
            demo: {
                files: [
                    { expand: true, flatten: true, cwd: 'dist/', src: ['**/*.js', '**/*.css'], dest: 'demo/libs/angular-tournament-bracket/', filter: 'isFile' }
                ]
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000,
                    base: 'demo',
                    livereload: true
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        eslint: {
            options: {

            },
            target: ['src/**/*.js', 'demo/app/**/*.js']
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'demo/app/**/*.js'],
            options: {
                '-W041': false,
                debug: true,
                eqeqeq: false,
                globals: {
                    jQuery: true
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                background: false,
                singleRun: true
            }
        },
        open : {
            dev: {
                path: 'http://localhost:9000/index.html',
                app: 'Chrome'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                    'dist/css/angular-tournament-bracket.css': 'src/angular-tournament-bracket.scss'
                }
            }
        },
        uglify: {
            js: { //target
                src: ['./src/angular-tournament-bracket.js'],
                dest: './dist/js/angular-tournament-bracket.min.js'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            files: ['src/*.js', 'src/*.css'],
            tasks: ['jshint', 'copy']
        }
    });

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', ['jshint', 'karma']);

    grunt.registerTask('serve', ['connect', 'open:dev', 'watch']);

    grunt.registerTask('build-app-dev', ['sass', 'cssmin', 'uglify', 'copy:main', 'copy:demo']);
    //grunt.registerTask('copy-all', ['copy:main', 'copy:demo']);
    grunt.registerTask('css', ['sass', 'cssmin']);

};
