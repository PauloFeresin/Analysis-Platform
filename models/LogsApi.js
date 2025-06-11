const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    apiId: { type: mongoose.Schema.Types.ObjectId, ref: "Api", required: true },
    url: {type: String},
    name: {type: String},
    status: { type: Number, required: true },
    responseTime: { type: Number, required: true },
    error: { type: String, default: null },
    timestamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model("ApiLog", schema, "apiLogs"); 