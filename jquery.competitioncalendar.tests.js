module("Competition Calendar");
 
test("Default Options", function() {
    same($.competitionCalendar.defaultOptions.teamsLength, 20);
});
