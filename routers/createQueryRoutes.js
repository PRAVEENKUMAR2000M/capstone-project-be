const express = require('express');
const queryController = require('../controllers/queryController');
const authMiddleware = require('../middleware/authmiddleware')
const createQueryRoute = express.Router();


createQueryRoute.post('/createQuery', authMiddleware.verifyToken, queryController.createQuery)
createQueryRoute.get('/getQuery', authMiddleware.verifyToken, queryController.getQuery)

module.exports = createQueryRoute