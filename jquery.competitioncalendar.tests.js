module("Competition Calendar");

var targetId = "#qunit-target";

setup: function() {    
    $(targetId).empty();     
    $.competitionCalendar.overrideOptions({});
}
teardown: function() {
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

test("Scaffold Team Names' Insertion", function() {
   $.competitionCalendar.scaffoldTeamNamesInsertion($(targetId));
   ok($(targetId).find('#team-names-insertion').length, 'Prepare to introduce Team Names');
   same($('.team-name-input-div').size(), 20, "We have 20 '.team-name-input-div'"); 

});

module("Competition Calendar Core");

test("rotateTeamsJSON Function receive teams param empty", function() {
    teams = {};
    same($.competitionCalendar.rotateTeamsJSON(teams), {});
});

test("getFixtures Function receive teams param empty", function() {
    teams = {};
    same($.competitionCalendar.getFixtures(teams), null);
});

test("getFixtures Function receive teams param size of two", function() {
    teams = {
    	  '0' : 'team1'
 	, '1' : 'team2'
    };

    expectedFixtures = {
	  'weeks' : { 
		'1' : {
			'matches' : {
				'0' : {
					  'local' : teams[0]
					, 'visitor' : teams[1]
				}
			} 
		} 
		, '2' : {
			'matches' : {
				'0' : {
					  'local' : teams[0]
					, 'visitor' : teams[1]
				}
			} 
		} 
	}
    }
    same($.competitionCalendar.getFixtures(teams), expectedFixtures);
});
