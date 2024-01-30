const mongoose = require('mongoose')

const deleteQuerySchema = new mongoose.Schema({
    category: String,
    subcategory: String,
    voicecommunication: String,
    querytitle: String,
    querydescription: String
})

module.exports = mongoose.model('deleteQuery', deleteQuerySchema)