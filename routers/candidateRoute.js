
const express = require('express');
const candidateController = require('../controllers/candidateControl');
const authMiddleware = require('../middleware/authmiddleware');
const candidateRoute = express.Router();

candidateRoute.post('/signup', candidateController.signup)
candidateRoute.post('/signin', candidateController.signin)
candidateRoute.put('/:id', candidateController.updateCandidate)
candidateRoute.delete('/:id', candidateController.deleteCandidate)
candidateRoute.get('/getcandidate', authMiddleware.verifyToken, candidateController.getCandidate)

module.exports = candidateRoute;