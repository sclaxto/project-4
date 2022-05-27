const Post = require('../models/photo');

module.exports = {
    create,
    deleteLike
}

async function create(req, res){
 
    try {
		// Find a post, so we need the id of the post
        const photo = await Photo.findById(req.params.id);
		
        photo.likes.push({username: req.user.username, userId: req.user._id}); //mutating a document
        await photo.save()// save it
        res.status(201).json({data: 'like added'})
    } catch(err){
        console.log(err, "<- this is the error")
       
        res.status(400).json({err})
    }
    
}

async function deleteLike(req, res){
    try {
        
        const photo = await Photo.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        photo.likes.remove(req.params.id) // mutating a document
		console.log(photo, " <-= post in delete!")
        // req.params.id is the like id 
        await photo.save() // after you mutate a document you must save
        res.json({data: 'like removed'})
    } catch(err){
        res.status(400).json({err})
    }
}