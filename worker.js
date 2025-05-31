const { connect } = require("./config/mongo")
const initiateJobs = require("./jobs/job");

connect().then(() => {
        initiateJobs()
        console.log('Jobs rodando')

}).catch(err => {
    console.error("Erro ao rodar jobs:", err)
})