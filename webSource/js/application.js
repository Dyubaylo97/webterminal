/**
 * Basic application object.
 */
var application = new function() {

    var version = "1.0 beta"; // @link copy to language.js
    this.debug = true; // remove for release
    this.debugUrlPart = "127.0.0.1:57772"; // ip address to forward connection to

    this.browser = "gc";
    this.authorizationKey = "";

    /**
     * How to make your own theme for this terminal application? Just follow the next:
     *
     * 1. Add theme name to the list below;
     * 2. Make CSS theme file like theme-default.css;
     * 3. Place this file to /css/ directory and name it "theme-<name_of_your_theme>.css";
     * 4. Check theme in settings and use it!
     *
     * We're waiting for your cool themes ;)
     *
     * @type {{number}}
     */
    this.themes = { // here you can insert theme name, but do not forget to add appropriate theme file.
        "default": 0,
        "studio": 0,
        "monokai": 0
    };

    this.version = function() { return "Caché WEB Terminal v" + version };

    this.HELPBOX = lang.get(49);

    var tips = 8, currentTip = 0; // number of tips
    var getTip = function(no, all) {
        var s;
        switch (no){
            case 0: s = lang.get(50); break;
            case 1: s = lang.get(51); break;
            case 2: s = lang.get(52); break;
            case 3: s = lang.get(53); break;
            case 4: s = lang.get(54); break;
            case 5: s = lang.get(55); break;
            case 6: s = lang.get(56); break;
            default: s = lang.get(57);
        }
        if (!all) {
            if (no === 0) s += lang.get(58);
            else if (no === 1) s += lang.get(59);
            else if (no === 2) s += lang.get(60);
        }
        return s;
    };

    this.getTips = function(all) {
        var s = "<div class=\"normalWrap\">";

        if (all) {
            for (var i = 0; i < tips; i++) {
                s += getTip(i, all);
            }
        } else {
            s += getTip(currentTip++, all);
            currentTip = currentTip % tips;
        }

        return s + "</div>";
    };

    var detectBrowser = function() {
        var app = navigator.appName.toLowerCase(), b = "gc";
        switch (app) {
            case "microsoft internet explorer": b = "ie"; break;
            case "google chrome": b = "gc"; break;
            case "mozilla firefox": b = "mf"; break;
            case "netscape": b = "ns"; break;
            default: log.write("unrecognised browser: " + app);
        }
        application.browser = b;
    };

    this.initialize = function() {
        detectBrowser();
        terminal.initialize();
    };

};