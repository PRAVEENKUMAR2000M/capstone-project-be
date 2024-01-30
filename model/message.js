const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: String,
    text: String,
    timestamp: String,
})

module.exports = mongoose.model('message', messageSchema)