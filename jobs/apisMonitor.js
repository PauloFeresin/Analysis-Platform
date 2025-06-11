const cron = require("node-cron");
const axios = require("axios");
const Api = require("../models/Apis");
const ApiLog = require("../models/LogsApi");


async function checkApi(api) {
  const start = Date.now();

  try {
    const response = await axios({
      method: api.method,
      url: api.url,
      headers: api.headers,
      data: api.body,
    });

    const duration = Date.now() - start;

    const log = {
      apiId: api._id,
      url: api.url,
      name: api.name,
      status: response.status,
      responseTime: duration,
      error: null,
      timestamp: new Date(),
    };

    const savedLog = await ApiLog.create(log);
    console.log("Log salvo com sucesso:", savedLog._id);



  } catch (err) {
    const duration = Date.now() - start;

    const log = {
      apiId: api._id,
      url: api.url,
      name: api.name,
      status: 0,
      responseTime: duration,
      error: err.message,
      timestamp: new Date(),
    };

    await ApiLog.create(log);

    console.error("Erro ao rodar api job:", err.message);
  }
}


function initiateApiJobs() {
  cron.schedule("*/5 * * * * *", async () => {
    try {
const apis = await Api.find();
await Promise.all(apis.map(api => checkApi(api)));

    } catch (err) {
      console.error(err);
    }
  });
}

module.exports = initiateApiJobs;
