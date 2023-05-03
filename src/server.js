const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./v1/routes/index');

const app = express();

// Body parser config
// urlencoded: Analyse sended date through the codification application/x-www-form-urlencoded
// urlencoded.extended: If false, uses querystring, otherwise, it uses qs
// json: Analyse data sended by using JSON format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS config
// cors: Allows all cors requests from any domain
app.use(cors());

// Helmet config
app.use(helmet());

// Routes SetUp
app.use('/v1', router);

module.exports = app;
