const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoType: String,
    date: Number, 
    location: String, 
    description: String
    
})

module.exports = mongoose.model('Photo', photoSchema )