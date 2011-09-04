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
        teamsLength : 10,
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
