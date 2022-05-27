const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
  })
  

const photoSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoType: String,
    date: Number, 
    location: String, 
    description: String,
    photoUrl: String,
    comments: String, 
    likes: [likesSchema] // embedded schema

    

    
})

module.exports = mongoose.model('Photo', photoSchema )