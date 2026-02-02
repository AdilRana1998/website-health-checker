const Rooms = require('./room.background');
const cron = require("node-cron");
let flags = {
    RunHealthCheck: true,
}

if (process.env.KOLABYRA_HEALTH_CHECK === 'true') {
    cron.schedule("*/15 * * * * *", async function () {
        try {
            if (flags.RunHealthCheck) {
                flags.RunHealthCheck = false;
                await Rooms.RunHealthCheck();
                flags.RunHealthCheck = true;
            } else {
                console.log("process is still running for kolabrya health check");
            }
        } catch (e) {
            flags.RunHealthCheck = true;
            console.log("kolabrya health check failed due to ", e.message);
        }
    });
} else {
    console.log("kolabrya health check not running");
}