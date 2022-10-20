import Encryption from "./Encryption";
class Storage extends Encryption {

    /**
     * @type : non returnable
     * @param {*} key : key is required param to store the respective value.
     * @param {*} value : value can be anything.
     */
    set(key, value) {
        localStorage.setItem(key, this.encode(value));
    }

    /**
     * @type : return
     * @param {*} key : pass a key to get their value
     */
    get(key) {
        return this.decode(localStorage.getItem(key));
    }

    /**
     * @type : return
     * @param {*} key : pass a key to get their value
     */
    getString(key) {
        return this.decodeString(localStorage.getItem(key));
    }

    /**
     * @type : non returnable
     * @param {*} key : key is required
     * @param {*} boolValue : only boolean value
     */
    setBool(key, boolValue) {
        localStorage.setItem(key, boolValue);
    }

    /**
     * @type : return
     * @param {*} key : pass a key to retrive the assigned boolean value.
     */
    getBool(key) {
        return localStorage.getItem(key);
    }

    /**
     * 
     * @param {*} key : key name
     * @param {*} jsonObj : json Object
     */
    setJson(key, jsonObj) {
        localStorage.setItem(key, this.encodeJson(jsonObj));
    }

    /**
     * @type : return
     * @param {*} key 
     */

    getJson(key) {
        return this.decodeJson(localStorage.getItem(key));
    }

    /**
     * @type : return boolean true or false.
     * @param {*} key : which key need to check.
     */
    alive(key) {

        if (localStorage.getItem(key) === null) {
            return false;
        }
        else if (localStorage.getItem(key) != null || typeof localStorage.getItem(key) != "undefined") {
            return true;
        }
        else {
            return this.decode(localStorage.getItem(key));
        }
    }

    remove(key) {
        localStorage.removeItem(key);
    }

    removeAll() {
        localStorage.removeItem();
    }

    clearAll() {
        localStorage.clear();
    }


}

export default new Storage();