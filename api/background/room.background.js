const background = {};
const {    
    healthCheckService
 } = require('../services')

background.RunHealthCheck = async () => {
    return await healthCheckService.postHealthCheck();
}

module.exports = background
