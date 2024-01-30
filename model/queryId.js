// QueryModel.js
const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    _id: String,
    category: String,
    // other properties...
});

const QueryModel = mongoose.model('Query', querySchema);

module.exports = QueryModel;
