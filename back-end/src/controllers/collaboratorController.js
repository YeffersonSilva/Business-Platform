require('dotenv').config();
const Collaborator = require('../models/Collaborator');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

const registerCollaboratorAdmin = async (req, res) => {
    const data = req.body;

    // Validación de campos requeridos
    if (!data.name || !data.surname || !data.email ||  !data.rol) {
        return res.status(400).send({ data: undefined, message: 'All fields are required' });
    }

    try {
        const existingCollaborator = await Collaborator.findOne({ email: data.email });

        if (existingCollaborator) {
            return res.status(400).send({ data: undefined, message: 'The email is already registered' });
        }

        bcrypt.hash(data.password, bcrypt.genSaltSync(10), null, async function (err, hash) {
            if (err) {
                return res.status(500).send({ data: undefined, message: 'Internal server error during password hashing' });
            } else {
                data.fullname = `${data.name} ${data.surname}`;
                data.password = hash;

                const newCollaborator = new Collaborator(data);

                // Validar el nuevo colaborador antes de guardarlo
                const validationError = newCollaborator.validateSync();
                if (validationError) {
                    return res.status(400).send({ data: undefined, message: validationError.message });
                }

                await newCollaborator.save();
                res.status(201).send({ data: newCollaborator });
            }
        });

    } catch (error) {
        return res.status(500).send({ data: undefined, message: 'Internal server error during registration' });
    }
}

const loginCollaborator = async (req, res) => {
    const data = req.body;

    // Validación de campos requeridos
    if (!data.email || !data.password) {
        return res.status(400).send({ data: undefined, message: 'Email and password are required' });
    }

    try {
        const collaborator = await Collaborator.findOne({ email: data.email });

        if (collaborator) {
            if (collaborator.state) {
                bcrypt.compare(data.password, collaborator.password, (err, check) => {
                    if (err) {
                        return res.status(500).send({ data: undefined, message: 'Internal server error during password comparison' });
                    }

                    if (check) {
                        const token = jwt.createToken(collaborator);
                        return res.status(200).send({ message: 'Login successful', data: collaborator, token: token });
                    } else {
                        return res.status(400).send({ data: undefined, message: 'Incorrect password' });
                    }
                });
            } else {
                return res.status(400).send({ data: undefined, message: 'This user no longer exists' });
            }
        } else {
            return res.status(400).send({ data: undefined, message: 'User does not exist' });
        }
    } catch (error) {
        return res.status(500).send({ data: undefined, message: 'Internal server error during login' });
    }
}

module.exports = {
    registerCollaboratorAdmin,
    loginCollaborator
}
