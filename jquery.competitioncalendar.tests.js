module("Beginning");

var targetId = "#qunit-target";
var testTargetId = "#qunit-target-test";
var teams2 = {
    	  '0' : 'team1'
 	, '1' : 'team2'
}
var fixtures2 = {
	  'weeks' : { 
		  '1' : { 'matches' : { '0' : {  'local' : teams2[0], 'visitor' : teams2[1] } } } 
		, '2' : { 'matches' : { '0' : {  'local' : teams2[1], 'visitor' : teams2[0] } } } 
	}
}

var teams4 = {
    	  '0' : 'team1'
 	, '1' : 'team2'
	, '2' : 'team3'
	, '3' : 'team4'
}
var fixtures4 = {
	"weeks": {
	    "1": {
	      "matches": { "0": { "local": teams4[2], "visitor": teams4[3]}, "1": { "local": teams4[1], "visitor": teams4[0] } }
	    },
	    "2": {
	      "matches": { "0": { "local": teams4[3], "visitor": teams4[1]}, "1": { "local": teams4[0], "visitor": teams4[2] } }
	    },
	    "3": {
	      "matches": { "0": { "local": teams4[0], "visitor": teams4[3]}, "1": { "local": teams4[2], "visitor": teams4[1] } }
	    },
	    "4": {
	      "matches": { "0": { "local": teams4[3], "visitor": teams4[2]}, "1": { "local": teams4[1], "visitor": teams4[0] } }
	    },
	    "5": {
	      "matches": { "0": { "local": teams4[1], "visitor": teams4[3]}, "1": { "local": teams4[0], "visitor": teams4[2] } }
	    },
	    "6": {
	      "matches": { "0": { "local": teams4[3], "visitor": teams4[0]}, "1": { "local": teams4[2], "visitor": teams4[1] } }
	    }
    }
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

test("Scaffold Output View", function() {
   $.competitionCalendar.scaffoldOutputView($(targetId));
   ok($(targetId).find('#output-fixtures').length, 'Prepare to view Output');
   same($('#plain-text').size(), 1, "We have '#plain-text'");
   same($('#verbose').size(), 1, "We have '#verbose'");
});

test("Scaffold Settings' Form", function() {
   $.competitionCalendar.scaffoldSettingsInsertion($(targetId));
   ok($(targetId).find('#settings-insertion').length, 'Prepare to introduce Settings');
   same($('.setting-option-div').size(), 1, "We have 1 '.setting-option-div'");
   ok($(targetId).find('.setting-option-div [name$="teamsLength"]').length, 'Exists Teams Length Setting');
});

test("After Scaffold Settings' Form get Settings in JSONObject", function() {
   $.competitionCalendar.overrideOptions({ teamsLength : 4 });
   $.competitionCalendar.scaffoldSettingsInsertion($(targetId));
	
   settings = $.competitionCalendar.getSettings();
   
   expectedSettings = {
	"teamsLength" : "4"
   };

   same(settings, expectedSettings, "Checked Setting Options");

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

test("Scaffold Show Fixtures (2 teams)", function() {
   $.competitionCalendar.overrideOptions({ teamsLength : 2 });
   $.competitionCalendar.scaffoldTeamNamesInsertion($(targetId));
   teamNames = $.competitionCalendar.getTeamNames();
   
   $.competitionCalendar.showFixtures( teamNames, targetId );
   ok($(targetId).find('#show-fixtures').length, 'Exists div#show-fixtures');
   same($('.week-content').size(), 2, "We have 2 '.week-content'");
   same($('.match-content').size(), 2, "We have 2 '.match-content'");	
});

test("Scaffold Show Fixtures (4 teams)", function() {
   $.competitionCalendar.overrideOptions({ teamsLength : 4 });
   $.competitionCalendar.scaffoldTeamNamesInsertion($(targetId));
   teamNames = $.competitionCalendar.getTeamNames();
   
   $.competitionCalendar.showFixtures( teamNames, targetId );
   ok($(targetId).find('#show-fixtures').length, 'Exists div#show-fixtures');
   same($('.week-content').size(), 6, "We have 6 '.week-content'");
   same($('.match-content').size(), 12, "We have 12 '.match-content'");	
});

test("Scaffold Complete Module", function() {
   $.competitionCalendar.overrideOptions({ teamsLength : 4 });
   $.competitionCalendar.scaffoldModule($(targetId));
   
   
   ok($(targetId).find('#competition-calendar').length, 'Main Div Created');
   ok($(targetId).find('#settings-insertion').length, 'Prepare to introduce Settings');
   same($('.setting-option-div').size(), 1, "We have 1 '.setting-option-div'");
   ok($(targetId).find('.setting-option-div [name$="teamsLength"]').length, 'Exists Teams Length Setting');
   same($('.team-name-input-div').size(), 4, "We have 4 '.team-name-input-div'");
   same($('.week-content').size(), 6, "We have 6 '.week-content'");
   same($('.match-content').size(), 12, "We have 12 '.match-content'");
   ok($(targetId).find('#output-fixtures').length, 'Prepare to view Output');
   same($('#plain-text').size(), 1, "We have '#plain-text'");
   same($('#verbose').size(), 1, "We have '#verbose'");
});

test("showContent", function() {
	$.competitionCalendar.scaffoldModule($(testTargetId));
	structure = $.competitionCalendar.structure;
	countMenuElements = 0; for(element in structure){countMenuElements++;}
	ok(countMenuElements, "El menú tiene al menos un elemento");
	
	contentSelected = structure.settings.id;
	$.competitionCalendar.showContent(contentSelected);
	$.each(structure,function( contentIndex, contentIdentifier ) {
	    if(contentIdentifier.id == contentSelected)
		ok(!$('#' + contentIdentifier.id).is(':hidden'), "El contenido no está oculto");
	    else
		ok(!$('#' + contentIdentifier.id).is(':visible'), contentIdentifier + " está oculto");
	});
	
});

module("Core");

test("rotateTeamsJSON Function receive teams param empty", function() {
    teams = {};
    same($.competitionCalendar.rotateTeamsJSON(teams), {});
});

test("rotateTeamsJSON Function receive teams param(size 2)", function() {
    expectedTeams = {
    	  '0' : 'team1'
 	, '1' : 'team2'
    };
    same($.competitionCalendar.rotateTeamsJSON(teams2), expectedTeams, "With Elements we must have the same JSON");
});
test("rotateTeamsJSON Function receive teams param(size 4)", function() {
    expectedTeams = {
    	  '0' : 'team3'
 	, '1' : 'team1'
	, '2' : 'team2'
	, '3' : 'team4'
    };
    same($.competitionCalendar.rotateTeamsJSON(teams4), expectedTeams, "With Four elements we must see hot the first three elements have changed");
});

test("getFixtures Function receive teams param empty", function() {
    teams = {};
    same($.competitionCalendar.getFixtures(teams), null);
});

test("getFixtures Function receive teams param(Size 2)", function() {
    same($.competitionCalendar.getFixtures(teams2), fixtures2);
});

test("getFixtures Function receive teams param(Size 4)", function() {
   same($.competitionCalendar.getFixtures(teams4), fixtures4, "Fixtures Ok with 4 teams and 2 legs");
});

test("parseFixtureJson2FixtureOutput (Teams Size 2)", function() {
    expectedString = "<div class='competition-fixture'>"
	    + "<span class='competition-name'>Competition</span>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 1</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams2[0] + "</span>"
		    + "<span class='visitor-team'>" + teams2[1] + "</span>"
		+ "</div>"
	    + "</div>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 2</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams2[1] + "</span>"
		    + "<span class='visitor-team'>" + teams2[0] + "</span>"
		+ "</div>"
	    + "</div>"
	+ "</div>"
    ;
    same($.competitionCalendar.parseFixtureJson2FixtureOutput(fixtures2), expectedString, "Json converted to String Ok!");
});

test("parseFixtureJson2FixtureOutput (Teams Size 4)", function() {
    var expectedString = "<div class='competition-fixture'>"
	    + "<span class='competition-name'>Competition</span>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 1</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams4[2] + "</span>"
		    + "<span class='visitor-team'>" + teams4[3] + "</span>"
		+ "</div>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams4[1] + "</span>"
		    + "<span class='visitor-team'>" + teams4[0] + "</span>"
		+ "</div>"
	    + "</div>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 2</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams4[3] + "</span>"
		    + "<span class='visitor-team'>" + teams4[1] + "</span>"
		+ "</div>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams4[0] + "</span>"
		    + "<span class='visitor-team'>" + teams4[2] + "</span>"
		+ "</div>"
	    + "</div>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 3</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams4[0] + "</span>"
		    + "<span class='visitor-team'>" + teams4[3] + "</span>"
		+ "</div>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams4[2] + "</span>"
		    + "<span class='visitor-team'>" + teams4[1] + "</span>"
		+ "</div>"
	    + "</div>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 4</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams4[3] + "</span>"
		    + "<span class='visitor-team'>" + teams4[2] + "</span>"
		+ "</div>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams4[1] + "</span>"
		    + "<span class='visitor-team'>" + teams4[0] + "</span>"
		+ "</div>"
	    + "</div>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 5</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams4[1] + "</span>"
		    + "<span class='visitor-team'>" + teams4[3] + "</span>"
		+ "</div>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams4[0] + "</span>"
		    + "<span class='visitor-team'>" + teams4[2] + "</span>"
		+ "</div>"
	    + "</div>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 6</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams4[3] + "</span>"
		    + "<span class='visitor-team'>" + teams4[0] + "</span>"
		+ "</div>"
		+ "<div class='match-fixtures'>"
	            + "<span class='local-team'>" + teams4[2] + "</span>"
		    + "<span class='visitor-team'>" + teams4[1] + "</span>"
		+ "</div>"
	    + "</div>"	    
	+ "</div>"
    ;

   same($.competitionCalendar.parseFixtureJson2FixtureOutput(fixtures4), expectedString, "Json converted to String Ok!");
});
