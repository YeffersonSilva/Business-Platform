require('dotenv').config();
const Collaborator = require('../models/Collaborator');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

const registerCollaboratorAdmin = async (req, res) => {
    const data = req.body;
    try {
        const collaborator = await Collaborator.find({ email: data.email });

        if (collaborator.length > 0) {
            return res.status(400).json({ message: 'The email is already registered' });
        }

        bcrypt.hash(data.password, bcrypt.genSaltSync(10), null, async function(err, hash) {
            if (err) {
                return res.status(500).json({ message: 'Internal server error during password hashing' });
            } else {
                data.fullname = `${data.name} ${data.surname}`;
                data.password = hash;
                const newCollaborator = await Collaborator.create(data);
                res.status(201).json({ data: newCollaborator });
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error during registration' });
    }
}

const loginCollaborator = async (req, res) => {
    const data = req.body;

    try {
        const collaborator = await Collaborator.find({ email: data.email });

        if (collaborator.length > 0) {
            bcrypt.compare(data.password, collaborator[0].password, (err, check) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal server error during password comparison' });
                }

                if (check) {
                    const token = jwt.createToken(collaborator[0]);
                    return res.status(200).json({ message: 'Login successful', user: collaborator[0], token: token });
                } else {
                    return res.status(400).json({ message: 'Error password' });
                }
            });
        } else {
            return res.status(400).json({ message: 'User does not exist' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error during login' });
    }
}

module.exports = {
    registerCollaboratorAdmin,
    loginCollaborator
}
