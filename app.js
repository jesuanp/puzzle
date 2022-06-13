const path = require('path');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/', require('./rutasSocket.js'));

const server = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = server;
