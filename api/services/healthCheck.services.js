const healthCheckServices = {};
const { Strings, Logger } = require('../../utils');
const { slack } = require('./../../utils/Webhook');
const fetch = require('node-fetch');
const https = require('https');
const chalk = require('chalk');
const fs = require('fs');
const sslChecker = require('ssl-checker');
const db = require('../model');
const { keys } = require('../../config');

const {
    websiteListQueries
} = require('../queries');

const fineMessage = "PRODUCTION SERVICE'S ARE WORKING FINE";
const errorMessage = 'PRODUCTION SERVICES ARE NOT RESPONDING';

healthCheckServices.postHealthCheck = async () => {
    try {
        const list = await websiteListQueries.getData()
        if (list.length > 0) {
            let record = {}
            console.log("**************************************");
            console.log("Job Started For Website's Health Check");
            console.log("**************************************");
            for (const element of list) {
                const url = element.url;
                try {
                    const response = await fetch(url);
                    console.log(fineMessage);
                    Logger.data.HealthCheck(
                        {
                            url,
                            status: response.status,
                            statusText: response.statusText,
                            methodName: "postHealthCheck"
                        },
                        "Find-Website-Status"
                    );

                } catch (err) {
                    console.error(errorMessage)
                    console.error(url)
                    record = {
                            website:url,
                            status: 0,
                            statusText: err.code || "UNREACHABLE",
                            error: err.message,
                            methodName: "postHealthCheck",
                            message: Strings.ERROR.PRD_SERVICES_DOWN
                        }
                    Logger.data.HealthCheck(
                        record,
                        "Find-Website-Status"
                    );
                    slack.webhook(JSON.stringify(record));
                }
            }
            console.log("************************************");
            console.log("Job Ended For Website's Health Check");
            console.log("************************************");

            return {
                message: Strings.SUCCESS,
                statusCode: 200,
                obj: record
            }
        } else {
            return {
                message: Strings.ROOM.EMPTY,
                statusCode: 200,
                obj: {}
            };
        }
    } catch (error) {
        console.log("Error while health check of production envirnoment", error);
        slack.webhook(JSON.stringify(error));
        return {
            message: Strings.ERROR.SOME_THING_WENT_WRONG,
            statusCode: 400,
            obj: {
                error: error.message
            }
        }
    }
}


// healthCheckServices.postHealthCheck = async () => {
//     try {
//         const agent = new https.Agent({
//             rejectUnauthorized: false
//         });

//         const serviceChecker = await fetch(process.env.KOLABYRA_HEALTH_CHECK_API, {agent});
//         const responseBody = await serviceChecker.json();
//         if (responseBody.code == '400') {
//             Logger.data.HealthCheck({ response: responseBody.body }, errorMessage);
//             slack.webhook(JSON.stringify({ action: errorMessage, responseBody }));
//             return false
//         }
//         console.log(chalk.green(fineMessage)); //add the chalk package //speratly add the prd slack key in .env
//         Logger.data.HealthCheck({ response: responseBody.body }, fineMessage);
//         return {
//             message: Strings.SUCCESS,
//             statusCode: 200,
//             obj: responseBody.body
//         };
//     } catch (error) {
//         console.log(chalk.red(errorMessage,error));
//         slack.webhook(JSON.stringify({ action: errorMessage, error: error.message }));
//         return {
//             message: Strings.ERROR.SOME_THING_WENT_WRONG,
//             statusCode: 400,
//             obj: {
//                 error: error.message
//             }
//         }
//     }
// }

module.exports = healthCheckServices;