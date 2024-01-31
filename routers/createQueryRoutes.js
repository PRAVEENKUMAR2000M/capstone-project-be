const express = require('express');
const queryController = require('../controllers/queryController');
const authMiddleware = require('../middleware/authmiddleware')
const createQueryRoute = express.Router();


createQueryRoute.post('/createQuery', authMiddleware.verifyToken, queryController.createQuery)
createQueryRoute.get('/getQuery', authMiddleware.verifyToken, queryController.getQuery)
createQueryRoute.get('/Queries', authMiddleware.verifyToken, queryController.getQueryid)

createQueryRoute.delete('/deletequery/:queryId', authMiddleware.verifyToken, queryController.deleteQuery)
createQueryRoute.put('/deletequery/:queryId', authMiddleware.verifyToken, queryController.updateQuery)



module.exports = createQueryRoute