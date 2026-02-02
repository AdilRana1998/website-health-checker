const fs = require('fs');
const path = require('path')
var pathway = path.resolve(__dirname, '/../eventLogs/')
module.exports.pathway = pathway

module.exports.readFile = function (path, options) {
    return new Promise(function (res, rej) {
        fs.readFile(path, options, function (err, buffer) {
            if (err)
                rej(err);
            else
                res(buffer.toString());
        });
    });
}

module.exports.appendText = function (filePath, data) {
    filePath = filePath.replace("\\", "/");
    var directory = filePath.split("/").slice(0, -1);
    if (directory.length) {
        var proceed = true;
        for (var i = 1; i <= directory.length; i++) {
            if (!proceed) break;
            var path = directory.slice(0, i).join('/');
            if (fs.existsSync(path)) continue;
            proceed = fs.mkdirSync(path) == undefined;
        }
        if (proceed) appendFile(filePath, data);
    } else {
        appendFile(filePath, data);
    }
}

function appendFile(filePath, data) {
    data = data + "\r\n";
    fs.appendFile(filePath, data, (err) => {
        if (err) throw err;
    });
}