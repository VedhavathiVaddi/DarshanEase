// TODO
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

const generateToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

module.exports = generateToken;