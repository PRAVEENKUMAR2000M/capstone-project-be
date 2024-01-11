const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/candidate')
const config = require('../utils/config')
require('dotenv').config()
const candidateController = {
    signup: async (request, response) => {
        try {
            const { name, email, password } = request.body
            const candidate = await user.findOne({ email })
            if (candidate) {
                return response.status(400).json({ message: "user already exist" })
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const newCandidate = new user({
                name,
                email,
                passwordHash
            })
            const saveCandidate = await newCandidate.save()
            response.status(200).json({ message: "candidate saved", candidate: saveCandidate })
        } catch (error) {
            response.status(500).json({ message: "error fetching data" })
        }
    },
    signin: async (request, response) => {
      try {
          const { email, password } = request.body
          const candidate = await user.findOne({ email })
          if (!candidate) {
              return response.status(500).json({ message: "user not found" })
          }
          const matchCandidate = await bcrypt.compare(password, candidate.passwordHash)
          if (!matchCandidate) {
              return response.status(400).json({ message: "incorrect password" })
          }
          const token = jwt.sign({
              id: candidate._id,
              name: candidate.name,
              email: candidate.email,
          }, config.JWT_SECRET)

          response.status(200).json({ message: "user signined", token, email: candidate.email, name: candidate.name })

      } catch (error) {
        response.status(400).json({message: error})
      }
    }
}

module.exports = candidateController