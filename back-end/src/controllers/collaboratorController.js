require("dotenv").config();
const Collaborator = require("../models/Collaborator");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helpers/jwt");

// Register collaborator
const registerCollaboratorAdmin = async (req, res) => {
 if(req.user){
 
  const data = req.body;

  // Validación de campos requeridos
  if (!data.name || !data.surname || !data.email || !data.rol) {
    return res
      .status(400)
      .send({ data: undefined, message: "All fields are required" });
  }

  try {
    const existingCollaborator = await Collaborator.findOne({
      email: data.email,
    });

    if (existingCollaborator) {
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

          const newCollaborator = new Collaborator(data);

          // Validar el nuevo colaborador antes de guardarlo
          const validationError = newCollaborator.validateSync();
          if (validationError) {
            return res
              .status(400)
              .send({ data: undefined, message: validationError.message });
          }

          await newCollaborator.save();
          res.status(201).send({ data: newCollaborator });
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
// Login collaborator
const loginCollaborator = async (req, res) => {
  const data = req.body;

  // Validación de campos requeridos
  if (!data.email || !data.password) {
    return res
      .status(400)
      .send({ data: undefined, message: "Email and password are required" });
  }

  try {
    const collaborator = await Collaborator.findOne({ email: data.email });

    if (collaborator) {
      if (collaborator.state) {
        bcrypt.compare(data.password, collaborator.password, (err, check) => {
          if (err) {
            return res
              .status(500)
              .send({
                data: undefined,
                message: "Internal server error during password comparison",
              });
          }

          if (check) {
            const token = jwt.createToken(collaborator);
            return res
              .status(200)
              .send({
                message: "Login successful",
                data: collaborator,
                token: token,
              });
          } else {
            return res
              .status(400)
              .send({ data: undefined, message: "Incorrect password" });
          }
        });
      } else {
        return res
          .status(400)
          .send({ data: undefined, message: "This user no longer exists" });
      }
    } else {
      return res
        .status(400)
        .send({ data: undefined, message: "User does not exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ data: undefined, message: "Internal server error during login" });
  }
};
// Get all collaborators
const getCollaborators = async (req, res) => {
  // Validar si el usuario está autenticado
  if(req.user){
  try {
    const collaborators = await Collaborator.find();
    res.status(200).send({ data: collaborators });
  } catch (error) {
    res
      .status(500)
      .send({
        data: undefined,
        message: "Internal server error during collaborators query",
      });
  }
  }
  // Si no está autenticado
  else{
    return res.status(401).send({ message: "Unauthorized" });
  }



}

const setState = async (req, res) => {
  // Validar si el usuario está autenticado
  if(req.user){
    try {
      let id = req.params['id'];  
      let data = req.body;

      let newStatus = data.state;

      let collaborator = await Collaborator.findByIdAndUpdate(id, {
        state: newStatus
      }, { new: true });

      res.status(200).send({ data: collaborator });

    } catch (error) {
      res.status(500).send({    
        message: "Internal server error during collaborator state update",
      });
    }
  }
  else {
    return res.status(401).send({ message: "Unauthorized" });
  }
}

const getDataloginCollaborator = async (req, res) => {
  // Validar si el usuario está autenticado
  if(req.user){
    try {
      let id = req.params['id'];  
      let collaborator = await Collaborator.findById({_id: id});

      res.status(200).send({ data: collaborator });

    } catch (error) {
      res.status(500).send({    
        data: undefined,
        message: "Internal server error during collaborator state update",
      });
    }
  }
  else {
    return res.status(401).send({ message: "Unauthorized" });
  }
}


const updateCollaboratorAdmin = async (req, res) => {
  if (req.user) {
    let id = req.params["id"];
  
    const data = req.body;
    const collaborator = await Collaborator.findByIdAndUpdate({ _id: id },
      {
        name: data.name,
        surname: data.surname,
        fullname: `${data.name} ${data.surname}`,
        gender: data.gender,
        email: data.email,
        rol: data.rol,
        phone: data.phone,
        n_document: data.n_document,
        rol: data.rol,
        country: data.country
      },
      { new: true }
    );
    res.status(200).send({ data: collaborator });
  }
   else{
     return res.status(401).send({ message: "Unauthorized" });
   }
 };

module.exports = {
  registerCollaboratorAdmin,
  loginCollaborator,
  getCollaborators,
  setState,
  getDataloginCollaborator,
  updateCollaboratorAdmin
};
