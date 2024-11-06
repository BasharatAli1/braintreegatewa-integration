// const tracer = require('dd-trace').init()
require('dotenv').config();

const express = require('express'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	morgan = require('morgan');

const http = require('http');
const app = express();


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
