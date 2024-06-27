const { verify } = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
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
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'Prospecto'
    },
    birth: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: true
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

    
    n_document: {
        type: String,
        required: false
    },
   
    verify: {
        type: Boolean,
        default: false,
        required: true
    },
 
  
    country: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    asesor: {
        type: Schema.Types.ObjectId, ref: 'Collaborator', required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }

});

module.exports = mongoose.model('client', ClientSchema);

