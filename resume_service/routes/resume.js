'use strict'

const express = require('express')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
const file = require("./../utilities/file")
const storage = require("./../utilities/storage")
const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
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
            res.status(200).json({url: url})
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
            const formData = new FormData();
            const fileStream = fs.createReadStream(path);
            formData.append('resume', fileStream);
            return fetch("https://jobs.lever.co/parseResume", {
                method: "POST",
                headers: {
                    Origin: "https://jobs.lever.co",
                    Referer: "https://jobs.lever.co/parse",
                },
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        res
                            .status(response.status)
                            .send(
                                response.status == 500
                                    ? "Could not parse resume"
                                    : "Could not connect to Lever"
                            );

                        return;
                    }
                    return response.json();
                })
                .then((response) => res.json({data: response}))
                .catch((err)=> console.log(err));
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(500).send("An Internal Error Has Occured")
        })
})

// Export router
module.exports = router

