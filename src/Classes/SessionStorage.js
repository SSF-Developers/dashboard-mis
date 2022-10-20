import Encryption from "./Encryption";
class SessionStorage extends Encryption {

    /**
     * @type : non returnable
     * @param {*} key : key is required param to store the respective value.
     * @param {*} value : value can be anything.
     */
    set(key, value) {
        sessionStorage.setItem(key, this.encode(value));
    }

    /**
     * @type : return
     * @param {*} key : pass a key to get their value
     */
    get(key) {
        return this.decode(sessionStorage.getItem(key));
    }

    /**
     * @type : return
     * @param {*} key : pass a key to get their value
     */
    getString(key) {
        return this.decodeString(sessionStorage.getItem(key));
    }

    /**
     * @type : non returnable
     * @param {*} key : key is required
     * @param {*} boolValue : only boolean value
     */
    setBool(key, boolValue) {
        sessionStorage.setItem(key, boolValue);
    }

    /**
     * @type : return
     * @param {*} key : pass a key to retrive the assigned boolean value.
     */
    getBool(key) {
        return sessionStorage.getItem(key);
    }

    /**
     * 
     * @param {*} key : key name
     * @param {*} jsonObj : json Object
     */
    setJson(key, jsonObj) {
        sessionStorage.setItem(key, this.encodeJson(jsonObj));
    }

    /**
     * @type : return
     * @param {*} key 
     */

    getJson(key) {
        return this.decodeJson(sessionStorage.getItem(key));
    }

    /**
     * @type : return boolean true or false.
     * @param {*} key : which key need to check.
     */
    alive(key) {

        if (sessionStorage.getItem(key) === null) {
            return false;
        }
        else if (sessionStorage.getItem(key) != null || typeof sessionStorage.getItem(key) != "undefined") {
            return true;
        }
        else {
            return this.decode(sessionStorage.getItem(key));
        }
    }

    remove(key) {
        sessionStorage.removeItem(key);
    }

    clear() {
        sessionStorage.clear()
    }
}

export default new SessionStorage();