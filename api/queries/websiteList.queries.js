const Queries = {};
const dbModel = require('../model');
const db = dbModel;
const dbHealthChecker = db.healthChecker;
const attributes_1 = ['url']

Queries.getData = async () => {
    return await dbHealthChecker.findAll({
        attributes: attributes_1,
        where: {
            isActivated: true
        },
        raw: true
    });
};

module.exports = Queries;