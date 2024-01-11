
const express = require('express');
const candidateController = require('../controllers/candidateControl');
const candidateRoute = express.Router();

candidateRoute.post('/signup', candidateController.signup)
candidateRoute.post('/signin', candidateController.signin)

module.exports = candidateRoute;