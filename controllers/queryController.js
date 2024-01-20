const query = require('../model/createQuery')

const queryController = {
    createQuery: async (request, response) => {
        try {
            const candidateID = request.userId
            const { category, preferedVoiceCommunication, QueryTitle, QueryDescription } = request.body

            const newquery = new query({
                category,
                preferedVoiceCommunication,
                QueryTitle,
                QueryDescription,
                candidate: candidateID
            })
            newquery.save();
            return response.status(200).json({ message: "query created", newquery })
        } catch (error) {
            return response.status(500).json({ message: "invalid" })

        }
    }
}

module.exports = queryController