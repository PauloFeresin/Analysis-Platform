const express = require("express")
const { connect } = require("./config/mongo")
const Site = require("./models/Site");
const sitesRouter = require("./routes/sites");
const logsRouter = require("./routes/logs")
const cors = require("cors");


const PORT = 5000;

const app = express()
app.use(cors());
app.use(express.json())
app.use("/sites", sitesRouter);
app.use("/logs", logsRouter);


app.get("/", (req, res) => {
    res.send(`Servidor rodando na porta ${PORT}`)
})

connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor online na porta ${PORT}`);
    });
}).catch(err => {
    console.error("Erro ao iniciar o servidor:", err);
});

