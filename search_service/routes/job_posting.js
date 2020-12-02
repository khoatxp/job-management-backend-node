'use strict'

const express = require('express')
const database = require("../utilities/database")
const search_index = require("../utilities/search_index")
const pagination = require("../utilities/pagination")

// Create express router
const router = express.Router()
const JOB_POSTING_COLLECTION = "jobposts"

// get job postings
router.get('/', function (req, res) {
    var query_limit = (req.query.queryLimit) ? parseInt(req.query.queryLimit) : 10;
    var query = (req.query.query) ? req.query.query : null;
    var page = (req.query.page) ? parseInt(req.query.page) : 1;

    database.getAll(JOB_POSTING_COLLECTION)
        .then(function (posts) {
            // if there is no query, returning all job posting
            if (query == null) {
                var start = (page - 1) * query_limit
                var end = start + query_limit

                var paginated = posts.slice(start, end)
                var json_response = pagination.build_response(posts, paginated, page, query_limit)
                res.status(200).json(json_response)
            } else {
                // build the index for searching
                var start = (page - 1) * query_limit
                var end = start + query_limit
                var index = search_index.build_index(posts)
                var index_results = search_index.get_index(index, query)
                var paginated = index_results.slice(start, end)

                // push all the promises in an array
                const promises = []
                paginated.forEach(id => {
                    promises.push(database.findOne(JOB_POSTING_COLLECTION, id))
                })

                // return the results of all the promises (the job posting in database)
                Promise.all(promises)
                    .then(function (results) {
                        var json_response = pagination.build_response(index_results, results, page, query_limit, query)
                        res.status(200).json(json_response)
                    })
                    .catch(function (err) {
                        console.error("ERROR OCCURED: " + err)
                        res.status(500).send("An Internal Error Has Occured")
                    })
            }
        })
})

router.get('/:postId', function (req, res) {
    var id = req.params.postId

    database.findById(JOB_POSTING_COLLECTION, id)
        .then(function (post) {
            res.status(200).json(post)
        })
        .catch(function (err) {
            console.error("ERROR OCCURED: " + err)
            res.status(500).send("An Internal Error Has Occured")
        })
})

// Export router
module.exports = router