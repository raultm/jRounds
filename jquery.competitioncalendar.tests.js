module("Beginning");

var targetId = "#qunit-target";
var testTargetId = "#qunit-target-test";
var teams2 = {
    	  '0' : 'team1'
 	, '1' : 'team2'
    }
var teams4 = {
    	  '0' : 'team1'
 	, '1' : 'team2'
	, '2' : 'team3'
	, '3' : 'team4'
    }



test("Default Options", function() {
    same($.competitionCalendar.defaultOptions.teamsLength, 20);
});

test("Override Default Options", function() {
    $.competitionCalendar.overrideOptions({
        teamsLength : 10
    });
    
    same($.competitionCalendar.options.teamsLength, 10);   
});

test("Calling Plugin Override Options", function() {
   $(targetId).competitionCalendar({
      testOption : "Almendralejo"
   });
    
   same($.competitionCalendar.options.teamsLength, 20); 
   same($.competitionCalendar.options.testOption, "Almendralejo");    
});

module("UI", {
    setup: function() {    
        $(targetId).empty();     
        $.competitionCalendar.overrideOptions({});
    },
    teardown: function() {}
});

test("Scaffold Settings' Form", function() {
   $.competitionCalendar.scaffoldSettingsInsertion($(targetId));
   ok($(targetId).find('#settings-insertion').length, 'Prepare to introduce Settings');
   same($('.setting-option-div').size(), 1, "We have 1 '.setting-option-div'");
});

test("Scaffold Team Names' Form", function() {
   $.competitionCalendar.scaffoldTeamNamesInsertion($(targetId));
   ok($(targetId).find('#team-names-insertion').length, 'Prepare to introduce Team Names');
   same($('.team-name-input-div').size(), 20, "We have 20 '.team-name-input-div'");
});

test("After Scaffold Team Names' Insertion get Teams Name in JSONObject", function() {
   $.competitionCalendar.overrideOptions({ teamsLength : 4 });
   $.competitionCalendar.scaffoldTeamNamesInsertion($(targetId));
	
   teamNames = $.competitionCalendar.getTeamNames();
   
   expectedTeamNames = ["Team 1", "Team 2", "Team 3", "Team 4"];

   same(teamNames, expectedTeamNames, "We've received 4 Team Names");

});

module("Core");

test("rotateTeamsJSON Function receive teams param empty", function() {
    teams = {};
    same($.competitionCalendar.rotateTeamsJSON(teams), {});
});

test("rotateTeamsJSON Function receive teams param(size 2)", function() {
    teams = teams2;

    expectedTeams = {
    	  '0' : 'team1'
 	, '1' : 'team2'
    };

    same($.competitionCalendar.rotateTeamsJSON(teams), expectedTeams, "With Elements we must have the same JSON");
});
test("rotateTeamsJSON Function receive teams param(size 4)", function() {
    teams = teams4;

    expectedTeams = {
    	  '0' : 'team3'
 	, '1' : 'team1'
	, '2' : 'team2'
	, '3' : 'team4'
    };
    same($.competitionCalendar.rotateTeamsJSON(teams), expectedTeams, "With Four elements we must see hot the first three elements have changed");
});

test("getFixtures Function receive teams param empty", function() {
    teams = {};
    same($.competitionCalendar.getFixtures(teams), null);
});

test("getFixtures Function receive teams param(Size 2)", function() {
    teams = teams2;

    expectedFixtures = {
	  'weeks' : { '1' : { 'matches' : { '0' : {  'local' : teams[0], 'visitor' : teams[1] }	} } 
		    , '2' : { 'matches' : { '0' : {  'local' : teams[1], 'visitor' : teams[0] } } } 
	}
    }
    same($.competitionCalendar.getFixtures(teams), expectedFixtures);
});

test("getFixtures Function receive teams param(Size 4)", function() {
    teams = teams4;

    expectedFixtures = {
	  "weeks": {
	    "1": {
	      "matches": { "0": { "local": teams[2], "visitor": teams[3]}, "1": { "local": teams[1], "visitor": teams[0] } }
	    },
	    "2": {
	      "matches": { "0": { "local": teams[3], "visitor": teams[1]}, "1": { "local": teams[0], "visitor": teams[2] } }
	    },
	    "3": {
	      "matches": { "0": { "local": teams[0], "visitor": teams[3]}, "1": { "local": teams[2], "visitor": teams[1] } }
	    },
	    "4": {
	      "matches": { "0": { "local": teams[3], "visitor": teams[2]}, "1": { "local": teams[1], "visitor": teams[0] } }
	    },
	    "5": {
	      "matches": { "0": { "local": teams[1], "visitor": teams[3]}, "1": { "local": teams[0], "visitor": teams[2] } }
	    },
	    "6": {
	      "matches": { "0": { "local": teams[3], "visitor": teams[0]}, "1": { "local": teams[2], "visitor": teams[1] } }
	    }
	  }
	}
    
   same($.competitionCalendar.getFixtures(teams), expectedFixtures, "Fixtures Ok with 4 teams and 2 legs");
});
