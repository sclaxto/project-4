const express = require('express');
const router = express.Router();
const photosCtrl = require('../../controllers/photos');
const multer  = require('multer')
const upload = multer(); // <- handles multipart/formdata requests(photos)

router.post('/', upload.single('photo'), photosCtrl.create)
router.get('/', photosCtrl.index)
router.delete('/photos/:id', photosCtrl.deletePhoto)

module.exports = router;