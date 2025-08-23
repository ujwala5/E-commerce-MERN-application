const mysql = require('mysql2');

// Database configuration
const db_config = {
    host: 'localhost',
    user: 'root',
    password: 'Root@1234',
    database: 'ecommerce',
    multipleStatements: true,
    port: 3306,
};

// Create a connection pool with promise support
const db = mysql.createPool(db_config).promise();

// Test the connection immediately
(async () => {
    try {
        const [rows] = await db.query('SELECT NOW() AS now');
        console.log("✅ MySQL Connected Successfully!");

    } catch (err) {
        console.error("❌ MySQL Connection Error:", err.message);
    }
})();

module.exports = db;
