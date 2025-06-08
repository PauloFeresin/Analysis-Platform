const cron = require("node-cron")
const axios = require("axios")
const Site = require("../models/Site");
const Log = require("../models/Logs");


async function checkSite(site) {
    const start = Date.now();
    try {
        const response = await axios.get(site.url);
        const duration = Date.now() - start;
        const log = {
            siteId: site._id,
            url: site.url,
            name: site.name,
            status: response.status,
            responseTime: duration,
            error: null
        }
        await Log.create(log)
        console.log(`${site.name}: Status ${response.status} - Tempo ${duration}ms`);

    } catch (err) {
        const duration = Date.now() - start;
        console.log(`${site.name}: Erro ${err.message} - Tempo ${duration}ms`);

        const log = {
            siteId: site._id,
            url: site.url,
            name: site.name,
            status: 0,
            responseTime: duration,
            error: err.message,
        };
        await Log.create(log);
    }
};
function initiateJobs() {
    cron.schedule("*/5 * * * * *", async () => {
        try {
            const sites = await Site.find();
            await Promise.all(sites.map(site=>checkSite(site)))

        } catch (err) {
            console.error(err)
        }
    })
}


module.exports = initiateJobs