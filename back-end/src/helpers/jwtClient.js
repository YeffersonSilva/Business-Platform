require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');

const jwtSecret = process.env.JWT_SECRET;

exports.createToken = (user) => {
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        type: user.type,
        iat: moment().unix(),
        exp: moment().add(2, 'day').unix()
    }
    return jwt.sign(payload, jwtSecret);
}
