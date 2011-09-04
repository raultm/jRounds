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
    
   competitionCalendar.overrideOptions = function(options) {
      competitionCalendar.options = $.extend({}, competitionCalendar.defaultOptions, options);
   }; 

   competitionCalendar.scaffoldSettingsInsertion = function(element) {
       
	var settingOption = '';
	var html = 
		  "<div id='settings-insertion'>"
			+ settingOption
	        + "</div>";
		                                  
	$(element).html(html);
   }
   competitionCalendar.scaffoldTeamNamesInsertion = function(element) {
	
	var nameInputs = '';
	var teamsLength = competitionCalendar.options.teamsLength;

	for(position = 0; position<teamsLength; position++ ){
		frontendPosition = position + 1;
		nameInputs += 
			"<div class='team-name-input-div'>"
			    + "<label for='team-name-input-" + position + "'>Team Name " + frontendPosition + " : <label>"			
			    + "<input type='text' name='team-name-input-" + position + "' class='team-name-input' value='Team " + frontendPosition + "'/>"
			+ "</div>"	
	}

	var html = 
		  "<div id='team-names-insertion'>"
			+ nameInputs
	        + "</div>";
		                                  
	$(element).html(html);
   };

   competitionCalendar.getTeamNames = function(){
	teamNamesInputs = $('.team-name-input');
	teamNames = $.map(teamNamesInputs, function(input, index){ return $(input).val(); });
        return teamNames;
   }

   competitionCalendar.getFixtures = function(teams) {
	if(!teams){ return null; }
	
	teamsCount = 0;for(team in teams){teamsCount++;}
	if(teamsCount == 0){ return null; }
	
	fixtures = {'weeks' : {} };
	match = {};
	halfTeamsCount = teamsCount/2;
	
	for(week=0; week<(teamsCount-1)*2; week++){
		frontEndWeek = week + 1;
		fixtures.weeks[frontEndWeek] = { "matches" : {} };
		rotatedTeams = this.rotateTeamsJSON(teams);
		for(rotatedTeamsIndex=0; rotatedTeamsIndex < halfTeamsCount; rotatedTeamsIndex++){
			
			if(rotatedTeamsIndex==0 && (week%2)==0)	{ local = rotatedTeamsIndex; 	visitor = teamsCount - rotatedTeamsIndex - 1; }
			else if(rotatedTeamsIndex==0)		{ local = teamsCount - rotatedTeamsIndex- 1; 	visitor = rotatedTeamsIndex; }
			else if((rotatedTeamsIndex%2)==0)	{ local = rotatedTeamsIndex; 	visitor = teamsCount - rotatedTeamsIndex - 1; }
			else					{ local = teamsCount - rotatedTeamsIndex- 1; 	visitor = rotatedTeamsIndex; }
			fixtures.weeks[frontEndWeek].matches[rotatedTeamsIndex] = {
				  'local' : teams[local]
				, 'visitor' : teams[visitor]
			};
		}
	}

      	return fixtures;
   };

   competitionCalendar.rotateTeamsJSON = function(teamsToRotate){
	teamsRotates = teamsToRotate;
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
})(jQuery);
