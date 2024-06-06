const express = require('express');

var registerCollaboratorAdmin = require('../controllers/collaboratorController');

const app = express();

app.post('/registerCollaboratorAdmin', registerCollaboratorAdmin.registerCollaboratorAdmin);

module.exports = app;