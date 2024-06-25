const express = require('express');

const clientController = require('../controllers/clientController');
var authenticate = require('../middlerwares/authenticate');

const app = express();

app.post('/registerClientAdmin', authenticate.authenticate, clientController.registerClientAdmin);

app.get('/verifyAccount/:token', clientController.verifyAccount);

app.get('/getClient/:filtro', authenticate.authenticate, clientController.getClient);




module.exports = app;