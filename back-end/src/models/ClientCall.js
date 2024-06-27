const { verify } = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientCallSchema = new Schema({
    type: {
        type: String,
        required: true
    }, 
    hour: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    note: {
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

module.exports = mongoose.model('clientCall', ClientCallSchema);

