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
		                                  
	tabs = $(html).appendTo(element).find('#competition-calendar-team-names-insertion');
   };

   competitionCalendar.getCalendar = function(teams) {
      return null;
   };
})(jQuery);
