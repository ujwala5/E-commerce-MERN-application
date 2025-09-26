//encryption and deceryption ligic only

const CryptoJS = require("crypto-js");
const dotenv = require('dotenv');
dotenv.config();


const encryptedPassword = async (pass) => {
    console.log("pas==>", pass);
    const SECRET_KEY = process.env.JWT_SECRET_KEY || "my_secret_key";

    let encryptedPassRes = CryptoJS.AES.encrypt(pass, SECRET_KEY).toString();
    console.log("encryptedPassRes ===>>", encryptedPassRes);
    return encryptedPassRes;

}

const decryptPass = async (pass) => {
    const SECRET_KEY = process.env.JWT_SECRET_KEY || "my_secret_key";
    const bytes = CryptoJS.AES.decrypt(pass, SECRET_KEY);
    console.log("bytes ==> ", bytes);
    const decryptedPass = bytes.toString(CryptoJS.enc.Utf8); // decode back to text
    console.log("decryptedPass ==>>", decryptedPass);
}

module.exports = {
    encryptedPassword,
    decryptPass
}

// encryptedPassword("Ujwala@123");
// decryptPass("U2FsdGVkX1+4qe67oYuiNMGWYA/8zqRzf4lnyBKWD50=")