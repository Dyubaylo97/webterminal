/**
 * Local data storage object for saving/loading settings.
 *
 * Required:
 *  parser
 */
var storage = new function() {

    /** --- reserved ---
     * lastSaveDate
     * restoreSession # after set up, the next terminal initialization will restore data from local storage.
     */

    /**
     * Returns last saved date or null pointing to loading ability.
     * @returns {Date || undefined}
     */
    this.lastSave = function() {
        return this.get("lastSaveDate");
    };

    /**
     * Forces to modify last save data.
     */
    this.modifySave = function() {
        var date = new Date();
        localStorage.setItem("lastSaveDate", date.valueOf());
    };

    /**
     * Clears all stored data.
     */
    this.clear = function() {
        localStorage.clear();
    };

    /**
     * Checks if local storage is available.
     *
     * @returns {boolean}
     */
    this.available = function() {
        try {
            return "localStorage" in window && window["localStorage"] !== null;
        } catch (e) {
            return false;
        }
    };

    /**
     * Sets the local storage key.
     *
     * @param key
     * @param value
     */
    this.set = function(key, value) {
        if (!this.available()) return;
        var data = value;
        if (typeof value === "object") data = parser.objectToJson(value);
        try {
            localStorage[key] = data;
        } catch (e) {
            terminal.output.write(lang.get(47))
        }
    };

    /**
     * Removes key from storage.
     *
     * @param key
     */
    this.delete = function(key) {
        if (localStorage && localStorage.hasOwnProperty(key)) {
            delete localStorage[key];
        }
    };

    /**
     * Gets local storage key value.
     *
     * @param key
     * @returns {*}
     */
    this.get = function(key) {
        if (!this.available()) return undefined;
        var data = localStorage[key];
        try {
            data = parser.jsonToObject(data)
        } catch (e) {

        }
        return data;
    };

    /**
     * Storage initialization.
     */
    this.initialize = function() {
        if (!this.available()) {
            terminal.output.write(lang.get(48))
        }
    }

};