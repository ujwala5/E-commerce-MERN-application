const db = require('../database/db');
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const get_auth_service = async (bodydata) => {
    try {
        const { username, password } = bodydata;

        // console.log({ bodydata });
        // if (!email || !password) {
        //     throw new Error("Username and Password are required");
        // }

        // Decrypt function
        // function decryptPassword(ciphertext) {
        //     const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        //     const res = bytes.toString(CryptoJS.enc.Utf8); // decode back to text

        //     console.log({ res });
        // }

        // decryptPassword("U2FsdGVkX18Xe9Pxlgm/YO9OxFzHUDRrOf53QYN72f0=");

        const query = "SELECT * FROM ecommerce.users where email = ?";
        const values = [username];

        const [rows] = await db.query(query, values);

        console.log("SQL Result:", rows);

        const encryptedPass = rows[0].password;
        console.log("encryptedPass ==>", encryptedPass);
        const SECRET_KEY = "my-very-secret-key";

        const bytes = CryptoJS.AES.decrypt(encryptedPass, SECRET_KEY);
        const decryptedPass = bytes.toString(CryptoJS.enc.Utf8); // decode back to text
        console.log("decryptedPass ==>>", decryptedPass);

        if (decryptedPass === password) {
            return rows.length > 0 ? rows[0] : null;
        }

    } catch (err) {
        console.error("DB Error:", err);
        throw err;
    }
};

const generateToken = async (bodydata) => {
    try {

        const { email, password } = bodydata;

        const JWT_SECRET = process.env.JWT_SECRET_KEY || "my_secret_key";

        // Fake user (for demo purpose)
        const payload = {
            username: email,
            password: password
        };

        let token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
        // console.log("token==>>", token);
        return token;


    } catch (err) {
        console.error("DB Error:", err);
        throw err;
    }
}

const registerService = async (bodydata) => {
    console.log({ bodydata });
    const { nameRes, mobile, email, password } = bodydata;

    const SECRET_KEY = "my-very-secret-key";

    // Encrypt function
    // function encryptPassword(password) {
    //     return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
    // }

    let encryptedPass = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
    console.log("encryptedPass ===>>", encryptedPass);

    const query = 'INSERT INTO ecommerce.users (username, mobile, email, password) VALUES(?,?,?,?)';
    const values = [nameRes, mobile, email, encryptedPass];
    const result = await db.query(query, values);
    return result[0];
}

const checkUsernameExists = async (email) => {
    let query = "SELECT * FROM users where email = ?";
    let values = [email];
    let result = await db.query(query, values);
    console.log("checkUsernameExists result ==>", result);
    if (result[0].length > 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    get_auth_service,
    generateToken,
    registerService,
    checkUsernameExists
}

