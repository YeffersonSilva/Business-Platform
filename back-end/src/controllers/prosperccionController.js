const ClientCall = require('../models/ClientCall');

const createClientCallProsperccion = async (req, res) => {
    if (req.user) {
        let data = req.body;
        let clientCall = new ClientCall.create(data);
        res.status(201).json({data: clientCall});
    }else{
        res.status(401).json({data : undefined,message: 'Unauthorized'});
    }
}


module.exports = {
    createClientCallProsperccion,
}