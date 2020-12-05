'use strict'

const express = require('express')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const file = require("./../utilities/file")
const storage = require("./../utilities/storage")
const rest = require("./../utilities/rest_caller")

// Create express router
const router = express.Router()

router.post('/', upload.single('file'), function (req, res, next) {
    var userId = req.body.userId
    var filename = "resume" + file.get_extension(req.file.originalname)
    var orgPath = req.file.path
    var renamePath = req.file.destination + filename

    file.rename(orgPath, renamePath)
        .then(function (finalPath) {
            const BUCKET = "cmpt470resumes"
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

router.post('/parse', upload.single('file'), function (req, res, next) {
    var filename = req.file.originalname
    var orgPath = req.file.path
    var renamePath = req.file.destination + filename

    file.rename(orgPath, renamePath)
        .then(function (path) {
            var base64String = file.base64(path)
            var uri = "https://g5wkkduchj.execute-api.us-east-2.amazonaws.com/Prod"
            var contents = '{"content": "' + base64String + '"}'
            return rest.post_call(uri, contents)
        })
        .then(function (response) {
            res.json({ data: response })
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(500).send("An Internal Error Has Occured")
        })
})

// Export router
module.exports = router
