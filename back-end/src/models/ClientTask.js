const { verify } = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientTaskSchema = new Schema({
    date: {
        type: String,
        required: true
    }, 
    note: {
        type: String,
        required: true
    },
    tipe: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    

    asesor: {
        type: Schema.Types.ObjectId, ref: 'Collaborator', required: false
    },
    client: {
        type: Schema.Types.ObjectId, ref: 'client', required: false
    },
    asesorCheck: {
        type: Schema.Types.ObjectId, ref: 'Collaborator', required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }

});

module.exports = mongoose.model('clientTask', ClientTaskSchema);

