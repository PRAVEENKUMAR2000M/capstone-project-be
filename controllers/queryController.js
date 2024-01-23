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
    }
}

module.exports = queryController