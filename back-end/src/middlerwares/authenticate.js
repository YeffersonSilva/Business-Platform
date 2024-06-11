require("dotenv").config();
const jwt = require("jsonwebtoken");
const moment = require('moment');

const secret = process.env.JWT_SECRET;

exports.authenticate = (req, res, next) => {
  // Verificar si hay un header de autorización
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "No authorization token provided" });
  }

  // Obtener el token del header de autorización
  const token = req.headers.authorization.replace(/['"]+/g, "");
  
  // Verificar si el token está presente
  if (!token) {
    return res.status(401).send({ message: "Token not found" });
  }

  // Dividir el token en segmentos
  const segments = token.split('.');
  
  // Verificar si el token tiene el formato correcto
  if (segments.length !== 3) {
    return res.status(401).send({ message: "Invalid token format" });
  }

  // Verificar el token
  try {
    const payload = jwt.verify(token, secret);

    // Verificar si el token ha expirado
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "Token has expired" });
    }

    // Si la verificación es exitosa, pasar la información del usuario a req.user
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
};
