'use strict'

const express = require('express')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const file = require("./../utilities/file")
const storage = require("./../utilities/storage")

// Create express router
const router = express.Router()

router.post('/profilepicture', upload.single('file'), function (req, res, next) {
    var userId = req.body.userId
    var filename = "profile_picture" + file.get_extension(req.file.originalname)
    var orgPath = req.file.path
    var renamePath = req.file.destination + filename

    file.rename(orgPath, renamePath)
        .then(function (finalPath) {
            const BUCKET = "cmpt470profilepics"
            var cloudStoragePath = userId + "/" + filename
            return storage.upload_file(BUCKET, finalPath, cloudStoragePath)
        })
        .then(function (cloudPath) {
            var url = `https://storage.googleapis.com/${cloudPath.bucket.name}/${cloudPath.name}`
            res.status(200).json({ url: url })
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(500).send("An Internal Error Has Occured")
        })
})

// Export router
module.exports = router
