const jwt = require('jsonwebtoken');
const jwtKey = require('fs').readFileSync('jwt.evaluation.key', {
  encoding: 'utf-8',
});
const serviceCheckout = require('../services/serviceCheckout');

const getIdAndRole = (authorization) => {
  const { id, role } = jwt.verify(authorization, jwtKey);
  return { id, role };
};

const ERROR_MESSAGE = 'Ocorreu um erro';
const requestId = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const data = await serviceCheckout.createSale(req.body, token);
    return res.status(201).json({ message: 'created', response: data });
    // const body = req.body;
    // console.log(body);
    // return res.status(201).json({ body });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAll = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { id, role } = getIdAndRole(authorization);

    const sales = await serviceCheckout.getAllService(id, role);
    return res.status(200).json(sales);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: ERROR_MESSAGE });
  }
};

const updateStatus = async (req, res) => {
  console.log('ouch');
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedStatus = await serviceCheckout.updateStatusService(id, status);

    res.status(200).json(updatedStatus);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: ERROR_MESSAGE });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await serviceCheckout.getOneService(id);
    return res.status(200).json(sales);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: ERROR_MESSAGE });
  }
};

module.exports = { requestId, getAll, getOne, updateStatus };
