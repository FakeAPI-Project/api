const express = require('express');
const router = require('./v1/routes/index');

const app = express();

// Routes SetUp
app.use('/v1', router);

module.exports = app;
