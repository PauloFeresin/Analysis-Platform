const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    url:{type: String, required: true},
    name: {type: String, required: true},
    interval: {type: Number, required: true}
})

const Site = mongoose.model("Site", schema)

module.exports = Site