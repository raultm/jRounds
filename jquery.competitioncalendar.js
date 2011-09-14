(function($) {
   var competitionCalendar = $.competitionCalendar = {};
   
   competitionCalendar.defaultOptions = {
      	  teamsLength : 20
   };
                    
   $.fn.competitionCalendar = function(options){
   	competitionCalendar.overrideOptions(options);                    
 	return this;
   };

   competitionCalendar.options = null;
   competitionCalendar.structure = {
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

   competitionCalendar.classes = {
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
  
   competitionCalendar.overrideOptions = function(options) {
      competitionCalendar.options = $.extend({}, competitionCalendar.defaultOptions, options);
   }; 

   competitionCalendar.showContent = function(element){
	structure = competitionCalendar.structure;
	elementSelected = element;
	$.each(structure,function( contentIndex, contentIdentifier ) {
	    if(contentIdentifier.id == element)
		$('#' + contentIdentifier.id).show();
	    else
		$('#' + contentIdentifier.id).hide();
	});
   }
   
   competitionCalendar.addMenuFunctionality = function(){
	$('.menu-element').click(function(){
  	    var id = $(this).attr('id');
	    var divId = id.replace('menu-', '');
	    var structure = competitionCalendar.structure;
	    $.each(structure,function( contentIndex, contentIdentifier ) {
		console.log(contentIdentifier.id + " == " + structure[divId].id);
	    	if(contentIdentifier.id == structure[divId].id)
		    $('#' + contentIdentifier.id).show();
	    	else
		    $('#' + contentIdentifier.id).hide();
	    });
	});
   }

   competitionCalendar.addChangeTeamNumberFunctionality = function(){
   	$('input[name="teamsLength"]').change(function(){
   		var value = $(this).val();
  	    var options = { teamsLength : value }
  	    competitionCalendar.overrideOptions(options)
  	    console.log(options);
  	    $('#qunit-target-test').html('');
  	    competitionCalendar.scaffoldModule( $('#qunit-target-test'));
	});
   }

   competitionCalendar.scaffoldModule = function(element){
	var html = "<div id='competition-calendar'></div>"; 
	var competitionId = '#competition-calendar';
	var plainTextId = '#' + competitionCalendar.structure.output.options.plain.id;
	var verboseId = '#' + competitionCalendar.structure.output.options.verbose.id;
	$(element).append(html);
	competitionCalendar.scaffoldMenu($(competitionId));
  	competitionCalendar.scaffoldSettingsInsertion($(competitionId));
	competitionCalendar.scaffoldTeamNamesInsertion($(competitionId));
	competitionCalendar.scaffoldOutputView($(competitionId));
	teams = competitionCalendar.getTeamNames();
	competitionCalendar.showFixtures(teams, $(plainTextId));
	competitionCalendar.showFixtures(teams, $(verboseId));
   }

   competitionCalendar.scaffoldOutputView = function(element) {
    	var html = 
		  "<div id='" + competitionCalendar.structure.output.id + "'>"
			+ "<div id='" + competitionCalendar.structure.output.options.plain.id + "'></div>"
			+ "<textarea id='" + competitionCalendar.structure.output.options.verbose.id + "'></div>"
	        + "</div>";
		                                  
	$(element).append(html);
   }

   competitionCalendar.scaffoldMenu = function(element){
	var menuLis = "";
	for(structureElement in competitionCalendar.structure){
            menuLis+= "<li class='" + competitionCalendar.classes.menuItem + "' id='menu-" + structureElement + "'>" + structureElement + "</li>";
	}
	var menu =   "<div id='competition-menu'>"
		   	+ "<ul>"
			    + menuLis
			+ "</ul>"
		   + "</div>"
	;
	$(element).append(menu);
	competitionCalendar.addMenuFunctionality();
   }

   competitionCalendar.scaffoldSettingsInsertion = function(element) {
        var settingOption = '';var teamsLength = competitionCalendar.options.teamsLength;
	settingOption += 
			"<div class='" + competitionCalendar.classes.settingDiv + "'>"
			    + "<label for='setting-option-teams-length'>Number of Teams : <label>"			
			    + "<input type='text' name='teamsLength' class='setting-option' value='" + teamsLength + "'/>"
			+ "</div>";
	var html = 
		  "<div id='" + competitionCalendar.structure.settings.id + "'>"
			+ settingOption
	        + "</div>";
	$(element).append(html);
   }

   competitionCalendar.getSettings = function(){
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

   competitionCalendar.scaffoldTeamNamesInsertion = function(element) {
	var nameInputs = '';
	var teamsLength = competitionCalendar.options.teamsLength;
	for(position = 0; position<teamsLength; position++ ){
		frontendPosition = position + 1;
		nameInputs += 
			"<div class='" + competitionCalendar.classes.teamNameDiv +"'>"
			    + "<label for='team-name-input-" + position + "'>Team Name " + frontendPosition + " : <label>"			
			    + "<input type='text' name='team-name-input-" + position + "' class='team-name-input' value='Team " + frontendPosition + "'/>"
			+ "</div>";
	}
	var html = 
		  "<div id='" + competitionCalendar.structure.names.id + "'>"
			+ nameInputs
	        + "</div>";
	$(element).append(html);
	competitionCalendar.addChangeTeamNumberFunctionality();
   };

   competitionCalendar.getTeamNames = function(){
	teamNamesInputs = $('.team-name-input');
	teamNames = $.map(teamNamesInputs, function(input, index){ return $(input).val(); });
        return teamNames;
   }

   competitionCalendar.showFixtures = function( teams, element ){
	var fixtures = competitionCalendar.getFixtures(teams);
	var html = '';
	$.each(fixtures.weeks,function( weekIndex, week ) { 
		html += "<div class='" + competitionCalendar.classes.weekContent + "'>";
		html += "<div class='" + competitionCalendar.classes.weekTitle + "'>Week " + weekIndex + "</div>";  
		$.each(week.matches,function( matchIndex, match ) { 
			html += "<div class='match-content'>"
					+ "<div class='" + competitionCalendar.classes.teamName + " " + competitionCalendar.classes.teamLocal + "'>" + match.local + "</div>"
					+ "<div class='" + competitionCalendar.classes.teamName + " " + competitionCalendar.classes.teamVisitor + "'>" + match.visitor + "</div>"
				+"</div>"; 

		});
		html += "</div>"
	});
	fixturesHtml = "<div id='show-fixtures'>" + html + "</div>";
	$(element).html(fixturesHtml);	
    }

   competitionCalendar.getFixtures = function(teams) {
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

   competitionCalendar.rotateTeamsJSON = function(teamsToRotate){
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
   
   competitionCalendar.parseFixtureJson2FixtureOutput = function(fixtureJson){
	
	fixtureOutput	= "";
	weeksOutput 	= "";
	matchesOutput 	= "";
	$.each(fixtureJson.weeks,function( weekIndex, week ) { 
	    matchesOutput = "";
	    $.each(week.matches,function( matchIndex, match ) { 
		matchesOutput+= 
		  "<div class='match-fixtures'>"
	            + "<span class='" + competitionCalendar.classes.teamLocal + "'>" + match.local + "</span>"
		    + "<span class='" + competitionCalendar.classes.teamVisitor + "'>" + match.visitor + "</span>"
		+ "</div>"		    
	    });
	    weeksOutput += 
	      "<div class='" + competitionCalendar.classes.weekFixtures + "'>"
		+ "<span class='" + competitionCalendar.classes.weekName + "'>Week " + weekIndex + "</span>"
		+ matchesOutput
	    + "</div>"
	});
	fixtureOutput = "<div class='" + competitionCalendar.classes.competitionFixture + "'>"
	    + "<span class='" + competitionCalendar.classes.competitionName + "'>Competition</span>"
	    + weeksOutput
	+ "</div>"
        ;
	return fixtureOutput;
   }
})(jQuery);
