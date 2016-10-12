'use strict';

describe('When generating a single-elimination tournament', function() {

    var $log;
    var tournamentService;

    beforeEach(module('ngTournamentBracket'));

    beforeEach(function() {
		inject(function(_$log_, _tournamentService_) {
            $log = _$log_;
			tournamentService = _tournamentService_;
		});
	});

    it('Should raise an error when is less than 3 teams', function() {
        // Arrange
        var mockTeams = createTeamArray(2);

        // Act
        tournamentService.generateGames(mockTeams);

        // Assert
        expect($log.error.logs[0]).toEqual(['You must have at least 3 teams.']);
    });

    it('Should raise an error when there is more than 64 teams', function() {
        // Arrange
        var mockTeams = createTeamArray(65);

        // Act
        tournamentService.generateGames(mockTeams);

        // Assert
        expect($log.error.logs[0]).toEqual(['You can only create brackets for 64 or fewer teams.']);
    });

    it('Should work...', function() {
        // Arrange
        var mockTeams = createTeamArray(8);

        // Act
        tournamentService.generateGames(mockTeams, 'single-elimination');

        // Assert
        //expect($log.error.logs[0]).toEqual(['You can only create brackets for 64 or fewer teams.']);
    });

    // TODO Double-elimination.
    it('Should work...', function() {
        // Arrange
        var mockTeams = createTeamArray(3);

        // Act
        tournamentService.generateGames(mockTeams, 'double-elimination', true);

        // Assert
        //expect($log.error.logs[0]).toEqual(['You can only create brackets for 64 or fewer teams.']);
    });

    function createTeamArray(nbTeams) {
        var teams = [];

        for(var i = 0; i < nbTeams; i++) {
            teams.push(new mockTeam('mock.team.id' + i, 'mock.team.name' + i, 'mock.team.logo' + i))
        }

        return teams;
    }

    function mockTeam(id, name, logo) {
        return {
            id: id,
            name: name,
            logo: logo
        };
    }

});
