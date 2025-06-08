const { connect } = require("./config/mongo")
const initiateJobs = require("./jobs/sitesMonitor");
const initiateApiJobs = require("./jobs/apisMonitor")

connect().then(() => {
    initiateJobs()
        initiateApiJobs()
        console.log('Jobs rodando')

}).catch(err => {
    console.error("Erro ao rodar jobs:", err)
})