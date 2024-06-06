const Collaborator = require('../models/Collaborator');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');


const registerCollaboratorAdmin = async (req, res) => {
    const data = req.body;
    try {
        const collaborator = await Collaborator.find({ email: data.email });

        bcrypt.hash('123456', null, null, async  function(err, hash)  {
           if (err) {
               return res.status(500).json({ message: 'Internal server error Password' });
           } else {
               if (collaborator.length > 0) {
                   return res.status(400).json({ message: 'The email is already registered' });
               }
               else {
                   data.fullname = `${data.name} ${data.surname}`;
                   data.password = hash;
                   const collaborator = await Collaborator.create(data);
                   res.status(201).json({ data: collaborator });
               }
            }

        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error Try' });
    }

    
    //console.log(req);
}

module.exports = {

    registerCollaboratorAdmin
}