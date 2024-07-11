const fs = require('fs');
const handlebars = require('handlebars');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

const Client = require('../models/Client'); // Ensure this is the correct model
const ClientEmails = require('../models/ClientEmail');
const ClientCall = require('../models/ClientCall');  // Ensure to import the model correctly
const ClientTask = require('../models/ClientTask'); 

// Create a new client call
const createClientCallProspeccion = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const data = req.body;

    try {
        const clientCall = await ClientCall.create(data);
        res.status(201).json({ data: clientCall });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error during client call creation' });
    }
};

// Get client calls by client ID
const getClientCallsProspeccion = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;

    try {
        const clientCalls = await ClientCall.find({ client: id })
            .populate('asesor')
            .sort({ createdAt: -1 });
        res.status(200).json({ data: clientCalls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error during client calls fetching' });
    }
};

// Create a new client email
const createClientEmailsProspeccion = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const data = req.body;

    try {
        const client = await Client.findById(data.client);

        if (!client.email) {
            return res.status(400).json({ message: 'Email recipient not defined' });
        }

        await setEmail(client.fullname, data.affair, client.email, data.content);

        const email = await ClientEmails.create(data);
        res.status(201).json({ data: email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error during client email creation' });
    }
};

// Send an email to the client
const setEmail = async (client, affair, email, content) => {
    if (!email) {
        console.error('No recipients defined');
        return;
    }

    console.log(`Iniciando el envío de correo a: ${email}`);

    const readHTMLFile = (filePath) => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, { encoding: 'utf-8' }, (err, html) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(html);
                }
            });
        });
    };

    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }));

    try {
        const filePath = path.join(process.cwd(), 'src', 'mails', 'mail_message.html');
        console.log(`Reading HTML file from: ${filePath}`);

        const html = await readHTMLFile(filePath);
        const rest_html = ejs.render(html, { client, affair, email, content });
        const template = handlebars.compile(rest_html);
        const htmlToSend = template({ op: true });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: affair,
            html: htmlToSend
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('Error in setEmail:', error.message);
    }
};

// Get client emails by client ID
const getClientEmailProspeccion = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;

    try {
        const email = await ClientEmails.find({ client: id })
            .populate('asesor')
            .sort({ createdAt: -1 });
        res.status(200).json({ data: email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error during client calls fetching' });
    }
};

// Create a new client task
const createClientTaskProspeccion = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const data = req.body;

    try {
        const task = await ClientTask.create(data);
        res.status(201).json({ data: task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error during client task creation' });
    }
};

// Get client tasks by client ID
const getClientTaskProspeccion = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;

    try {
        const task = await ClientTask.find({ client: id })
            .populate('asesor')
            .populate('asesorCheck')
            .sort({ createdAt: -1 });
        res.status(200).json({ data: task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error during client calls fetching' });
    }
};

module.exports = {
    createClientCallProspeccion,
    getClientCallsProspeccion,
    createClientEmailsProspeccion,
    getClientEmailProspeccion,
    createClientTaskProspeccion,
    getClientTaskProspeccion
};
