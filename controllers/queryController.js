const QueryModel = require('../model/createQuery');

const queryController = {
    createQuery: async (request, response) => {
        try {
            const candidateID = request.userId;
            const { category, subcategory, voicecommunication, querytitle, querydescription } = request.body;

            const newQuery = new QueryModel({
                category,
                subcategory,
                voicecommunication,
                querytitle,
                querydescription,
                candidate: candidateID,
            });

            const savedQuery = await newQuery.save();
            return response.status(200).json({ message: "Query created", newQuery: savedQuery });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Internal Server Error" });
        }
    },

    getQuery: async (request, response) => {
        try {
            const candidateID = request.userId;
            const candidateQueries = await QueryModel.find({ candidate: candidateID });

            if (candidateQueries && candidateQueries.length > 0) {
                return response.status(200).json({ message: "Data retrieved", candidateQueries });
            } else {
                return response.status(400).json({ message: "No queries found for the candidate" });
            }
        } catch (error) {
            console.error(error);
            response.status(500).json({ message: "Internal Server Error" });
        }
    },

    getQueryid: async (request, response) => {
        try {
            const queries = await QueryModel.findById(request.query.queryId);
            response.json(queries)
        } catch (err) {
            console.error(err);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteQuery: async (request, response) => {
        try {
            const queryId = request.params.queryId; // Assuming you pass the queryId as a parameter in the URL
            const deletedQuery = await QueryModel.findByIdAndDelete(queryId);

            if (deletedQuery) {
                return response.status(200).json({ message: "Query deleted", deletedQuery });
            } else {
                return response.status(404).json({ message: "Query not found" });
            }
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Internal Server Error" });
        }
    },

};

module.exports = queryController;
