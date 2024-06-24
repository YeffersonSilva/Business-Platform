const express = require('express');

const clientController = require('../controllers/clientController');
var authenticate = require('../middlerwares/authenticate');

const app = express();

app.post('/registerClientAdmin', authenticate.authenticate, clientController.registerClientAdmin);

app.get('/verifyAccount/:token', authenticate.authenticate, clientController.verifyAccount);



module.exports = app;