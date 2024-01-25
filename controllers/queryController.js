const { response } = require('express')
const query = require('../model/createQuery')

const queryController = {
    createQuery: async (request, response) => {
        try {
            const candidateID = request.userId
            const { category, subcategory, voicecommunication, querytitle, querydescription } = request.body

            const newquery = new query({
                category,
                subcategory,
                voicecommunication,
                querytitle,
                querydescription,
                candidate: candidateID
            })
            saveQuery = await newquery.save();
            return response.status(200).json({ message: "query created", newquery })
        } catch (error) {
            return response.status(500).json({ message: "invalid" })

        }
    },

    getQuery: async (request, response) => {
        try {
            const candidateID = request.userId
            const candidate = await query.find(candidateID)
            if (!candidate) {
                return response.status(400).json({message:"error fetching the data"})
            } else {
                response.status(200).json({message:"data retrived", candidate})
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = queryController