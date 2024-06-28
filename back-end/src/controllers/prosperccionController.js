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

const getClientCallsProsperccion = async (req, res) => {
    if (req.user) {
        try {
            let id = req.params['id'];
            let clientCalls = await ClientCall.find({client : id}).sort({ createdAt: -1 });
            res.status(200).json({ data: clientCalls });
        } catch (error) {
            console.error(error);
            res.status(500).json({ data: undefined, message: 'Internal server error during client calls fetching' });
        }
    } else {
        res.status(401).json({ data: undefined, message: 'Unauthorized' });
    }
};

module.exports = {
    createClientCallProsperccion,
    getClientCallsProsperccion
};
