// models/Collaborator.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollaboratorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    n_document: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    state: {   
        type: Boolean,
        default: true,
        required: true
    },
    country: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Collaborator', CollaboratorSchema);
