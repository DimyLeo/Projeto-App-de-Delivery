const jwt = require('jsonwebtoken');
require('dotenv/config');
const jwtKey = require('fs').readFileSync('jwt.evaluation.key', {
  encoding: 'utf-8',
});

const createToken = (data) => {
  const token = jwt.sign({ data }, jwtKey, {
    expiresIn: '99d',
    algorithm: 'HS256',
  });
  console.log('createToken', token);
  return token;
};

const validatedToken = (token) => {
  try {
    const { data } = jwt.verify(token, jwtKey);
    console.log('verify', data);
    return data;
  } catch (_e) {
    const error = new Error('Token Invalido');
    return error;
  }
};

module.exports = {
  validatedToken,
  createToken,
};