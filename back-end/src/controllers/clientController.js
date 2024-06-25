const Client = require('../models/Client');
const bcrypt = require("bcrypt-nodejs");
const jwtClient = require("../helpers/jwtClient");
const jwt = require('jsonwebtoken');
const fs = require('fs');
const handlebars = require('handlebars');
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const path = require('path');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Función para enviar correo de verificación
const setEmail = async (email) => {
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
    const client = await Client.findOne({ email });
    if (!client) {
      throw new Error('Client not found');
    }

    const token = jwtClient.createToken(client);

    const filePath = path.join(process.cwd(), 'src', 'mails', 'account_verify.html');
    console.log(`Leyendo archivo HTML de: ${filePath}`);

    readHTMLFile(filePath, (err, html) => {
      if (err) {
        console.error('Error leyendo el archivo HTML:', err);
        return;
      }

      const rest_html = ejs.render(html, { token });
      const template = handlebars.compile(rest_html);
      const htmlToSend = template({ op: true });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verificación de cuenta',
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


const registerClientAdmin = async (req, res) => {
  if (req.user) {
    const data = req.body;

    if (!data.name || !data.surname || !data.email) {
      return res.status(400).send({ data: undefined, message: "All fields are required" });
    }

    try {
      const existingClient = await Client.findOne({ email: data.email });

      if (existingClient) {
        return res.status(400).send({ data: undefined, message: "The email is already registered" });
      }

      bcrypt.hash(data.password, bcrypt.genSaltSync(10), null, async (err, hash) => {
        if (err) {
          return res.status(500).send({
            data: undefined,
            message: "Internal server error during password hashing",
          });
        } else {
          data.fullname = `${data.name} ${data.surname}`;
          data.password = hash;

          const newClient = new Client(data);

          const validationError = newClient.validateSync();
          if (validationError) {
            return res.status(400).send({ data: undefined, message: validationError.message });
          }

          await newClient.save();
          await setEmail(newClient.email);
          res.status(201).send({ data: newClient });
        }
      });
    } catch (error) {
      return res.status(500).send({
        data: undefined,
        message: "Internal server error during registration",
      });
    }
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};


const verifyAccount = async (req, res) => {
  const tokenParams = req.params['token'];
  const token = req.headers.authorization.replace(/['"]+/g, "");
  const segment = token.split('.');

  if (segment.length !== 3) {
    return res.status(401).send({ message: "Invalid token format" });
  } else {
    try {
      const payload = jwt.decode(token, process.env.JWT_SECRET);
      await Client.findOneAndUpdate({ _id: payload.id }, { verify: true });
      res.status(200).send({ message: "Account verified" });
    }
    catch (error) {
      console.log(error); 
      return res.status(401).send({ message: "Invalid token" });
    }

  };
}



const getClient = async (req, res) => {
  if (req.user) {
    try {
      let filtro = req.params['filtro'];
      const client = await Client.find({
        $or: [
          { name: new RegExp(filtro, 'i') },
          { surname: new RegExp(filtro, 'i') },
          { email: new RegExp(filtro, 'i') },
          { n_document: new RegExp(filtro, 'i') },
          { fullname: new RegExp(filtro, 'i') }
        ]
      });
      res.status(200).send({ data: client });
    } catch (error) {
      res.status(500).send({
        data: undefined,
        message: "Internal server error during clients query",
      });
    }
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = {
  registerClientAdmin,
  setEmail,
  verifyAccount,
  getClient
};
