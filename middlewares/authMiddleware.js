const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_PASS;

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    // Header no formato "Bearer token"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Token mal formatado" });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // adiciona info do usuário à requisição
        next(); // deixa seguir
    } catch (err) {
        return res.status(401).json({ message: "Token inválido" });
    }
}

module.exports = authMiddleware;
