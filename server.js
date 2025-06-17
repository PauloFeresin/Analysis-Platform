const express = require("express")
const { connect } = require("./config/mongo")
const Site = require("./models/Site");
const sitesRouter = require("./routes/sites");
const logsRouter = require("./routes/logs")
const apisRouter = require("./routes/apis")
const apiLogsRouter = require("./routes/apiLogs")
const usersRouter = require("./routes/users")
const cors = require("cors");


const PORT = 3000;

const app = express()
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use((req, res, next) => {
    console.log("Corpo da requisição:", req.body);
    next(); // Passa a requisição para o próximo middleware
});

app.use("/sites", sitesRouter);
app.use("/logs", logsRouter);
app.use("/apis", apisRouter)
app.use("/apiLogs", apiLogsRouter)
app.use("/users", usersRouter)
app.use("/login", require("./routes/login")) //Podemos importar assim também

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

