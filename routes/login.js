const express = require("express")
const {login} = require("../auth/AuthController")


const router = express.Router()

router.post("/", login)

module.exports = router 