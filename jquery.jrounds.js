(function($) {
   var jRounds = $.jRounds = {};
   
   jRounds.lines = {
	  'match' : "<div class='match-fixtures'><span class='team-local'>{localTeamName}</span><span class='team-visitor'>{visitorTeamName}</span></div>"
	, 'week':{
	      'before' : "<div class='week-fixtures'><span class='week-name'>Week {weekNumber}</span>"
	    , 'after'  : "</div>"
	}
	, 'competition':{
	      'before' : "<div class='competition-fixture'><span class='competition-name'>Competition</span>"
	    , 'after'  : "</div>"
	}
   }

   jRounds.defaultOptions = {
      	  teamsLength : 20
	, maxNumberOfTeams : 50
	, minNumberOfTeams : 2
 	, lines : jRounds.lines
   };
                    
   $.fn.jRounds = function(options){
	jRounds.overrideOptions(options);       console.log(jRounds.options);             
	jRounds.scaffoldModule($(this));
	return this;
   };

   jRounds.options = null;
   jRounds.restTeamName = "No team";
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
		if(contentIdentifier.id == structure[divId].id)
		    $('#' + contentIdentifier.id).show();
	    	else
		    $('#' + contentIdentifier.id).hide();
	    });
	});
   }

   jRounds.addChangeTeamNumberFunctionality = function(){
	
	$('input[name="teamsLength"]').unbind('change');
	$('input[name="teamsLength"]').unbind('keyup');
	
	$('input[name="teamsLength"]').change(function(){
   	    var value = $(this).val();
  	    var options = { teamsLength : value }
  	    jRounds.overrideOptions(options);
	    var plainTextId = '#' + jRounds.structure.output.options.plain.id;
	    $('#' + jRounds.structure.names.id).remove();
	    jRounds.scaffoldTeamNamesInsertion($(this));
	    $(plainTextId).html('');
	    
	    jRounds.showFixtures(jRounds.getTeamNames(), $(plainTextId));
	});

	$('input[name="teamsLength"]').keyup(function(){
	    $(this).trigger('change');
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
 			+ "</div>"
			+ "<div class='" + jRounds.classes.settingDiv + "'>"
			    + "<label for='setting-option-random'>Random : <label>"
			    + "<select type='checkbox' name='random' class='setting-option'>"
				+ "<option value='1'>Yes</option>"
				+ "<option value='0'>No</option>"
			    + "</select>"
			+ "</div>"
			+ "<div>"
			    + "<a id='regenerate'>Generate</a>"	
			+ "</div>"
	;
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
			    + "<input type='text' name='team-name-input-" + position + "' class='team-name-input' value='" + jRounds.getTeamName(frontendPosition) + "'/>"
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
	var teamNamesInputs = $('.team-name-input');
	var teamNames = $.map(teamNamesInputs, function(input, index){ return $(input).val(); });
        var teams = new Array();
	jRounds.overrideOptions({names : teamNames});
	for(position = 0; position < $('.team-name-input').size(); position++){
	    teams[position] = position;
	}
        return teams;
   }

   jRounds.showFixtures = function( teams, element ){
	var fixtures = jRounds.getFixtures(teams);
	fixturesHtml = jRounds.getLineCompetition(fixtures);
	$(element).html(fixturesHtml);	
    }

   jRounds.getFixtures = function(teams) {
	if(!teams){ return null; }
	evenTeams = jRounds.addRestTeam(teams);
	teamsCount = 0;for(team in evenTeams){teamsCount++;}
	if(teamsCount == 0){ return null; }
	fixtures = {'weeks' : {} };
	rotatedTeams = $.extend(true, {}, evenTeams);
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
   
   jRounds.getLineMatch = function(match){
	if(!match){return '';}
	var local = match.local;
	var visitor = match.visitor;
	var lineMatch = jRounds.options.lines.match;
	lineMatch = lineMatch.replace('{localTeamName}', jRounds.getTeamName(local));
	lineMatch = lineMatch.replace('{visitorTeamName}', jRounds.getTeamName(visitor));
	return lineMatch;
   }

   jRounds.getLineWeek = function(weekId, week){
	if(!week){return '';}
	var lineWeekBefore = jRounds.options.lines.week.before;
	lineWeekBefore = lineWeekBefore.replace('{weekNumber}', weekId);
	var lineWeekAfter  = jRounds.options.lines.week.after;	
	var matchesString = "";
	for(matchId in week.matches){
	    matchesString += jRounds.getLineMatch(week.matches[matchId]); 
	}
	lineWeek = lineWeekBefore + matchesString + lineWeekAfter;
	return lineWeek;
   }

   jRounds.getLineCompetition = function(fixtures){
	if(!fixtures){return '';}
	var lineCompetitionBefore = jRounds.options.lines.competition.before;
	var lineCompetitionAfter  = jRounds.options.lines.competition.after;	
	var lineWeek = '';	
	for(weekId in fixtures.weeks){
	    lineWeek += jRounds.getLineWeek(weekId, fixtures.weeks[weekId]);
	}
	lineCompetition = lineCompetitionBefore + lineWeek + lineCompetitionAfter;
	return lineCompetition;
   }

   jRounds.addRestTeam = function(teams){
	var teamsEven = {};
	if(!teams){return teamsEven };
	count = 0;	
	for(index in teams){count++;}
	teamsEven = $.extend({}, teams);
	if(count%2 != 0){teamsEven[count++] = jRounds.restTeamName;}
	teamsEven = jRounds.shuffleJSON(teamsEven);        
	return teamsEven;
   }

   jRounds.isValidTeamNumber = function(numberOfTeams){
	if(numberOfTeams > jRounds.options.maxNumberOfTeams || numberOfTeams < jRounds.options.minNumberOfTeams || (numberOfTeams - 0) != numberOfTeams)
	    return false
	else
	    return true;
   }

   jRounds.getTeamName = function(position){
	if(position)
	   if(jRounds.options.names && jRounds.options.names[position])
	       return jRounds.options.names[position];
	   else
	       return "Team " + position;
	else
	   return null;
   }

   jRounds.shuffleJSON = function(json) {
        var teams = $.extend({}, json);
        var count = 0;	
        for(index in teams){count++;}
        if ( count == 0 ) return {};
        while ( --count ) {
           var randomIndex = Math.floor( Math.random() * ( count + 1 ) );
	   var temp1 = teams[count];
	   var temp2 = teams[randomIndex];
	   teams[count] = temp2;
	   teams[randomIndex] = temp1;
        }
	return teams;
   }
})(jQuery);
