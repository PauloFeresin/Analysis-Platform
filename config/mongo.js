const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.MONGO_URI;
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Mongo conectado via Mongoose");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB", err);
  }
}

module.exports = { connect };
