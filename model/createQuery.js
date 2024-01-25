const mongoose = require('mongoose');

const createQuerySchema = new mongoose.Schema({
    category: String,
    subcategory: String,
    voicecommunication: String,
    querytitle: String,
    querydescription: String,
    from: {
        type: Date,
        default: Date.now
    },
    Till: {
        type: Date,
        default: Date.now
    },
    cancel: String,
    create: String
})

module.exports = mongoose.model('query', createQuerySchema, 'createQuery');








// const Query = require('../model/createQuery'); // Corrected variable name to start with an uppercase letter

// const queryController = {
//     createQuery: async (request, response) => {
//         try {
//             const candidateID = request.userId; // Corrected variable name and source
//             const { category, preferredVoiceCommunication, queryTitle, queryDescription } = request.body; // Corrected variable names

//             const newQuery = new Query({ // Corrected variable name to start with an uppercase letter
//                 category,
//                 preferredVoiceCommunication,
//                 queryTitle,
//                 queryDescription,
//                 candidate: candidateID,
//             });

//             await newQuery.save(); // Added 'await' to wait for the query to be saved
//             return response.status(200).json({ message: "Query created", candidateID });
//         } catch (error) {
//             console.error(error); // Logging the error for debugging purposes
//             return response.status(500).json({ message: "Invalid" });
//         }
//     },
// };

// module.exports = queryController;





















