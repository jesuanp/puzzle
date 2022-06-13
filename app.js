const path = require('path');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(express.json());

app.use(cors({
    origin: "*"
}));

app.use('/', require('./rutasSocket.js'));

const server = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = server;
