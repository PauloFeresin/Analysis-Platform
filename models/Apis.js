const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  method: { type: String, default: "GET" },
  headers: Object,
  body: Object,
  expectedKeys: {
    type: [String],
    default: [],
  },
  active: Boolean,
});

const Api = mongoose.model("Api", schema);
module.exports = Api;
