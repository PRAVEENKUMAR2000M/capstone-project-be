const express = require('express');
const messageController = require('../controllers/messageController')
const authMiddleware = require('../middleware/authmiddleware')
const messageRoute = express.Router();

messageRoute.post('/createmessage', authMiddleware.verifyToken, messageController.newMessage)
messageRoute.get('/getmessage', authMiddleware.verifyToken, messageController.getMessage)
module.exports = messageRoute