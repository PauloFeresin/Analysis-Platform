const express = require("express")
const ApiLogs = require("../models/LogsApi")

const router = express.Router()

router.get("/", async (req, res) => {
    try{
        const logs = await ApiLogs.find()
        res.status(201).json(logs)
    } catch (err) {
        res.status(500).json({erro: err.message})
    }
});




module.exports = router



