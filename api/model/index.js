const { Sequelize, DataTypes, QueryTypes, Op } = require('sequelize');
const { Jsons } = require('../../utils')
const {
    database
} = require('../../config');
const sequelize = new Sequelize(database.name, database.user, database.password, {
    host: database.host,
    dialect: database.driver,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        freezeTableName: true
    },
    //timezone: '-04:00',
    logging: false,
    // logging: (sql, { bind }) => {
    //     console.log(`SQL: ${sql}`); 
    //     console.log('Parameters:', bind);
    // },
});
const forceVal = false

//init queryInterface;
const queryInterface = sequelize.getQueryInterface();

const queryInterfaceFunc = async () => {
}

const createView = () => {
}

sequelize.authenticate().then(() => {
    console.log("Connected");
}).catch(e => {
    console.log("Error ", e.message);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.op = Op;
db.queryType = QueryTypes;

const setAssociation = async () => {
    try {
        var res_usersTypes = await db.users_types.findAll({});
        if (res_usersTypes.length === 0) {
            await db.users_types.bulkCreate((await Jsons.database()).userType);
        }
        await db.users.bulkCreate((await Jsons.database()).users)
        await db.packages.bulkCreate(((await Jsons.database()).products));
    } catch (e) {
        console.log(e.message)
    }

}

db.sequelize.sync({ force: forceVal })
    .then(() => {
        if (forceVal) {
            console.log('yes re-sync');
            setAssociation();
        }

    })
    .catch(e => {
        console.log("syncError", e.message);
    })

db.healthChecker = require('./healthChecker.model')(sequelize, DataTypes);

//Query Interface
queryInterfaceFunc();

//creating Views
createView();

module.exports = db;