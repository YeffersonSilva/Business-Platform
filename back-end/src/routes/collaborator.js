const express = require('express');

var collaborator = require('../controllers/collaboratorController');
var authenticate = require('../middlerwares/authenticate');

const app = express();

app.post('/registerCollaboratorAdmin',authenticate.authenticate, collaborator.registerCollaboratorAdmin);
app.post('/loginCollaboratorAdmin', collaborator.loginCollaborator);
app.get('/getCollaborators', authenticate.authenticate, collaborator.getCollaborators);
app.put('/setState/:id', authenticate.authenticate, collaborator.setState);
app.get('/getDataloginCollaborator/:id', authenticate.authenticate, collaborator.getDataloginCollaborator);

module.exports = app;