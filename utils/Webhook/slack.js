const slack = {};
const { postMethod } = require('../Methods')
const { urls } = require('../../config')

slack.webhook = async (text) => {
    const request = {
        text: text
    }
    // console.log(JSON.stringify(request));
    await postMethod(urls.slackWebhook, request);
}

module.exports = {
    slack
}