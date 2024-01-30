const statusModel = require('../model/status')

const statusController = {
    status: async (request, response) => {
        try {
            const candidateID = request.userId
            const { status } = request.body
            const newStatus = new statusModel({
                status,
                candidateID
                
            })
            const savedStatus = await newStatus.save(); // Make sure to await the save operation
            return response.status(200).json({ message: "status created", newStatus: savedStatus });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Internal Server Error" });
        }
    },

    getStatus: async (request, response) => {
        try {
            const candidateID = request.userId
            const status = await statusModel.findOne(candidateID)
            if (status) {
                return response.status(200).json({message:"retrive sucessfullt", status})
            }
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "failed to retrive the data" });
        }
    }
}

module.exports = statusController;
