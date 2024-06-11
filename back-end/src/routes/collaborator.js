const express = require('express');

var registerCollaboratorAdmin = require('../controllers/collaboratorController');
var loginCollaborator = require('../controllers/collaboratorController');
var authenticate = require('../middlerwares/authenticate');

const app = express();

app.post('/registerCollaboratorAdmin',authenticate.authenticate, registerCollaboratorAdmin.registerCollaboratorAdmin);
app.post('/loginCollaboratorAdmin', loginCollaborator.loginCollaborator);

module.exports = app;