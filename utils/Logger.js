const loggerHelper = require('./LoggerHelper');
const { slack } = require('./Webhook')
const logger = {}

logger.HealthCheck = (data, event) => {
    loggerHelper.eventLoggerHealthCheck(event, JSON.stringify(data));
}

exports.data = logger