const Collaborator = require('../models/Collaborator');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');


const registerCollaboratorAdmin = async (req, res) => {
    const data = req.body;
    try {
        data.fullname = `${data.name} ${data.surname}`;
        const collaborator = await Collaborator.create(data);
        res.status(201).json({ data: collaborator });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }

    
    //console.log(req);
}

module.exports = {

    registerCollaboratorAdmin
}