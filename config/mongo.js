const mongoose = require("mongoose");

const uri = "mongodb+srv://pauloferesin:Paulo18anos%21@meucluster.mfvzhcx.mongodb.net/siteMonitoring?retryWrites=true&w=majority&appName=MeuCluster";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Mongo conectado via Mongoose");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB", err);
  }
}

module.exports = { connect };
