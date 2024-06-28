const express = require('express');

var prosperccion = require('../controllers/prosperccionController');
var authenticate = require('../middlerwares/authenticate');

const app = express();


app.post('/createClientCallProsperccion', authenticate.authenticate, prosperccion.createClientCallProsperccion);

module.exports = app;