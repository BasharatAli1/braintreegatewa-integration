//Module imports
const { Sequelize, DataTypes }   = require('sequelize');
const initializeOrderModel        = require('../app/models/orders');
//Global variables
let sequelize = null;
const db = {};

const initializeConnection = async(connDetails) => {
    try{
        const { db, username, password, host, dialect } = connDetails;
        
        sequelize = new Sequelize(db, username, password, {
            host,
            dialect,
            timezone: '00:00',//Telling sequelize to store date-time in UTC
            dialectOptions: { 
                decimalNumbers: true, //This allows to return decimal values as number, otherwise value is returned as string. This is issue in sequelize,
                useUTC: true // Instructing Sequelize for writing date-time to database in UTC
            } 
            
        });

        await sequelize.authenticate();
        return sequelize;
    }catch(err){
        console.error('Unable to connect to the database:', err);
        return false;
    }
}

db.initializeConnection = initializeConnection;

const initializeModels = async() => {
    db.Order = await initializeOrderModel(sequelize, DataTypes);
}

db.initializeModels = initializeModels;

module.exports = db;