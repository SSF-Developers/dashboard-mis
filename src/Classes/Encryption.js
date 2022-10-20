import cryptoJs from "crypto-js";

class Encryption {

    constructor() {
        this.encConfig = {
            encKey: "w@#(z@MdB",
            encConfig: {}
        }
    }

    /**
     * @type : return
     * @param {*} string : any string allowed to encrypt
     */
    encode(string) {

        return cryptoJs.AES.encrypt(string.toString(), this.encConfig.encKey, this.encConfig.encConfig);
    }

    /**
     * @type : return
     * @param {*} encryptedText : only encrypted text will be decrypted
     */
    decode(encryptedText) {
        const cipherText = cryptoJs.AES.decrypt(encryptedText.toString(), this.encConfig.encKey, this.encConfig.encConfig);
        return cipherText.toString();
    }

    decodeString(encryptedText) {
        const cipherText = cryptoJs.AES.decrypt(encryptedText, this.encConfig.encKey, this.encConfig.encConfig);
        return cipherText.toString(cryptoJs.enc.Utf8);
    }

    /**
     * @type : return
     * @param {*} jsonObject : json oject required
     */
    encodeJson(jsonObject) {
        return cryptoJs.AES.encrypt(JSON.stringify(jsonObject), this.encConfig.encKey);
    }

    /**
     * @type : return
     * @param {*} jsonEncryptedText : json encrypted text
     */
    decodeJson(jsonEncryptedText) {

        const cipherTextJson = cryptoJs.AES.decrypt(jsonEncryptedText.toString(), this.encConfig.encKey);
        return JSON.parse(cipherTextJson.toString(cryptoJs.enc.Utf8));
    }

}

export default Encryption;