const ClientCall = require('../models/ClientCall');

const createClientCallProsperccion = async (req, res) => {
    if (req.user) {
        let data = req.body;
        try {
            let clientCall = await ClientCall.create(data);
            res.status(201).json({ data: clientCall });
        } catch (error) {
            console.error(error);
            res.status(500).json({ data: undefined, message: 'Internal server error during client call creation' });
        }
    } else {
        res.status(401).json({ data: undefined, message: 'Unauthorized' });
    }
};

module.exports = {
    createClientCallProsperccion,
};
