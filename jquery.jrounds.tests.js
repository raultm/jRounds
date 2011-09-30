module("Beginning");

var targetId = "#qunit-target";
var testTargetId = "#qunit-target-test";
var teamsNames2 = {
    	  '0' : 'team0'
 	, '1' : 'team1'
}
var teams2 = {
    	  '0' : '0'
 	, '1' : '1'
}
var fixtures2 = {
	  'weeks' : { 
		  '1' : { 'matches' : { '0' : {  'local' : teams2[0], 'visitor' : teams2[1] } } } 
		, '2' : { 'matches' : { '0' : {  'local' : teams2[1], 'visitor' : teams2[0] } } } 
	}
}
var teams3 = {
    	  '0' : 'team1'
 	, '1' : 'team2'
	, '2' : 'team3'
}
var teamsNames4 = {
    	  '0' : 'team0'
 	, '1' : 'team1'
	, '2' : 'team2'
	, '3' : 'team3'
}
var teams4 = {
    	  '0' : '0'
 	, '1' : '1'
	, '2' : '2'
	, '3' : '3'
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
    same($.jRounds.defaultOptions.teamsLength, 20);
});

test("Override Default Options", function() {
    $.jRounds.overrideOptions({teamsLength : 10});
    same($.jRounds.options.teamsLength, 10);   
});

test("Calling Plugin Override Options", function() {
   $.jRounds.overrideOptions({ testOption : "Almendralejo" });
    console.log($.jRounds.options);
   same($.jRounds.options.teamsLength, 20); 
   same($.jRounds.options.testOption, "Almendralejo");    
});

module("UI", {
    setup: function() {    
 	$(targetId).empty();  
	$.jRounds.overrideOptions({});
    },
    teardown: function() {}
});

test("Scaffold Menu", function() {
   $.jRounds.scaffoldMenu($(targetId));
   structure = $.extend(true, {},$.jRounds.structure);
   countElements = 0; for(properties in structure){ countElements++; }
   same($('.menu-element').size(), countElements, "We have " + countElements + " '.menu-element'");
});

test("Scaffold Output View", function() {
   $.jRounds.scaffoldOutputView($(targetId));
   ok($(targetId).find('#output-fixtures').length, 'Prepare to view Output');
   same($('#plain-text').size(), 1, "We have '#plain-text'");
   same($('#verbose').size(), 1, "We have '#verbose'");
});

test("Scaffold Settings' Form", function() {
   $.jRounds.scaffoldSettingsInsertion($(targetId));
   ok($(targetId).find('#settings-insertion').length, 'Prepare to introduce Settings');
   same($('.setting-option-div').size(), 1, "We have 1 '.setting-option-div'");
   ok($(targetId).find('.setting-option-div [name$="teamsLength"]').length, 'Exists Teams Length Setting');
});

test("After Scaffold Settings' Form get Settings in JSONObject", function() {
   $.jRounds.overrideOptions({ teamsLength : 4 });
   $.jRounds.scaffoldSettingsInsertion($(targetId));
	
   settings = $.jRounds.getSettings();
   
   expectedSettings = {
	"teamsLength" : "4"
   };

   same(settings, expectedSettings, "Checked Setting Options");

});

test("Scaffold Team Names' Form", function() {
   $.jRounds.scaffoldTeamNamesInsertion($(targetId));
   ok($(targetId).find('#team-names-insertion').length, 'Prepare to introduce Team Names');
   same($('.team-name-input-div').size(), 20, "We have 20 '.team-name-input-div'");
});

test("After Scaffold Team Names' Insertion get Teams Name in JSONObject", function() {
   $.jRounds.overrideOptions({ teamsLength : 4 });
   $.jRounds.scaffoldTeamNamesInsertion($(targetId));
	
   teamNames = $.jRounds.getTeamNames();
   
   expectedTeamNames = [0, 1, 2, 3];

   same(teamNames, expectedTeamNames, "We've received 4 Team Names");

});

test("Scaffold Show Fixtures (2 teams)", function() {
   $.jRounds.overrideOptions({ teamsLength : 2 });
   $.jRounds.scaffoldTeamNamesInsertion($(targetId));
   teamNames = $.jRounds.getTeamNames();
   
   $.jRounds.showFixtures( teamNames, targetId );
   ok($(targetId).find('.competition-fixture').length, 'Exists div.competition-fixture');
   same($('.week-fixtures').size(), 2, "We have 2 '.week-fixtures'");
   same($('.match-fixtures').size(), 2, "We have 2 '.match-fixtures'");	
});

test("Scaffold Show Fixtures (4 teams)", function() {
   $.jRounds.overrideOptions({ teamsLength : 4 });
   $.jRounds.scaffoldTeamNamesInsertion($(targetId));
   teamNames = $.jRounds.getTeamNames();
   
   $.jRounds.showFixtures( teamNames, targetId );
   ok($(targetId).find('.competition-fixture').length, 'Exists div.competition-fixture');
   same($('.week-fixtures').size(), 6, "We have 6 '.week-fixtures'");
   same($('.match-fixtures').size(), 12, "We have 12 '.match-fixtures'");	
});

test("Scaffold Complete Module", function() {
   $.jRounds.overrideOptions({ teamsLength : 4 });
   $.jRounds.scaffoldModule($(targetId));
   
   
   ok($(targetId).find('#competition-calendar').length, 'Main Div Created');
   ok($(targetId).find('#competition-menu').length, 'Menu Div Created');
   ok($(targetId).find('#settings-insertion').length, 'Prepare to introduce Settings');
   same($('.setting-option-div').size(), 1, "We have 1 '.setting-option-div'");
   ok($(targetId).find('.setting-option-div [name$="teamsLength"]').length, 'Exists Teams Length Setting');
   same($('.team-name-input-div').size(), 4, "We have 4 '.team-name-input-div'");
   same($('.week-fixtures').size(), 6, "We have 6 '.week-fixtures'");
   same($('.match-fixtures').size(), 12, "We have 12 '.match-fixtures'");
   ok($(targetId).find('#output-fixtures').length, 'Prepare to view Output');
   same($('#plain-text').size(), 1, "We have '#plain-text'");
   same($('#verbose').size(), 1, "We have '#verbose'");
});

test("showContent", function() {
	$.jRounds.scaffoldModule($(testTargetId));
	structure = $.jRounds.structure;
	countMenuElements = 0; for(element in structure){countMenuElements++;}
	ok(countMenuElements, "El menú tiene al menos un elemento");
	
	contentSelected = structure.settings.id;
	$.jRounds.showContent(contentSelected);
	$.each(structure,function( contentIndex, contentIdentifier ) {
	    if(contentIdentifier.id == contentSelected)
		ok(!$('#' + contentIdentifier.id).is(':hidden'), "El contenido no está oculto");
	    else
		ok(!$('#' + contentIdentifier.id).is(':visible'), contentIdentifier + " está oculto");
	});
	
});

module("Events", {
    setup: function() {    
 	$(targetId).empty();  
	$(testTargetId).empty();  
	$.jRounds.overrideOptions({});
    },
    teardown: function() {}
});

test("Add Menu Funcionality - Click Output", function() {
   $.jRounds.overrideOptions({ teamsLength : 4 });
   $.jRounds.scaffoldModule($(testTargetId));
   $.jRounds.addMenuFunctionality();

   var structure = $.jRounds.structure;
   var menuId = "#menu-output";
   var divId = structure.output.id;
    
   $(menuId).click();
   $.each(structure,function( contentIndex, contentIdentifier ) {
        if(contentIdentifier.id == divId)
	    ok(!$('#' + contentIdentifier.id).is(':hidden'), contentIdentifier.id + " no está oculto");
     	else
	    ok(!$('#' + contentIdentifier.id).is(':visible'), contentIdentifier.id + " está oculto");
   });
});

test("Add Menu Funcionality - Click Names", function() {
   $.jRounds.overrideOptions({ teamsLength : 4 });
   $.jRounds.scaffoldModule($(testTargetId));
   $.jRounds.addMenuFunctionality();

   structure = $.jRounds.structure;
   menuId = "#menu-names";
   divId = structure.names.id;
   
   $(menuId).click();
   $.each(structure,function( contentIndex, contentIdentifier ) {
	if(contentIdentifier.id == divId)
	    ok(!$('#' + contentIdentifier.id).is(':hidden'), contentIdentifier.id + " no está oculto");
     	else
	    ok(!$('#' + contentIdentifier.id).is(':visible'), contentIdentifier.id + " está oculto");
   });
});

test("Add Refresh Funcionality - Change Team Number", function() {
   $.jRounds.overrideOptions({ teamsLength : 8 });
   $.jRounds.scaffoldModule($(testTargetId));
   $('input[name="teamsLength"]').val(6).trigger('change');
   same($('.team-name-input-div').size(), 6, "We have 6 '.team-name-input-div'");
   
});

module("Core");

test("rotateTeamsJSON Function receive teams param empty", function() {
    teams = {};
    same($.jRounds.rotateTeamsJSON(teams), {});
});

test("rotateTeamsJSON Function receive teams param(size 2)", function() {
    expectedTeams = {
    	  '0' : '0'
 	, '1' : '1'
    };
    same($.jRounds.rotateTeamsJSON(teams2), expectedTeams, "With Elements we must have the same JSON");
});
test("rotateTeamsJSON Function receive teams param(size 4)", function() {
    expectedTeams = {
    	  '0' : '2'
 	, '1' : '0'
	, '2' : '1'
	, '3' : '3'
    };
    same($.jRounds.rotateTeamsJSON(teams4), expectedTeams, "With Four elements we must see hot the first three elements have changed");
});

test("getFixtures Function receive teams param empty", function() {
    teams = {};
    same($.jRounds.getFixtures(teams), null);
});

test("getFixtures Function receive teams param(Size 2)", function() {
    same($.jRounds.getFixtures(teams2), fixtures2);
});

test("getFixtures Function receive teams param(Size 4)", function() {
   same($.jRounds.getFixtures(teams4), fixtures4, "Fixtures Ok with 4 teams and 2 legs");
});

test("getLineCompetition (Teams Size 2)", function() {
    $.jRounds.overrideOptions({names : teamsNames2});
    expectedString = "<div class='competition-fixture'>"
	    + "<span class='competition-name'>Competition</span>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 1</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames2[0] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames2[1] + "</span>"
		+ "</div>"
	    + "</div>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 2</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames2[1] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames2[0] + "</span>"
		+ "</div>"
	    + "</div>"
	+ "</div>"
    ;
    same($.jRounds.getLineCompetition(fixtures2), expectedString, "Json converted to String Ok!");
});

test("getLineCompetition (Teams Size 4)", function() {
    $.jRounds.overrideOptions({names : teamsNames4});
    var expectedString = "<div class='competition-fixture'>"
	    + "<span class='competition-name'>Competition</span>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 1</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames4[2] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames4[3] + "</span>"
		+ "</div>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames4[1] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames4[0] + "</span>"
		+ "</div>"
	    + "</div>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 2</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames4[3] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames4[1] + "</span>"
		+ "</div>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames4[0] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames4[2] + "</span>"
		+ "</div>"
	    + "</div>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 3</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames4[0] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames4[3] + "</span>"
		+ "</div>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames4[2] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames4[1] + "</span>"
		+ "</div>"
	    + "</div>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 4</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames4[3] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames4[2] + "</span>"
		+ "</div>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames4[1] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames4[0] + "</span>"
		+ "</div>"
	    + "</div>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 5</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames4[1] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames4[3] + "</span>"
		+ "</div>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames4[0] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames4[2] + "</span>"
		+ "</div>"
	    + "</div>"
	    + "<div class='week-fixtures'>"
		+ "<span class='week-name'>Week 6</span>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames4[3] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames4[0] + "</span>"
		+ "</div>"
		+ "<div class='match-fixtures'>"
	            + "<span class='team-local'>" + teamsNames4[2] + "</span>"
		    + "<span class='team-visitor'>" + teamsNames4[1] + "</span>"
		+ "</div>"
	    + "</div>"	    
	+ "</div>"
    ;

   same($.jRounds.getLineCompetition(fixtures4), expectedString, "Json converted to String Ok!");
});

test("getLineMatch passing null", function() {
    var expectedString = '';
    same($.jRounds.getLineMatch(), expectedString, "Line Match empty when no args ");
});

test("getLineMatch using replace", function() {
    var expectedString = "<div class='match-fixtures'><span class='team-local'>team0</span><span class='team-visitor'>team1</span></div>"
    var match = fixtures2.weeks[1].matches[0];
    same($.jRounds.getLineMatch(match), expectedString, "Line Match Ok");
});

test("getLineMatch using replace", function() {
    var expectedString = "<div class='match-fixtures'><span class='team-local'>team1</span><span class='team-visitor'>team0</span></div>"
    var match = fixtures2.weeks[2].matches[0];
    same($.jRounds.getLineMatch(match), expectedString, "Line Match Ok");
});

test("getLineWeek passing null", function() {
    var expectedString = '';
    same($.jRounds.getLineWeek(), expectedString, "Line Week empty when no args ");
});

test("getLineWeek using replace", function() {
    var expectedString = "<div class='week-fixtures'><span class='week-name'>Week 1</span><div class='match-fixtures'><span class='team-local'>team0</span><span class='team-visitor'>team1</span></div></div>";
    var weekId = 1;
    var week = fixtures2.weeks[weekId];
    same($.jRounds.getLineWeek(weekId, week), expectedString, "Line Week Ok");
});

test("getLineWeek using replace", function() {
    var expectedString = "<div class='week-fixtures'><span class='week-name'>Week 2</span><div class='match-fixtures'><span class='team-local'>team1</span><span class='team-visitor'>team0</span></div></div>";
    var weekId = 2;
    var week = fixtures2.weeks[weekId];
    same($.jRounds.getLineWeek(weekId, week), expectedString, "Line Week Ok");
});

test("getLineCompetition passing null", function() {
    var expectedString = '';
    same($.jRounds.getLineCompetition(), expectedString, "Line Competition empty when no args ");
});

test("getLineCompetition fixtures2", function() {
    var expectedString = "<div class='competition-fixture'><span class='competition-name'>Competition</span><div class='week-fixtures'><span class='week-name'>Week 1</span><div class='match-fixtures'><span class='team-local'>team0</span><span class='team-visitor'>team1</span></div></div><div class='week-fixtures'><span class='week-name'>Week 2</span><div class='match-fixtures'><span class='team-local'>team1</span><span class='team-visitor'>team0</span></div></div></div>";
    same($.jRounds.getLineCompetition(fixtures2), expectedString, "Line Competition Ok");
});

test("addRestTeam passing empty", function() {
    var expectedJSON = {};
    same($.jRounds.addRestTeam(), expectedJSON, "addRestTeam empty args emptyJSON");
});

test("addRestTeam passing teams2", function() {
    var expectedJSON = $.extend({},teams2);
    same($.jRounds.addRestTeam(teams2), expectedJSON, "addRestTeam teams 2, no changes");
});

test("addRestTeam passing teams3", function() {
   var expectedJSON = $.jRounds.addRestTeam(teams3);console.log(expectedJSON);
   var count = 0; for(index in expectedJSON){count++;}
   same(count, 4, "addRestTeam teams3 -> 4 teams, Rest Added");
});

test("Shuffle JSON Object - return emptyJSON if no params", function(){
   same($.jRounds.shuffleJSON(), {}, "Empty JSON without params");
});

test("Shuffle JSON Object - return the same if param length is 1", function(){
   same($.jRounds.shuffleJSON({"0" : "Team 1"}), {"0" : "Team 1"}, "Return the same JSON");
});

module("Default Options", {
    setup: function() {    
 	$.jRounds.overrideOptions();
    },
    teardown: function() {}
});

test("isValidTeamNumber Value 50 true ", function(){
    same($.jRounds.isValidTeamNumber(50),true, "50 is greater than Min Team Number or less than Max Team Number");
});

test("isValidTeamNumber Value 51 false", function(){
    same($.jRounds.isValidTeamNumber(51),false, "51 is less than Min Team Number or greater than Max Team Number");
});

test("isValidTeamNumber Value 2 true", function(){
    same($.jRounds.isValidTeamNumber(2),true, "2 is greater than Min Team Number or less than Max Team Number");
});

test("isValidTeamNumber Value 1 false", function(){
    same($.jRounds.isValidTeamNumber(1),false, "1 is less than Min Team Number or greater than Max Team Number");
});

test("isValidTeamNumber Value 'a' false", function(){
    same($.jRounds.isValidTeamNumber('a'),false, "a is not a number");
});

test("getTeamName empty params", function(){
    same($.jRounds.getTeamName(), null, "Empty params return null");
});

test("getTeamName position 1 with empty jRounds.names", function(){
    same($.jRounds.getTeamName(1), 'Team 1', "Default TeamName 1");
});

test("getTeamName position 1 with override jRounds.names", function(){
    var names = {"names": {"0":"Messi", "1":"Prosinecki"} }
    $.jRounds.overrideOptions(names);
    same($.jRounds.getTeamName(1), 'Prosinecki', "Default TeamName 1");
});








