/**
 * Provides unit tests for terminal application. Use unit.run() to run unit tests.
 *
 * Coverage: 1%
 */
var unit = new function() {

    var wrongs = 0,
        passed = 0;

    var write = function(text) {
        log.write(text);
    };

    var pass = function(value,expected,string,where) {
        if (value == expected) {
            passed += 1;
            string = "passed: [" + string + "] in " + where;
        } else {
            wrongs += 1;
            string = "wrong: [" + string + "] != " + value + " in " + where;
        }
        write(string);
    };

    var fullTest = {

        "parser.convertPositionForHTML": function(f,n) {

            var test = {
                0: { s: "test", p: 0, r: 0 },
                1: { s: "test", p: 3, r: 3 },
                2: { s: "test", p: -1, r: 0 },
                3: { s: "test", p: 100, r: 4 },
                4: { s: "a<tag>b", p: 0, r: 0 },
                5: { s: "a<tag>test", p: 7, r: 10 },
                6: { s: "a<tag>test", p: 6, r: 10 },
                7: { s: "a<tag>test", p: 2, r: 7 },
                8: { s: "a<tag>test", p: 6, r: 10 },
                9: { s: "a<tag>test", p: 4, r: 9 },
                10: { s: "a&nbsp;test", p: 1, r: 1 },
                11: { s: "a&nbsp;test", p: 2, r: 7 },
                12: { s: "a&nbsp;test", p: 5, r: 10 },
                13: { s: "a&nbsp;test", p: 6, r: 11 },
                14: { s: "a&nbsp;test", p: 7, r: 11 },
                15: { s: "a&nbsp;test", p: 9, r: 11 },
                16: { s: "I <a>a&nbsp;te</a>st", p: 5, r: 13 },
                17: { s: "I <a>a&nbsp;te</a>st", p: 6, r: 14 },
                18: { s: "I <a>a&nbsp;te</a>st", p: 8, r: 20 },
                19: { s: "I <a>a&nbsp;te</a>st", p: 12, r: 20 },
                20: { s: "I <a>a&nbsp;te</a>st", p: 15, r: 20 },
                21: { s: "I <a>a&nbsp;te</a>st", p: 17, r: 20 },
                22: { s: "I <a>a&nbsp;te</a>st", p: 18, r: 20 },
                23: { s: "I <a>a&nbsp;te</a>st", p: 19, r: 20 }
            };

            for (var t in test) {
                if (!test.hasOwnProperty(t)) continue;
                var o = test[t];
                pass(f(o.s, o.p), o.r, o.p + " in \""+ o.s +"\" gives " + o.r,n);
            }

        }

    };


    this.run = function() {
        wrongs = 0;
        passed = 0;
        for (var test in fullTest) {
            if (!fullTest.hasOwnProperty(test)) continue;
            if (typeof fullTest[test] == "function") {
                var f = eval(test);
                if (typeof f == "function") {
                    fullTest[test].call(this,f,test);
                } else {
                    pass(false,"wrong unit","unitTest.run");
                }
            }
        }
        log.write("Passed: " + passed + "/" + (passed + wrongs));
        log.write("Failed: " + wrongs);
        if (wrongs > 0) log.write("Application is wrong to deploy.");
    };

};