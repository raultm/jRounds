(function($) {
   var jRounds = $.jRounds = {};
   
   jRounds.defaultOptions = {
      	  teamsLength : 20
   };
                    
   $.fn.jRounds = function(options){
   	jRounds.overrideOptions(options);                    
 	return this;
   };

   jRounds.options = null;
   jRounds.structure = {
	  'settings' : 
		{ "id" : 'settings-insertion' }
	, 'names'    : 
		{ 'id' : 'team-names-insertion' }
	, 'output'   : 
		{ 'id' : 'output-fixtures'
		, 'options' : 
			{ 'plain' : { 'id' : 'plain-text'}
			, 'verbose' : { 'id' : 'verbose'}
		}
	}
   }

   jRounds.lines = {
	  'match' : "<div class='match-fixtures'><span class='team-local'>{localTeamName}</span><span class='team-visitor'>{visitorTeamName}</span></div>"
   }

   jRounds.classes = {
	  'menuItem' 	: "menu-element" 
	, 'settingDiv'  : "setting-option-div"
	, 'teamNameDiv' : "team-name-input-div"
	, 'weekContent' : "week-content"
	, 'weekTitle'   : "week-title"
	, 'matchContent': "match-content"
	, 'teamName'	: "team-name"
	, 'teamLocal'	: "team-local"
	, 'teamVisitor'	: "team-visitor"
	, 'weekFixtures': "week-fixtures"
	, 'weekName'	: "week-name"
	, 'competitionFixture'	: "competition-fixture"
	, 'competitionName'	: "competition-name"
   }
  
   jRounds.overrideOptions = function(options) {
      jRounds.options = $.extend({}, jRounds.defaultOptions, options);
   }; 

   jRounds.showContent = function(element){
	structure = jRounds.structure;
	elementSelected = element;
	$.each(structure,function( contentIndex, contentIdentifier ) {
	    if(contentIdentifier.id == element)
		$('#' + contentIdentifier.id).show();
	    else
		$('#' + contentIdentifier.id).hide();
	});
   }
   
   jRounds.addMenuFunctionality = function(){
	$('.menu-element').click(function(){
  	    var id = $(this).attr('id');
	    var divId = id.replace('menu-', '');
	    var structure = jRounds.structure;
	    $.each(structure,function( contentIndex, contentIdentifier ) {
		console.log(contentIdentifier.id + " == " + structure[divId].id);
	    	if(contentIdentifier.id == structure[divId].id)
		    $('#' + contentIdentifier.id).show();
	    	else
		    $('#' + contentIdentifier.id).hide();
	    });
	});
   }

   jRounds.addChangeTeamNumberFunctionality = function(){
   	$('input[name="teamsLength"]').change(function(){
   		var value = $(this).val();
  	    var options = { teamsLength : value }
  	    jRounds.overrideOptions(options)
  	    console.log(options);
  	    $('#qunit-target-test').html('');
  	    jRounds.scaffoldModule( $('#qunit-target-test'));
	});
   }

   jRounds.scaffoldModule = function(element){
	var html = "<div id='competition-calendar'></div>"; 
	var competitionId = '#competition-calendar';
	var plainTextId = '#' + jRounds.structure.output.options.plain.id;
	var verboseId = '#' + jRounds.structure.output.options.verbose.id;
	$(element).append(html);
	jRounds.scaffoldMenu($(competitionId));
  	jRounds.scaffoldSettingsInsertion($(competitionId));
	jRounds.scaffoldTeamNamesInsertion($(competitionId));
	jRounds.scaffoldOutputView($(competitionId));
	teams = jRounds.getTeamNames();
	jRounds.showFixtures(teams, $(plainTextId));
	jRounds.showFixtures(teams, $(verboseId));
   }

   jRounds.scaffoldOutputView = function(element) {
    	var html = 
		  "<div id='" + jRounds.structure.output.id + "'>"
			+ "<div id='" + jRounds.structure.output.options.plain.id + "'></div>"
			+ "<textarea id='" + jRounds.structure.output.options.verbose.id + "'></div>"
	        + "</div>";
		                                  
	$(element).append(html);
   }

   jRounds.scaffoldMenu = function(element){
	var menuLis = "";
	for(structureElement in jRounds.structure){
            menuLis+= "<li class='" + jRounds.classes.menuItem + "' id='menu-" + structureElement + "'>" + structureElement + "</li>";
	}
	var menu =   "<div id='competition-menu'>"
		   	+ "<ul>"
			    + menuLis
			+ "</ul>"
		   + "</div>"
	;
	$(element).append(menu);
	jRounds.addMenuFunctionality();
   }

   jRounds.scaffoldSettingsInsertion = function(element) {
        var settingOption = '';var teamsLength = jRounds.options.teamsLength;
	settingOption += 
			"<div class='" + jRounds.classes.settingDiv + "'>"
			    + "<label for='setting-option-teams-length'>Number of Teams : <label>"			
			    + "<input type='text' name='teamsLength' class='setting-option' value='" + teamsLength + "'/>"
			+ "</div>";
	var html = 
		  "<div id='" + jRounds.structure.settings.id + "'>"
			+ settingOption
	        + "</div>";
	$(element).append(html);
   }

   jRounds.getSettings = function(){
	var settingInputs = $('.setting-option');
	var settings = {}
	var settingJSON = {}
	$.each(settingInputs,function( index, settingInput ) { 
		settingName = $(settingInput).attr('name');
		settingValue = $(settingInput).val();
		settingJSON[settingName] = settingValue;

		$.extend(settings, settingJSON);
	});
	return settings;
   }

   jRounds.scaffoldTeamNamesInsertion = function(element) {
	var nameInputs = '';
	var teamsLength = jRounds.options.teamsLength;
	for(position = 0; position<teamsLength; position++ ){
		frontendPosition = position + 1;
		nameInputs += 
			"<div class='" + jRounds.classes.teamNameDiv +"'>"
			    + "<label for='team-name-input-" + position + "'>Team Name " + frontendPosition + " : <label>"			
			    + "<input type='text' name='team-name-input-" + position + "' class='team-name-input' value='Team " + frontendPosition + "'/>"
			+ "</div>";
	}
	var html = 
		  "<div id='" + jRounds.structure.names.id + "'>"
			+ nameInputs
	        + "</div>";
	$(element).append(html);
	jRounds.addChangeTeamNumberFunctionality();
   };

   jRounds.getTeamNames = function(){
	teamNamesInputs = $('.team-name-input');
	teamNames = $.map(teamNamesInputs, function(input, index){ return $(input).val(); });
        return teamNames;
   }

   jRounds.showFixtures = function( teams, element ){
	var fixtures = jRounds.getFixtures(teams);
	fixturesHtml = jRounds.parseFixtureJson2FixtureOutput(fixtures);
	$(element).html(fixturesHtml);	
    }

   jRounds.getFixtures = function(teams) {
	if(!teams){ return null; }
	teamsCount = 0;for(team in teams){teamsCount++;}
	if(teamsCount == 0){ return null; }
	fixtures = {'weeks' : {} };
	rotatedTeams = $.extend(true, {}, teams);
	halfTeamsCount = teamsCount/2;
	for(week=0; week<(teamsCount-1)*2; week++){
		frontEndWeek = week + 1;
		fixtures.weeks[frontEndWeek] = { "matches" : {} };
		rotatedTeams = this.rotateTeamsJSON(rotatedTeams);
		for(rotatedTeamsIndex=0; rotatedTeamsIndex < halfTeamsCount; rotatedTeamsIndex++){
			
			if(rotatedTeamsIndex==0 && (week%2)==0)	{ local   = rotatedTeamsIndex; 	visitor = teamsCount - rotatedTeamsIndex - 1; }
			else if(rotatedTeamsIndex==0)		{ visitor = rotatedTeamsIndex;	local   = teamsCount - rotatedTeamsIndex - 1; 	 }
			else if((rotatedTeamsIndex%2)==0)	{ local   = rotatedTeamsIndex; 	visitor = teamsCount - rotatedTeamsIndex - 1; }
			else					{ visitor = rotatedTeamsIndex;  local   = teamsCount - rotatedTeamsIndex - 1; 	 }
			fixtures.weeks[frontEndWeek].matches[rotatedTeamsIndex] = {
				  'local' : rotatedTeams[local]
				, 'visitor' : rotatedTeams[visitor]
			};
		}
	}
	return fixtures;
   };

   jRounds.rotateTeamsJSON = function(teamsToRotate){
	teamsRotates = $.extend(true, {}, teamsToRotate);
	sizeOfTeamsToRotate = 0;for(team in teamsToRotate){sizeOfTeamsToRotate++;}
	elementToRotate_1 = teamsRotates[sizeOfTeamsToRotate-2];
	elementToRotate_2 = {};
	for(index=0;index<(sizeOfTeamsToRotate-1);index++){
		elementToRotate_2 = teamsRotates[index];
		teamsRotates[index] = elementToRotate_1;
		elementToRotate_1 = elementToRotate_2;
	}
	return teamsRotates;
   }
   
   jRounds.parseFixtureJson2FixtureOutput = function(fixtureJson){
	
	fixtureOutput	= "";
	weeksOutput 	= "";
	matchesOutput 	= "";
	$.each(fixtureJson.weeks,function( weekIndex, week ) { 
	    matchesOutput = "";
	    $.each(week.matches,function( matchIndex, match ) { 
		matchesOutput+= 
		  "<div class='match-fixtures'>"
	            + "<span class='" + jRounds.classes.teamLocal + "'>" + match.local + "</span>"
		    + "<span class='" + jRounds.classes.teamVisitor + "'>" + match.visitor + "</span>"
		+ "</div>"		    
	    });
	    weeksOutput += 
	      "<div class='" + jRounds.classes.weekFixtures + "'>"
		+ "<span class='" + jRounds.classes.weekName + "'>Week " + weekIndex + "</span>"
		+ matchesOutput
	    + "</div>"
	});
	fixtureOutput = "<div class='" + jRounds.classes.competitionFixture + "'>"
	    + "<span class='" + jRounds.classes.competitionName + "'>Competition</span>"
	    + weeksOutput
	+ "</div>"
        ;
	return fixtureOutput;
   }

   jRounds.getLineMatch = function(match){
	if(!match){return '';}
	var local = match.local;
	var visitor = match.visitor;
	var lineMatch = jRounds.lines.match;
	lineMatch = lineMatch.replace('{localTeamName}', local);
	lineMatch = lineMatch.replace('{visitorTeamName}', visitor);
	return lineMatch;
   }

   jRounds.getLineWeek = function(match){
	return '';
   }
})(jQuery);
