const db = require('../database/db');

const get_auth_service = async (bodydata) => {
    try {
        const { username, password } = bodydata;

        if (!username || !password) {
            throw new Error("Username and Password are required");
        }

        const query = "SELECT * FROM ecommerce.users where username = ? AND password = ?";
        const values = [username, password];

        const [rows] = await db.query(query, values);

        console.log("SQL Result:", rows);

        return rows.length > 0 ? rows[0] : null;

    } catch (err) {
        console.error("DB Error:", err);
        throw err;
    }
};

module.exports = get_auth_service;
