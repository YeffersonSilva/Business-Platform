const express = require('express');

var testController = require('../controllers/testController');

const app = express();

app.get('/test', testController.testController);

module.exports = app;