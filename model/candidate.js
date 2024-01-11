const mongoose = require('mongoose');
const candidateSchema = new mongoose.Schema({
    name: String,
    email:String,
    passwordHash: String
});

module.exports = mongoose.model('candidate', candidateSchema, 'candidate')