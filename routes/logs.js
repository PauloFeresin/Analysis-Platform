const express = require("express")
const Logs = require("../models/Logs")

const router = express.Router()

router.get("/", async (req, res) => {
    try{
        const logs = await Logs.find()
        res.status(201).json(logs)
    } catch (err) {
        res.status(500).json({erro: err.message})
    }
});




module.exports = router



