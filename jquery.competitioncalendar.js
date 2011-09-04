(function($) {
   var competitionCalendar = $.competitionCalendar = {};
    
   competitionCalendar.defaultOptions = {
      teamsLength : 20
   };
                    
   competitionCalendar.options = null;
    
   competitionCalendar.overrideOptions = function(options) {
      competitionCalendar.options = $.extend({}, competitionCalendar.defaultOptions, options);
   };  
})(jQuery);
