'use strict'

const express = require('express')
const search_index = require("./../utilities/search_index")

// Create express router
const router = express.Router()

// add posting
router.post('/jobPosting', function (req, res) {
    var posting_id = req.body.id

    console.info(`Adding Job Posting(${posting_id}): ${JSON.stringify(req.body)}`)

    if(posting_id == null) {
        var error = { code: 400, message: "ID is not in the body" }

        console.error(`Error (Adding Job Posting(${posting_id})): ${JSON.stringify(error)}`)
        return res.status(400).send({ error: error });
    } else if(search_index.contains_id(posting_id)) {
        var error = { code: 400, message: "ID is used" }

        console.error(`Error (Adding Job Posting(${posting_id})): ${JSON.stringify(error)}`)
        return res.status(400).send({ error: error });
    }

    search_index.add_index(req.body)

    res.sendStatus(204)
});

// get job posting 
router.get('/jobPosting', function (req, res) {
    var query_limit = (req.query.queryLimit) ? req.query.queryLimit : 10;

    console.info(`Get Job Posting Query Params: ${JSON.stringify(req.query)}`)
    var data = search_index.get_index(req.query.searchQuery, query_limit)

    res.json({ data: data })
});

// update job posting
router.put('/jobPosting/:postingId', function (req, res) {
    var posting_id = req.params.postingId
    var new_posting = req.body

    console.info(`Updating Job Posting(${posting_id}): ${JSON.stringify(new_posting)}`)

    if(!search_index.contains_id(posting_id)) {
        var error = { code: 400, message: "ID doesn't exists in index " }

        console.error(`Error (Updating Job Posting(${posting_id})): ${JSON.stringify(error)}`)
        return res.status(400).send({ error: error });
    }

    search_index.update_index(posting_id, new_posting)

    res.sendStatus(204)
});

// delete job posting
router.delete('/jobPosting/:postingId', function (req, res) {
    var posting_id = req.params.postingId

    console.info(`Deleting Job Posting(${posting_id})`)

    if(!search_index.contains_id(posting_id)) {
        var error = { code: 400, message: "ID doesn't exists in index " }

        console.error(`Error (Deleting Job Posting(${posting_id})): ${JSON.stringify(error)}`)
        return res.status(400).send({ error: error });
    }

    search_index.delete_index(posting_id)

    res.sendStatus(204)
});

// Export router
module.exports = router
