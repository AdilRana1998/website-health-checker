const healthCheckServices = {};
const { Strings, Logger } = require('../../utils')
const { slack } = require('./../../utils/Webhook');
const fetch = require('node-fetch');
const https = require('https');
const chalk = require("chalk"); 
const fineMessage = "KOLABRYA PRODUCTION SERVICE'S ARE WORKING FINE"
const errorMessage = "KOLABRYA PRODUCTION SERVICES ARE NOT RESPONDING"

healthCheckServices.postHealthCheck = async () => {
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        const serviceChecker = await fetch(process.env.KOLABYRA_HEALTH_CHECK_API, {agent});
        const responseBody = await serviceChecker.json();
        if (responseBody.code == '400') {
            Logger.data.HealthCheck({ response: responseBody.body }, errorMessage);
            slack.webhook(JSON.stringify({ action: errorMessage, responseBody }));
            return false
        }
        console.log(chalk.green(fineMessage)); //add the chalk package //speratly add the prd slack key in .env
        Logger.data.HealthCheck({ response: responseBody.body }, fineMessage);
        return {
            message: Strings.SUCCESS,
            statusCode: 200,
            obj: responseBody.body
        };
    } catch (error) {
        console.log(chalk.red(errorMessage,error));
        slack.webhook(JSON.stringify({ action: errorMessage, error: error.message }));
        return {
            message: Strings.ERROR.SOME_THING_WENT_WRONG,
            statusCode: 400,
            obj: {
                error: error.message
            }
        }
    }
}

module.exports = healthCheckServices;