const express = require('express');

var prosperccion = require('../controllers/prosperccionController');
var authenticate = require('../middlerwares/authenticate');

const app = express();


app.post('/createClientCallProsperccion', authenticate.authenticate, prosperccion.createClientCallProsperccion);
app.get('/getClientCallsProsperccion/:id', authenticate.authenticate, prosperccion.getClientCallsProsperccion);
app.post('/createClientEmailsProsperccion', authenticate.authenticate, prosperccion.createClientEmailsProsperccion);

module.exports = app;