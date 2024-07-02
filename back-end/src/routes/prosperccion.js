const express = require('express');
const nodemailer = require('nodemailer');


var prosperccion = require('../controllers/prosperccionController');
var authenticate = require('../middlerwares/authenticate');

const app = express();


app.post('/createClientCallProsperccion', authenticate.authenticate, prosperccion.createClientCallProsperccion);
app.get('/getClientCallsProsperccion/:id', authenticate.authenticate, prosperccion.getClientCallsProsperccion);
app.post('/createClientEmailsProsperccion', authenticate.authenticate, prosperccion.createClientEmailsProsperccion);

app.get('/getClientEmailProsperccion/:id', authenticate.authenticate, prosperccion.getClientEmailProsperccion);

module.exports = app;