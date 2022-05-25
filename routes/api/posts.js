const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');
const multer  = require('multer')
const upload = multer(); // <- handles multipart/formdata requests(photos)

router.post('/', upload.single('photo'), postsCtrl.create)
router.get('/', postsCtrl.index)
router.delete('/posts/:id', postsCtrl.deletePosts)

module.exports = router;