const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/candidate');
const config = require('../utils/config');
require('dotenv').config();

const candidateController = {
    signup: async (request, response) => {
        try {
            const { name, email, password } = request.body;
            const candidate = await user.findOne({ email });

            if (candidate) {
                return response.status(400).json({ message: "User already exists" });
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newCandidate = new user({
                name,
                email,
                passwordHash
            });

            const saveCandidate = await newCandidate.save();
            response.status(200).json({ message: "Candidate saved", candidate: saveCandidate });
        } catch (error) {
            response.status(500).json({ message: "Error fetching data", error: error.message });
        }
    },
    signin: async (request, response) => {
        try {
            const { email, password } = request.body;
            const candidate = await user.findOne({ email });

            if (!candidate) {
                return response.status(404).json({ message: "User not found" });
            }

            const matchCandidate = await bcrypt.compare(password, candidate.passwordHash);

            if (!matchCandidate) {
                return response.status(400).json({ message: "Incorrect password" });
            }

            const token = jwt.sign({
                id: candidate._id,
                name: candidate.name,
                email: candidate.email,
            }, config.JWT_SECRET);

            response.status(200).json({ message: "User signed in", token, email: candidate.email, name: candidate.name, id:candidate._id });

        } catch (error) {
            response.status(500).json({ message: "Error signing in", error: error.message });
        }
    },

    getCandidate: async (request, response) => {
        try {
            const candidateId = request.candidateId
            const candidate = await user.findById(candidateId);
            // console.log(candidate);

            if (!candidate) {
                return response.status(404).json({ message: "User not found" });
            }

            response.status(200).json({ message: "User retrieved", candidate });
        } catch (error) {
            response.status(500).json({ message: "Error fetching the data", error: error.message });
        }
    },

    updateCandidate: async (request, response) => {
        try {
            const id = request.params.id
            // const candidate = await user.findByIdAndUpdate(id)
            const { name, email, password } = request.body
            if (!name && !email && !password) {
                return response.status(500).json({message:"invalid user"})
            }
            const passwordHash = await bcrypt.hash(password, 10)
            const newCandidate = await user.findByIdAndUpdate(id, { name, email, password })
            
            if (!newCandidate) {
                return response.status(500).json({message:"error occurred"})
            } else {
                return response.status(200).json({newCandidate})
            }
        } catch (error) {
            
        }
    },

    deleteCandidate: async (request, response) => {
        try {
            const id = request.params.id
            const candidate = await user.findByIdAndDelete(id)
            if (candidate) {
                return response.status(200).json({message:"deleted successfully"})
            } else {
                return response.status(404).json({message:"data fetching error"})
            }
        } catch (error) {
            console.log(error)
        }
    }
};

module.exports = candidateController;
