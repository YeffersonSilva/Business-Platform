const Client = require('../models/Client');

const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helpers/jwt");
const { set } = require('mongoose');

var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');



const registerClientAdmin = async (req, res) => {
    if(req.user){
    
     const data = req.body;
   
     // Validación de campos requeridos
     if (!data.name || !data.surname || !data.email) {
       return res
         .status(400)
         .send({ data: undefined, message: "All fields are required" });
     }
   
     try {
       const existingClient = await Client.findOne({
         email: data.email,
       });
   
       if (existingClient) {
         return res
           .status(400)
           .send({ data: undefined, message: "The email is already registered" });
       }
   
       bcrypt.hash(
         data.password,
         bcrypt.genSaltSync(10),
         null,
         async function (err, hash) {
           if (err) {
             return res
               .status(500)
               .send({
                 data: undefined,
                 message: "Internal server error during password hashing",
               });
           } else {
             data.fullname = `${data.name} ${data.surname}`;
             data.password = hash;
             
   
             const newClient = new Client(data);

             setEmail(newClient.email);
   
             // Validar el nuevo colaborador antes de guardarlo
             const validationError = newClient.validateSync();
             if (validationError) {
               return res
                 .status(400)
                 .send({ data: undefined, message: validationError.message });
             }
   
             await newClient.save();
             res.status(201).send({ data: newClient });
           }
         }
       );
     } catch (error) {
       return res
         .status(500)
         .send({
           data: undefined,
           message: "Internal server error during registration",
         });
      }
     }
     else{
       return res.status(401).send({ message: "Unauthorized" });
     }
   };

// Función para enviar correo de verificación
const setEmail = async (req, res) => {
  
var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
      user: 'diegoalonssoac@gmail.com',
      pass: 'dcmplvjviofjojgf'
  }
}));

//OBTENER CLIENTE

readHTMLFile(process.cwd() + '/mails/account_verify.html', (err, html)=>{
                      
  let rest_html = ejs.render(html, {token: token});

  var template = handlebars.compile(rest_html);
  var htmlToSend = template({op:true});

  var mailOptions = {
      from: 'diegoalonssoac@gmail.com',
      to: email,
      subject: 'Verificación de cuenta',
      html: htmlToSend
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (!error) {
          console.log('Email sent: ' + info.response);
      }
  });

});
}



module.exports = {
    registerClientAdmin
}