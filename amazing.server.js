const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs')
dotenv.config();
const { server: serverConfig, keys } = require('./config')
const http = require(serverConfig.protocol);
const { sendStatus } = require('./utils')
const bodyparser = require('body-parser');
const app = express();
const router = require('./api/routes');
require('./api/background');
var server;
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.json()); //Used to parse JSON bodie
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static('public'));

process.env.TZ = "Canada/Eastern";

app.use((req, res, next) => {
    res.header('X-Frame-Options', 'DENY');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Content-Security-Policy', 'frame-ancestors "none"');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    try {
        const userAgent = req.headers['user-agent'];
        const isSafari = userAgent.includes('Safari');
        if (isSafari) {
            res.setHeader('Connection', 'close');
        }
    } catch (e) {
        console.log(e.message);
    }

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH')
    }
    next();
})
app.use(router);

app.use((error, req, res, next) => {
    console.log({ serverError: error });
    sendStatus.data.badRequestStatus(res, req, {
        message: "Something went wrong..",
        codeMessage: error.message,
        code: 400,
    }, "Something went wrong")
});
if (serverConfig.protocol == "https" && keys.ssl && keys.ssl.key && keys.ssl.cert) {
    server = new http.createServer({
        key: fs.readFileSync(keys.ssl.key),
        cert: fs.readFileSync(keys.ssl.cert),
        requestCert: false,
        rejectUnauthorized: false
    }, app);
} else {
    server = http.createServer(app);;
}
server.listen(process.env.PORT || serverConfig.port, () => {
    console.log("Server is running on port : " + serverConfig.port)
});
