const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";

const JWT_SECRET = process.env.JWT_SECRET_KEY || "my_secret_key";

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // attach user payload
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
}

module.exports = { authenticateToken };