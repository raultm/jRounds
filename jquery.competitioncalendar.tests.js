module("Competition Calendar");
 
test("Default Options", function() {
    same($.competitionCalendar.defaultOptions.teamsLength, 20);
});

test("Override Default Options", function() {
    $.competitionCalendar.overrideOptions({
        teamsLength : 10,
    });
    
    same($.competitionCalendar.defaultOptions.teamsLength, 20);   
});
