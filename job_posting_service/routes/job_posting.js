'use strict'

const express = require('express')
const database = require("./../utilities/database")
const search_index = require("./../utilities/search_index")

// Create express router
const router = express.Router()
const JOB_POSTING_COLLECTION = "job_posting"

// add job posting
router.post('/', function (req, res) {
    //TODO: validate the request that the user 
<<<<<<< HEAD
    var post = req.body
    post.created_at = Date.now()

    // insert record to database
    database.insertRecord(JOB_POSTING_COLLECTION, post)
=======

    // insert record to database
    database.insertRecord(JOB_POSTING_COLLECTION, req.body)
>>>>>>> master
        .then(function (insertedId) {
            res.sendStatus(204)
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(500).send("An Internal Error Has Occured")
        });
});

// get job postings
router.get('/', function (req, res) {
    var query_limit = (req.query.queryLimit) ? req.query.queryLimit : 10;
    var query = (req.query.query) ? req.query.query : " ";

    database.getAll(JOB_POSTING_COLLECTION)
        .then(function (posts) {
            // build the index for searching
            var index = search_index.build_index(posts)
            var index_results = search_index.get_index(index, query, query_limit)

            // push all the promises in an array
            const promises = []
            index_results.forEach(id => {
                promises.push(database.findOne(JOB_POSTING_COLLECTION, id))
            })

            // return the results of all the promises (the job posting in database)
            Promise.all(promises)
                .then(function (results) {
                    console.log("FOUND: " + JSON.stringify(results))
                    res.status(200).json(results)
                })
                .catch(function (err) {
                    console.error("ERROR OCCURED: " + err)
                    res.status(500).send("An Internal Error Has Occured")
                })
        })
});

// update job posting
router.put('/:postId', function (req, res) {
    // get the id from the url
    var id = req.params.postId
    var contents = req.body

    // go to the database and update it
    database.update(JOB_POSTING_COLLECTION, id, { $set: contents })
        .then(function (result) {
            res.sendStatus(204)
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(500).send("An Internal Error Has Occured")
        });
});

// delete job posting
router.delete('/:postId', function (req, res) {
    var id = req.params.postId

    // go to the database and delete it
    database.delete(JOB_POSTING_COLLECTION, id)
        .then(function (result) {
            res.sendStatus(204)
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(500).send("An Internal Error Has Occured")
        });
});

router.put('/apply/:postId', function(req, res) {
    var postId = req.params.postId
    var userId = req.query.userId
    var contents = {applicants: userId}

    database.update(JOB_POSTING_COLLECTION, postId, { $push: contents })
        .then(function (result) {
            res.sendStatus(204)
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(500).send("An Internal Error Has Occured")
        });
})

//TODO: see the list of candidates

// Export router
module.exports = router