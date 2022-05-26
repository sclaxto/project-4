const Photo = require('../models/photo');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');

const s3 = new S3();

module.exports = {
    create,
    index,
    deletePhoto
}

function create(req, res){
    console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
			console.log(err, ' from aws')
            const photo = await Photo.create({description: req.body.description, user: req.user, photoUrl: data.Location});
            console.log(photo)
			// make sure the post we're sending back has the user populated
			await photo.populate('user');
		
            res.status(201).json({photo: photo})
        })


    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

async function deletePhoto(req, res){
    try {
        
        const photo = await Photo.findOne({'photos._id': req.params.id, 'likes.username': req.user.username});
        photo.likes.remove(req.params.id) // mutating a document
		console.log(photo, " <-= photo in delete!")
        // req.params.id is the like id 
        await photo.save() // after you mutate a document you must save
        res.json({data: 'photo removed'})
    } catch(err){
        res.status(400).json({err})
    }
}

async function index(req, res){
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information 
        // when you fetch teh posts
        const photos = await Photo.find({}).populate('user').exec()
        res.status(200).json({photos})
    } catch(err){

    }
}