const { error } = require("console")
const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    siteId: { type: mongoose.Schema.Types.ObjectId, ref: "Site", required: true },
    url: {type: String},
    name: {type: String},
    status: { type: Number, required: true },
    responseTime: { type: Number, required: true },
    error: { type: String, default: null },
    timestamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model("SiteLog", schema, "siteLogs");
