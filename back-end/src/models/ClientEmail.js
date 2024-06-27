const { verify } = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientEmailSchema = new Schema({
    affair: {
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    

    asesor: {
        type: Schema.Types.ObjectId, ref: 'Collaborator', required: false
    },
    client: {
        type: Schema.Types.ObjectId, ref: 'client', required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }

});

module.exports = mongoose.model('clientEmail', ClientEmailSchema);

