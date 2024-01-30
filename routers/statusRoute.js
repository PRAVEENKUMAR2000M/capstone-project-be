const express = require('express');
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middleware/authmiddleware')
const statusRoute = express.Router();

statusRoute.post('/createstatus', authMiddleware.verifyToken, statusController.status)
statusRoute.get('/getstatus', authMiddleware.verifyToken, statusController.getStatus)
module.exports = statusRoute