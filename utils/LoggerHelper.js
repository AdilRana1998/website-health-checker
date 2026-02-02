const { eventLogs , debugMode } = require('../config');
const fileUtility = require('./fs.utility');

Number.prototype.padStart = function (maxLength, fillString = " ") {
    return this.toString().padStart(maxLength, fillString);
}

module.exports.formatDate = formatDate = function (date) {
    date = date || new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1).padStart(2, "0") + "-" + date.getDate().padStart(2, "0");
}

module.exports.eventLoggerHealthCheck = function (eventName, data = 'No data provided') {
    if (debugMode) {
        let log;
        let dateTime = new Date().toString();
        log = dateTime + "----" + eventName + "----" + data + "\r\n";
        let file_path = `../${"log/health-check"}/${formatDate()}.txt`;
        fileUtility.appendText(file_path, log);
    }
}