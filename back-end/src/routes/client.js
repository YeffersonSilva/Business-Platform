const express = require('express');

const clientController = require('../controllers/clientController');
var authenticate = require('../middlerwares/authenticate');

const app = express();

app.post('/register-client-admin', authenticate.authenticate, clientController.registerClientAdmin);


module.exports = app;