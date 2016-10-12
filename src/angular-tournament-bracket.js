(function () {
    'use strict';

    angular
        .module('ngTournamentBracket', [])
        .run(['$templateCache', function ($templateCache) {
            $templateCache.put('ngTournamentBracket/templates/tournamentBracket.html', [
                '<div class="tournament-bracket-container">',
                    '<table>',
                        '<thead>',
                            '<tr>',
                                '<th ng-repeat="round in teams">',
                                    '<span>{{round.header}}</span>',
                                '</th>',
                            '</tr>',
                        '</thead>',
                        '<tbody>',
                            '<tr>',
                                '<td ng-repeat="round in teams" class="round round-{{ round.roundOf }}" ng-class="round.side == \'right\' ? \'reversed\' : \'forward\'">',
                                    '<tournament-game games="round.games"></tournament-game>',
                                '</td>',
                            '</tr>',
                        '</tbody>',
                    '</table>',
                '</div>'
            ].join(''));

            $templateCache.put('ngTournamentBracket/templates/tournamentGame.html', [
                '<div class="tournament-round-container">',
                    '<div ng-repeat="game in games" class="tournament-game">',
                        '<div class="game">',
                            '<div ng-repeat="team in game.teams" class="segment" ng-class="$index == 0 ? \'top\' : \'bottom\'">',
                                '<span ng-class="isWinner(game.teams, team.id) ? \'winner\' : \'loser\'">',
                                    '<a href="#">',
                                        '<img ng-src="{{team.image}}" alt="{{team.name}}" />',
                                        '<span>{{team.name}}</span>',
                                    '</a>',
                                    '<strong>{{team.score}}</strong>',
                                '</span>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join(''));

        }])
        .factory('tournamentService', ['$log', function($log) {
                function addByes(teams, nbByes) {
                    for (var i = 1; i <= nbByes; i++) {
                        teams.push ({ bye: true });
                    }
                }

                function generateGames(teams) {
                    var games = [];
                    var nbTeams = teams.length;
                    for (var i = 1; i <= nbTeams / 2; i++) {
                        games.push(new Game(teams[nbTeams - i], teams[i - 1]));
                    }

                    return games;
                }

                function shuffle(array) {
                    var counter = array.length;

                    // While there are elements in the array.
                    while (counter > 0) {
                        // Pick a random index.
                        var index = Math.floor(Math.random() * counter);

                        // Decrease counter by 1.
                        counter--;

                        // And swap the last element with it.
                        var temp = array[counter];
                        array[counter] = array[index];
                        array[index] = temp;
                    }

                    return array;
                }

                function Game(visitor, home) {
                    return {
                        id: generateUUID(),
                        visitor: visitor,
                        home: home
                    };
                }

                function generateUUID() {
                    var d = new Date().getTime();

                    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = (d + Math.random()*16)%16 | 0;
                        d = Math.floor(d/16);
                        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
                    });

                    return uuid;
                }

                return {
                    generateGames: function(teams, type, shuffleTeams) {
                        if (teams.length < 3) {
                            // TODO Raise error.
                            $log.error('You must have at least 3 teams.');
                            return;
                        }

                        if (teams.length > 64) {
                            // TODO Raise error.
                            $log.error('You can only create brackets for 64 or fewer teams.');
                            return;
                        }

                        if (angular.isUndefined(type)) {
                            // TODO Raise error.
                            $log.error('The type of tournament is undefined.');
                            return;
                        }
                        // Check if the teams array needs to be shuffled.
                        if (shuffleTeams) {
                            teams = shuffle(teams);
                        }

                        switch (type) {
                            case 'single-elimination':
                                break;

                            case 'double-elimination':
                                break;

                            case 'round-robin':
                                break;
                        }

                        // Get the number of rounds.
                        var nbRounds = Math.ceil(Math.log(teams.length) / Math.log(2));

                        // Get the number of maximum team.
                        var nbTeams = Math.pow(2, nbRounds);

                        // Check if bye needs to be added.
                        if (nbTeams != teams.length) {
                            addByes(teams, nbTeams - teams.length);
                        }

                        // Generate first round games.
                        var firstRoundGames = generateGames(teams);

                        var rounds = [];
                        for (var i = 0; i < nbRounds; i++) {
                            var game;

                            // Dispath first round games.
                            if (i == 0) {
                                rounds.push({ leftBracket: [], rightBracket: [] });

                                for (var j = 0; j < firstRoundGames.length; j++) {
                                    // left bracket.
                                    if ((j % 2) === 0) {
                                        rounds[i].leftBracket.push(firstRoundGames[j]);
                                    } else { // right side.
                                        rounds[i].rightBracket.push(firstRoundGames[j]);
                                    }
                                }

                            } else if (i == nbRounds - 1) {
                                rounds.push({ championship: [], bronze: [] });

                                game = new Game(rounds[i - 1].leftBracket[0].id, rounds[i - 1].rightBracket[0].id);
                                rounds[i].championship.push(game);
                                rounds[i].bronze.push(game);

                            } else {
                                rounds.push({ leftBracket: [], rightBracket: [] });

                                for (var x = 0; x < rounds[i - 1].leftBracket.length / 2; x+=2) {
                                    game = new Game(rounds[i - 1].leftBracket[x].id, rounds[i - 1].leftBracket[x + 1].id);
                                    rounds[i].leftBracket.push(game);
                                }

                                for (var y = 0; y < rounds[i - 1].rightBracket.length / 2; y++) {
                                    game = new Game(rounds[i - 1].rightBracket[y].id, rounds[i - 1].rightBracket[y + 1].id);
                                    rounds[i].rightBracket.push(game);
                                }
                            }

                        }

                        /*
                            [
                                {
                                    roundOf: 8,
                                    header: 'Quarter-finals',
                                    games: [
                                        {}, {}
                                    ]
                                },
                                {
                                    roundOf: 4,
                                    header: 'Semi-finals',
                                    games: [
                                        {}
                                    ]
                                },
                                {
                                    roundOf: 2,
                                    header: 'Final',
                                    games: [
                                        {}, {}
                                    ]
                                },
                                {
                                    roundOf: 4,
                                    header: 'Semi-finals',
                                    games: [
                                        {}
                                    ]
                                },
                                {
                                    roundOf: 8,
                                    header: 'Quarter-finals',
                                    games: [
                                        {}, {}
                                    ]
                                }
                            ]

                        */


                        // Dispatch first round games.
                        /*for (var j = 0; j < firstRound.length; j++) {
                            if ((j % 2) === 0) {
                                // left side.
                            } else {
                                // right side.
                            }
                        }*/

                        // 8 teams
                        var games = [ { leftBracket: [] }, { rightBrackets: [] } ];
                        /*
                            [
                                {
                                    leftBrackets: [
                                        { round: 'Quart-final' },
                                        { round: 'Semi-final' }
                                    ]
                                },
                                {
                                    middleBrackets: [
                                        { round: 'Final' },
                                        { round: 'Bronze' }
                                    ]
                                },
                                {
                                    rightBrackets: [
                                        { round: 'Quart-final' },
                                        { round: 'Semi-final' }
                                    ]
                                }
                            ]



                            1---\                       |---2
                                ---\               |---
                            8---|    ---         ---    \---7
                            3---\                       |---4
                                ---|               \---
                            6---|                       \---5
                        */
                        $log.info(teams);
                        $log.info(rounds);
                        $log.info(JSON.stringify(rounds));

                        return rounds;
                    }
                };

            }
        ])
        .directive('tournamentBracket', ['tournamentService',
            function (tournamentService) {
                return {
                    restrict: 'E',
                    replace: true,
                    scope: {
                        teams: '=',
                        type: '@',
                        shuffleTeams: '@'
                    },
                    templateUrl: 'ngTournamentBracket/templates/tournamentBracket.html',
                    controller: function($scope){
                        $scope.type = angular.isDefined($scope.type) ? $scope.type : 'single-elimination';
                        $scope.shuffleTeams = angular.isDefined($scope.shuffleTeams) ? $scope.shuffleTeams.toLowerCase() === 'true' : false;
                    },
                    link: function (scope, element, attrs) {


                        scope.columns = [
                            { title: 'Final' },

                        ];

                        //tournamentService.generateGames(scope.teams, scope.type, scope.shuffleTeams);
                    },
                };
            }
        ])
        .directive('tournamentGame', ['tournamentService',
            function (tournamentService) {
                return {
                    restrict: 'E',
                    replace: true,
                    scope: {
                        games: '=',
                    },
                    templateUrl: 'ngTournamentBracket/templates/tournamentGame.html',
                    controller: function($scope){
                        $scope.isWinner = function (teams, teamId) {
                            var teamIndex = teams[0].id == teamId ? 0 : 1;

                            if (teamIndex) {
                                return teams[1].score > teams[0].score;
                            } else {
                                return teams[0].score > teams[1].score;
                            }
                        };
                    },
                    link: function (scope, element, attrs) {

                        //tournamentService.generateGames(scope.teams, scope.type, scope.shuffleTeams);
                    },
                };
            }
        ]);

})();
