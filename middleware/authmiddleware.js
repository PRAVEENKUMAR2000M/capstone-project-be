const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const authMiddleware = {
    verifyToken: (request, response, next) => {
        const token = request.headers.authorization
        if (!token) {
            return response.send(500).json({message: "token not found"})
        }

        const getTokenFrom = (request) => {
            const authorization = request.headers.authorization
            if (authorization && authorization.toLowerCase().startsWith('bearer')) {
                return authorization.substring(7)
            }
            return null;
        }
        // console.log(getTokenFrom(request))
           try {
               jwt.verify(getTokenFrom(request), config.JWT_SECRET, (error, decodedToken) => {
                   if (error) {
                    return response.send(500).json({message:"token invalid"})
                   }
                   request.candidateId = decodedToken.id
                //    console.log(request.candidateId)
                   next();
               })
               
           } catch (error) {
            //    console.log('inside')
            return response.send(500).json({message: error})
           }
    },
}
module.exports = authMiddleware

