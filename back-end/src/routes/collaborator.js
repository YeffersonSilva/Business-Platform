const express = require('express');

var registerCollaboratorAdmin = require('../controllers/collaboratorController');
var loginCollaborator = require('../controllers/collaboratorController');

const app = express();

app.post('/registerCollaboratorAdmin', registerCollaboratorAdmin.registerCollaboratorAdmin);
app.post('/loginCollaborator', loginCollaborator.loginCollaborator);

module.exports = app;