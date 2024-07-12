require("dotenv").config();
const jwt = require("jsonwebtoken");
const moment = require('moment');

const secret = process.env.JWT_SECRET;

// Middleware function to authenticate requests
exports.authenticate = (req, res, next) => {
  // Check if an authorization header is present
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "No authorization token provided" });
  }

  // Extract the token from the authorization header
  const token = req.headers.authorization.replace(/['"]+/g, "");

  // Verify if the token is present
  if (!token) {
    return res.status(401).send({ message: "Token not found" });
  }

  // Split the token into segments
  const segments = token.split('.');

  // Check if the token has the correct format
  if (segments.length !== 3) {
    return res.status(401).send({ message: "Invalid token format" });
  }

  // Verify the token
  try {
    const payload = jwt.verify(token, secret);

    // Check if the token has expired
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "Token has expired" });
    }

    // If verification is successful, pass the user information to req.user
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
};
