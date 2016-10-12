(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$log', 'tournamentService'];

    function AppController($scope, $log, tournamentService) {
        var self = this;


        $scope.tournamentBracket = [
            {
                roundOf: 8,
                side: 'left',
                header: 'Quarter-finals',
                games: [
                    { id: 1, number: 1, teams: [
                        { id: 1320, name: 'Moose', image: 'https://cache.kreezee.com/images/teams/eebe35b.png', score: 3 },
                        { id: 1318, name: 'Lions', image: 'https://cache.kreezee.com/images/teams/fba61501.png', score: 2 }
                    ] },
                    { id: 3, number: 3, teams: [
                        { id: 1323, name: 'Sharks', image: 'https://cache.kreezee.com/images/teams/4fc77e6f.png', score: 1 },
                        { id: 1324, name: 'Thunder', image: 'https://cache.kreezee.com/images/teams/333c6a36.png', score: 4 }
                    ] }
                ]
            },
            {
                roundOf: 4,
                side: 'left',
                header: 'Semi-finals',
                games: [
                    { id: 5, number: 5, teams: [
                        { id: 1320, name: 'Moose', image: 'https://cache.kreezee.com/images/teams/eebe35b.png', score: 5 },
                        { id: 1324, name: 'Thunder', image: 'https://cache.kreezee.com/images/teams/333c6a36.png', score: 4 }
                    ] }
                ]
            },
            {
                roundOf: 2,
                side: 'final',
                header: 'Final',
                games: [
                    { id: 7, number: 7, teams: [
                        { id: 1320, name: 'Moose', image: 'https://cache.kreezee.com/images/teams/eebe35b.png', score: 3 },
                        { id: 1325, name: 'Predators', image: 'https://cache.kreezee.com/images/teams/65cec4aa.png', score: 2 }
                    ] }, {}
                ]
            },
            {
                roundOf: 4,
                side: 'right',
                header: 'Semi-finals',
                games: [
                    {
                        id: 6, number: 6, teams: [
                            { id: 1321, name: 'Bears', image: 'https://cache.kreezee.com/images/teams/2353e71e.png', score: 2 },
                            { id: 1325, name: 'Predators', image: 'https://cache.kreezee.com/images/teams/65cec4aa.png', score: 5 }
                        ]
                    }
                ]
            },
            {
                roundOf: 8,
                side: 'right',
                header: 'Quarter-finals',
                games: [
                    { id: 2, number: 2, teams: [
                        { id: 1321, name: 'Bears', image: 'https://cache.kreezee.com/images/teams/2353e71e.png', score: 4 },
                        { id: 1319, name: 'Tigers', image: 'https://cache.kreezee.com/images/teams/788c951f.png', score: 3 }
                    ] },
                    { id: 4, number: 4, teams: [
                        { id: 1322, name: 'Defenders', image: 'https://cache.kreezee.com/images/teams/ebb396e4.png', score: 2 },
                        { id: 1325, name: 'Predators', image: 'https://cache.kreezee.com/images/teams/65cec4aa.png', score: 4 }
                    ] }
                ]
            }
        ];

        $scope.teams = [
            { id: 1, name: 'Moose', logo: 'https://cache.kreezee.com/images/teams/eebe35b.png' },
            { id: 2, name: 'Lions', logo: 'https://cache.kreezee.com/images/teams/eebe35b.png' },
            { id: 3, name: 'Bears', logo: 'https://cache.kreezee.com/images/teams/eebe35b.png' },
            { id: 4, name: 'Tigers', logo: 'https://cache.kreezee.com/images/teams/eebe35b.png' },
            { id: 5, name: 'Sharks', logo: 'https://cache.kreezee.com/images/teams/eebe35b.png' },
            { id: 6, name: 'Thunder', logo: 'https://cache.kreezee.com/images/teams/eebe35b.png' },
            { id: 7, name: 'Defenders', logo: 'https://cache.kreezee.com/images/teams/eebe35b.png' },
            { id: 8, name: 'Predators', logo: 'https://cache.kreezee.com/images/teams/eebe35b.png' }
        ];

        var rounds = tournamentService.generateGames($scope.teams, 'single-elimination');
    }
})();
