const express = require('express');
const nodemailer = require('nodemailer');

const prosperccion = require('../controllers/prosperccionController');
const authenticate = require('../middlewares/authenticate');

const app = express();

// Route to create a new client call
app.post('/createClientCallProspeccion', authenticate.authenticate, prosperccion.createClientCallProspeccion);

// Route to get client calls by client ID
app.get('/getClientCallsProspeccion/:id', authenticate.authenticate, prosperccion.getClientCallsProspeccion);

// Route to create a new client email
app.post('/createClientEmailsProspeccion', authenticate.authenticate, prosperccion.createClientEmailsProspeccion);

// Route to get client emails by client ID
app.get('/getClientEmailProspeccion/:id', authenticate.authenticate, prosperccion.getClientEmailProspeccion);

// Route to create a new client task
app.post('/createClientTaskProspeccion', authenticate.authenticate, prosperccion.createClientTaskProspeccion);

// Route to get client tasks by client ID
app.get('/getClientTaskProspeccion/:id', authenticate.authenticate, prosperccion.getClientTaskProspeccion);

module.exports = app;
