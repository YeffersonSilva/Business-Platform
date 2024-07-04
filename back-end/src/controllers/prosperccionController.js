const fs = require('fs');
const handlebars = require('handlebars');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const path = require('path');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const Client = require('../models/Client'); // Asegúrate de que este sea el modelo correcto
const ClientEmails = require('../models/ClientEmail');
const ClientCall = require('../models/ClientCall');  // Asegúrate de importar el modelo correctamente
const ClientTask = require('../models/ClientTask'); 

// Call
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
            let clientCalls = await ClientCall.find({client : id}).populate('asesor').sort({ createdAt: -1 });
            res.status(200).json({ data: clientCalls });
        } catch (error) {
            console.error(error);
            res.status(500).json({ data: undefined, message: 'Internal server error during client calls fetching' });
        }
    } else {
        res.status(401).json({ data: undefined, message: 'Unauthorized' });
    }
};

// Emails


const createClientEmailsProsperccion = async (req, res) => {
  if (req.user) {
      let data = req.body;
      let client = await Client.findById({ _id: data.client });
      
      if (!client.email) {
          return res.status(400).json({ message: 'Email recipient not defined' });
      }

      setEmail(client.fullname, data.affair, client.email, data.content);

      try {
          let email = await ClientEmails.create(data);
          res.status(201).json({ data: email });
      } catch (error) {
          console.error(error);
          res.status(500).json({ data: undefined, message: 'Internal server error during client email creation' });
      }
  } else {
      res.status(401).json({ data: undefined, message: 'Unauthorized' });
  }
};

const setEmail = async (client, affair, email, content) => {
  if (!email) {
      console.error('No recipients defined');
      return;
  }

  console.log(`Iniciando el envío de correo a: ${email}`);

  const readHTMLFile = (filePath, callback) => {
      fs.readFile(filePath, { encoding: 'utf-8' }, (err, html) => {
          if (err) {
              callback(err);
          } else {
              callback(null, html);
          }
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
      console.log(`Leyendo archivo HTML de: ${filePath}`);

      readHTMLFile(filePath, (err, html) => {
          if (err) {
              console.error('Error leyendo el archivo HTML:', err);
              return;
          }

          const rest_html = ejs.render(html, {
              client: client,
              affair: affair,
              email: email,
              content: content
          });
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
                  console.error('Error enviando el correo:', error);
              } else {
                  console.log('Correo enviado:', info.response);
              }
          });
      });
  } catch (error) {
      console.error('Error en setEmail:', error.message);
  }
};


const getClientEmailProsperccion = async (req, res) => {
    if (req.user) {
        try {
            let id = req.params['id'];
            let email = await ClientEmails.find({client : id}).populate('asesor').sort({ createdAt: -1 });
            res.status(200).json({ data: email });
        } catch (error) {
            console.error(error);
            res.status(500).json({ data: undefined, message: 'Internal server error during client calls fetching' });
        }
    } else {
        res.status(401).json({ data: undefined, message: 'Unauthorized' });
    }
};
////////// Taks

const createClientTaksProsperccion = async (req, res) => {
    if (req.user) {
        let data = req.body;
        try {
            let task = await ClientTask.create(data);
            res.status(201).json({ data: task });
        } catch (error) {
            console.error(error);
            res.status(500).json({ data: undefined, message: 'Internal server error during client task creation' });
        }
    } else {
        res.status(401).json({ data: undefined, message: 'Unauthorized' });
    }
};


const getClientTaskProsperccion = async (req, res) => {
    if (req.user) {
        try {
            let id = req.params['id'];
            let task = await ClientTask.find({client : id}).populate('asesor').populate('asesorCheck').sort({ createdAt: -1 });
            res.status(200).json({ data: task });
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
    getClientCallsProsperccion,
    createClientEmailsProsperccion,
    getClientEmailProsperccion,
    createClientTaksProsperccion,
    getClientTaskProsperccion
};
