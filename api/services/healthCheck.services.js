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

const fineMessage = "PRODUCTION SERVICE'S ARE WORKING FINE";
const errorMessage = 'PRODUCTION SERVICES ARE NOT RESPONDING';

healthCheckServices.postHealthCheck = async () => {
    try {
        let record = {}
        const options = {
            key: keys.ssl.key ? fs.readFileSync(keys.ssl.key) : "",
            cert: keys.ssl.cert ? fs.readFileSync(keys.ssl.cert) : "",
            rejectUnauthorized: false
        }
        const httpsAgent = new https.Agent(options);
        const checkFe = await fetch(process.env.URL_FRONTEND + 'login', { agent: httpsAgent });        
        Logger.data.HealthCheck({ url: checkFe.url, status: checkFe.status, statusText: checkFe.statusText, methodName: "checkFe" }, "Check Front End URL");
        const checkDB = await db.sequelize.authenticate().then(() => {
            return {
                status: 200,
                message: "DB Connected Successfully"
            }
        }).catch(e => {
            return {
                status: 400,
                message: "DB Not Connected Successfully " + e.message
            }
        });
        Logger.data.HealthCheck({ response: checkDB, methodName: "checkDB" }, "Check Database Connectivity");
        const url = process.env.URL_FRONTEND.replace(/^https?:\/\//, '').replace(/\/$/, '');
        const sslStatus = await sslChecker(url, { method: 'GET' })
            .then((cert) => {
                return {
                    status: cert.daysRemaining <= 2 ? 400 : 200,
                    sslValid: cert.valid,
                    sslDaysLeft: cert.daysRemaining <= 2 ? "Please renew the SSL Certificate only "+cert.daysRemaining +" day's left": cert.daysRemaining,
                    sslExpiresOn: cert.validTo
                };
            })
            .catch((error) => {
                return {
                    status: 400,
                    sslValid: false,
                    sslDaysLeft: 0,
                    sslExpiresOn: "Could not retrieve SSL information",
                    error: error.message
                };
            });
        Logger.data.HealthCheck({ response: sslStatus, methodName: "sslStatus" }, "Check SSL Validity");
        if (checkFe.status == '200' && checkDB.status == '200' && sslStatus.status == '200') {
            return {
                message: Strings.SUCCESS,
                statusCode: 200,
                obj: {
                    "front-end": "UP",
                    "back-end": "UP",
                    "data-base": "UP",
                    "SSL": "VALID",
                    "license": "VALID"
                }
            }
        }
        if (checkFe.status != '200') {
            record['front-end'] = 'DOWN';
        }
        if (checkFe.status == '200') {
            record['front-end'] = 'UP';
        }
        if (checkDB.status != '200') {
            record['data-base'] = 'DOWN';
        }
        if (checkDB.status == '200') {
            record['data-base'] = 'UP';
        }
        if (sslStatus.status != '200') {
            // record['SSL'] = 'EXPIRED';
            record['SSL'] = sslStatus.sslDaysLeft;
        }
        if (sslStatus.status == '200') {
            record['SSL'] = 'VALID';
        }

        record['back-end'] = 'UP';
        record['license'] = 'VALID';   //making it on default on command of yahya
        return {
            message: Strings.ERROR.PRD_SERVICES_DOWN,
            statusCode: 400,
            obj: record
        }

    } catch (error) {
        console.log("Error while health check of kolabrya production envirnoment", error);
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