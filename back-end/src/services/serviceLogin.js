const jwt = require('jsonwebtoken');
const md5 = require('md5');
const jwtKey = require('fs').readFileSync('jwt.evaluation.key', {
  encoding: 'utf-8',
});
const { User } = require('../database/models/index');
// const tokenGenerator = require('../middlewares/tokenGenerator');
const ErrorGenerator = require('../utils/errorGenerator');

const jwtConfig = {
  expiresIn: '20d',
  algorithm: 'HS256',
};

const secretKey = jwtKey;

const existenceUser = async ({ email, password }) => User.findOne({
  where: { email, password },
});

const findUserbyEmail = async ({ email }) => User.findOne({
  where: { email },
});

const isBadRequest = ({ email, password }) => {
  const isValidEmail = /\S+@\S+\.\S+/;
  return isValidEmail.test(email) && password.length >= 6;
};

const loginService = async ({ email, password }) => {
  const requestType = isBadRequest({ email, password });
  console.log(requestType);
  
  if (!requestType) throw new ErrorGenerator(403, 'bad request');
  
  const user = await findUserbyEmail({ email });
  if (!user) throw new ErrorGenerator(404, 'Not found');
  
  const newPassword = md5(password);
  if (user.password !== newPassword) throw new ErrorGenerator(401, 'wrong password');
  const checkUser = await existenceUser({ email, password: newPassword });
  const response = { 
    name: checkUser.name, email: checkUser.email, role: checkUser.role, id: checkUser.id,
  };
  
  const token = jwt.sign(response, secretKey, jwtConfig);
  return { ...response, token };
};

module.exports = {
  loginService,
};
