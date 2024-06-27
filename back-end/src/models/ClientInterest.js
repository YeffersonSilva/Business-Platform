const { verify } = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientInterestSchema = new Schema({
    date: {
        type: String,
        required: true
    }, 
    note: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    cycle: {
        type: String,
        required: true
    },
    
    asesor: {
        type: Schema.Types.ObjectId, ref: 'Collaborator', required: false
    },
    client: {
        type: Schema.Types.ObjectId, ref: 'client', required: false
    },

    course: {
        type: Schema.Types.ObjectId, ref: 'Course', required: false
    },

    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }

});

module.exports = mongoose.model('clientInterest', ClientInterestSchema);

