const Controller = {}
const { sendStatus } = require('../../utils')
const {
    postHealthCheck,
} = require('../services/healthCheck.services');

Controller.postHealthCheck = async (req, res, next) => {
    const result =  await postHealthCheck();
    sendStatus.data.sortStatus(res, req, result.obj, result.message, "Kolabrya-Health-Check", result.statusCode);
}

module.exports = Controller;
