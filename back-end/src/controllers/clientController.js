const mongoose = require('mongoose');
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
require('dotenv').config(); // Load environment variables from .env file

// Function to send verification email
const setEmail = async (email) => {
  console.log(`Starting email send to: ${email}`);

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
    const client = await Client.findOne({ email });
    if (!client) {
      throw new Error('Client not found');
    }

    const token = jwtClient.createToken(client);
    const filePath = path.join(process.cwd(), 'src', 'mails', 'account_verify.html');
    console.log(`Reading HTML file from: ${filePath}`);

    const html = await readHTMLFile(filePath);
    const rest_html = ejs.render(html, { token });
    const template = handlebars.compile(rest_html);
    const htmlToSend = template({ op: true });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Account Verification',
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

// Function to register a new client admin
const registerClientAdmin = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const data = req.body;

  if (!data.name || !data.surname || !data.email || !data.password) {
    return res.status(400).send({ data: undefined, message: "All fields are required" });
  }

  try {
    const existingClient = await Client.findOne({ email: data.email });

    if (existingClient) {
      return res.status(400).send({ data: undefined, message: "The email is already registered" });
    }

    const hash = await bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
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
  } catch (error) {
    res.status(500).send({
      data: undefined,
      message: "Internal server error during registration",
    });
  }
};

// Function to verify client account
const verifyAccount = async (req, res) => {
  const tokenParams = req.params.token;
  const token = req.headers.authorization.replace(/['"]+/g, "");
  const segments = token.split('.');

  if (segments.length !== 3) {
    return res.status(401).send({ message: "Invalid token format" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    await Client.findByIdAndUpdate(payload.id, { verify: true });
    res.status(200).send({ message: "Account verified" });
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: "Invalid token" });
  }
};

// Function to get clients based on filter
const getClient = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const filter = req.params.filtro;
    const clients = await Client.find({
      $or: [
        { name: new RegExp(filter, 'i') },
        { surname: new RegExp(filter, 'i') },
        { email: new RegExp(filter, 'i') },
        { n_document: new RegExp(filter, 'i') },
        { fullname: new RegExp(filter, 'i') }
      ]
    });
    res.status(200).send({ data: clients });
  } catch (error) {
    res.status(500).send({
      data: undefined,
      message: "Internal server error during clients query",
    });
  }
};

// Function to get client login data by ID
const getDataloginClient = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid client ID" });
    }

    const client = await Client.findById(id).populate('asesor');

    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }

    res.status(200).send({ data: client });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      data: undefined,
      message: "Internal server error during client data retrieval",
    });
  }
};

// Function to update client admin details
const updateClientAdmin = async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const id = req.params.id;
  const data = req.body;

  try {
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        name: data.name,
        surname: data.surname,
        fullname: `${data.name} ${data.surname}`,
        gender: data.gender,
        email: data.email,
        rol: data.rol,
        phone: data.phone,
        n_document: data.n_document,
        city: data.city,
        country: data.country,
        birth: data.birth,
      },
      { new: true }
    );

    res.status(200).send({ data: updatedClient });
  } catch (error) {
    res.status(500).send({
      data: undefined,
      message: "Internal server error during client update",
    });
  }
};

module.exports = {
  registerClientAdmin,
  setEmail,
  verifyAccount,
  getClient,
  getDataloginClient,
  updateClientAdmin
};
