const express = require("express")
const ApiLogs = require("../models/LogsApi")
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()

// Precisa de autenticação
router.get("/", authMiddleware, async (req, res) => {
    try{
        const logs = await ApiLogs.find()
        res.status(201).json(logs)
    } catch (err) {
        res.status(500).json({erro: err.message})
    }
});




module.exports = router



