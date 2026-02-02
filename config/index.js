const eventLogs = process.env.LOGS;
const filePath = process.env.FILE_PATH
const debugMode = true;
const database = {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    multipleStatment: process.env.DB_MULTIPLE_STATEMENT,
    driver: process.env.DB_DRIVER
}
const server = {
    protocol: process.env.HTTP_UNSECURE,
    domain: process.env.DOMAIN,
    port: process.env.PORT,
    ssl: undefined,
    httpOnly: true,
    secure: true,
    debug: true,
    whitelist: []
}

const urls = {
    slackWebhook: process.env.URL_SLACK_WEBHOOK,
    frontend: process.env.URL_FRONTEND,
    backend: process.env.URL_BACKEND,
    socketCore: process.env.URL_SOCKET_CORE,
    success: process.env.URL_FRONTEND + process.env.SUCCESS_URL,
    cancel: process.env.URL_FRONTEND + process.env.CANCEL_URL,
    redirectSession: process.env.URL_FRONTEND + process.env.REDIRECT_SESSION_URL,
    emailVerification: process.env.URL_FRONTEND + process.env.EMAIL_VERIFICATION,
    forgotPassword: process.env.URL_FRONTEND + process.env.FORGOT_PASSWORD,
    updatedPassword: process.env.URL_FRONTEND + process.env.UPDATED_PASSWORD,
    roomURL: process.env.URL_FRONTEND+'room/',
    logo: process.env.LOGO,
    recall: "https://api.recall.ai/api/v2",
    recallV1: process.env.RECALL_V1
}


const webhooks = {
    bot: process.env.URL_BACKEND + process.env.WEBHOOK_BOT,
    transcript: process.env.URL_BACKEND + process.env.WEBHOOK_TRANSCRIPTION
}

const keys = {
    stripeSecret: process.env.STRIPE_SECRET_KEY,
    stripePublish: process.env.STRIPE_PUBLISH_KEY,
    stripeSig: process.env.STRIPE_SIG,
    sendGridKey: process.env.SEND_GRID_KEY,
    ssl: {
        key: process.env.SSL_KEY,
        cert: process.env.SSL_CERT,
        ca: process.env.SSL_CA
    },
    recallHeader: process.env.RECALL_HEADER,
    googleOAuthClientId: process.env.GOOGLE_CALENDER_ID,
    googleOAuthClientSecret: process.env.GOOGLE_CALENDER_KEY,
    outlookOAuthClientId: process.env.MICROSOFT_CALENDER_ID,
    outlookOAuthSecret: process.env.MICROSOFT_CALENDER_KEY
}

module.exports = {
    eventLogs,
    filePath,
    database,
    server,
    urls,
    keys,
    debugMode,
    webhooks
}
