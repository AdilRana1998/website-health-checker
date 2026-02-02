const SendStatus = {}
const logger = require('./Logger');
const { Encryption } = require('../utils')
const { slack } = require('./Webhook')

const successCode = {
    code: 200,
    message: 'Request successful'
};
const badRequest = {
    code: 400,
    message: "Bad Request"
}

const sessionExpired = {
    code: 401,
    message: "We signed you out to protect your account, please Sign In again!"
}

const unauthorizedRequest = {
    code: 401,
    message: "UnAuthorized Request"
}

const logStore = (req, str, response) => {
    if (req && req.logger) {
        //removing the passwords from logs
        if (req.logger && req.logger.request && req.logger.request.password) {
            req.logger.request.password = '';
        }
        req.logger.response = response;
        logger.data.successLog(req.logger, str);
    }
}

const sendCode = (res, code, obj) => {
    // obj = Encryption.responseEncryption(obj)
    res.status(code).json(obj)
}
SendStatus.successStatus = (res, req, obj, message = "", stringLog = "No Data Provided") => {
    // logStore(req, stringLog)
    var results = {
        code: successCode.code,
        codeMessage: successCode.message,
        message: message,
        body: obj
    };
    sendCode(res, successCode.code, results)

}

const successStatus = (res, req, obj, message = "", stringLog = "No Data Provided") => {
    // logStore(req, stringLog)
    var results = {
        code: successCode.code,
        codeMessage: successCode.message,
        message: message,
        body: obj
    };
    sendCode(res, successCode.code, results)

}

const badRequestStatus2 = (res, req, obj, message = "", stringLog = "No Data Provided") => {
    // logStore(req, stringLog)
    let getfilename;
    var results = {
        code: badRequest.code,
        codeMessage: badRequest.message,
        message: message,
        body: obj
    };

    // const data = Object.keys(req?.files).reduce((acc, key) => {
    //     return acc.concat(req?.files[key]);
    // }, []);

    // if (data != '' && data) {
    //     getfilename = data.map((file) => {
    //         if (file.originalname != '') {
    //             return file.originalname;
    //         } else {
    //             return false;
    //         }
    //     })
    // }
    const errorAlert = {
        Email: req?.email,
        UserId: req?.userId,
        Route: req?.route.path,
        Request: req?.body, 
        Response: results,
        Attaachmnet: getfilename ? getfilename : ''
    };
 
    if (process.env.ENVIROMENT != 'LOCAL') {
        slack.webhook(JSON.stringify(errorAlert));
    }
    
    sendCode(res, badRequest.code, results)
}

SendStatus.badRequestStatus2 = (res, req, obj, message = "", stringLog = "No Data Provided") => {
    // logStore(req, stringLog)
    var results = {
        code: badRequest.code,
        codeMessage: badRequest.message,
        message: message,
        body: obj
    };
    sendCode(res, badRequest.code, results)
}

SendStatus.nothingStatus = (res, req, obj = {}, str = "") => {
    logStore(req, str)
}

SendStatus.unauthorizedStatus = (res, req, obj, str = "") => {
    logStore(req, str)
    res.status(unauthorizedRequest.code).json(obj)
}

SendStatus.sessionExpiredStatus = (res, req, obj, str = "") => {
    logStore(req, str)
    res.status(sessionExpired.code).json(obj)
}

SendStatus.badRequestStatus = (res, req, obj, str = "") => {
    logStore(req, str)
    var results = {}
    if (obj) {
        results = obj
    } else {
        results = {
            code: badRequest.code,
            message: str ? str : badRequest.message,
            jsonObject: null
        }
    }
    res.status(badRequest.code).json(results)
}

SendStatus.sortStatus = (res, req, obj, message = "", stringLog = "No Data Provided", statusCode) => {
    logStore(req, stringLog, obj);
    switch (statusCode) {
        case 200:
            successStatus(res, req, obj, message, stringLog);
            break;
        case 400:
            badRequestStatus2(res, req, obj, message, stringLog);
            break;
        default:
            badRequestStatus2(res, req, obj, message, stringLog);
    }
}




exports.data = SendStatus