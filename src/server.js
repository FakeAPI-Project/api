const express = require('express');
const bodyParser = require('body-parser');
const router = require('./v1/routes/index');

const app = express();

// Body parser config
// urlencoded: Analyse sended date through the codification application/x-www-form-urlencoded
// urlencoded.extended: If false, uses querystring, otherwise, it uses qs
// json: Analyse data sended by using JSON format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Routes SetUp
app.use('/v1', router);

module.exports = app;
