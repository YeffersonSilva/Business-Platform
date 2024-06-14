const Client = require('../models/Client');

const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helpers/jwt");

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






module.exports = {
    registerClientAdmin
}