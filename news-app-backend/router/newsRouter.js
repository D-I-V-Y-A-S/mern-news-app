const express = require('express')
const router = express.Router()

//multer
const upload = require('../middleware/multer')

//controller
const { getAllnews, addnews, updatenews, deletenews } = require('../Controller/newsController')
const { validateID } = require('../Controller/validateController')
const {  getPostImage } = require('../Controller/displayImageController')


//crud
router.route('/').get(getAllnews).delete(deletenews)
router.route('/validate').post(validateID)

//image
router.get('/images/:fileName', getPostImage)
router.route('/toUpload/image').post(upload.single('newsImage'), addnews)
router.route('/').patch(upload.single('newsImage'), updatenews)

module.exports = router
