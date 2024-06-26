const express = require('express');

const clientController = require('../controllers/clientController');
var authenticate = require('../middlerwares/authenticate');

const app = express();

app.post('/registerClientAdmin', authenticate.authenticate, clientController.registerClientAdmin);

app.get('/verifyAccount/:token', clientController.verifyAccount);

app.get('/getClients/:filtro', authenticate.authenticate, clientController.getClient);

app.get('/getDataloginClient/:id', authenticate.authenticate, clientController.getDataloginClient);

app.put('/updateClientAdmin/:id', authenticate.authenticate, clientController.updateClientAdmin);




module.exports = app;