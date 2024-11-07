
const startServer = async() => {
    require('dotenv').config();

    const express = require('express'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        morgan = require('morgan');

    const http = require('http');
    const app = express();

    const db = require('./database/config');

    //DB Connection
    const connection = {
        db:process.env.DB_NAME,
        username: process.env.USER_NAME,
        password: process.env.PASSWORD, 
        host: process.env.DB_HOST,
        dialect: process.env.SQL_DB_TYPE
    }

    const sequelize = await db.initializeConnection(connection);
    await db.initializeModels();
    await sequelize.sync({ force: false });
    db.sequelize = sequelize;

    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
            limit: '500mb',
        })
    );
    app.use(morgan('dev'));

    app.use(process.env.API_PREFIX, require('./app/routes/'));

    const port = process.env.PORT || '3000';
    const host = process.env.HOST || 'localhost';
    const server = http.createServer(app);
    server.listen(port, host, function (err) {
        console.log(`
    >>  Listening for requests on http://${host}:${port}${process.env.API_PREFIX}
    >>  Logging access requests locally
    >>  Ready.
    `);
    });
}

startServer();