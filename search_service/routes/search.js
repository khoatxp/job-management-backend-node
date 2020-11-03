'use strict'

const express = require('express')
const FlexSearch = require("flexsearch")
const uuid = require("uuid")

var index = new FlexSearch("match")
var map = new Map()

// Create express router
const router = express.Router()

// add posting
router.post('/jobPosting', function (req, res) {
    var id = uuid.v4()

    console.info(`Adding Job Posting(${id}): ${JSON.stringify(req.body)}`)
    index.add(id, req.body.company + " " + req.body.name + " " + req.body.description)
    map.set(id, req.body)

    res.json({ body: req.body, id: id })
});

router.get('/jobPosting', function (req, res) {
    var query_limit = (req.query.queryLimit) ? req.query.queryLimit : 10;
    var index_results = index.search(req.query.searchQuery, query_limit)

    console.info(`Get Job Posting Query Params: ${JSON.stringify(req.query)}`)

    var results = []
    for(var i = 0; i < index_results.length; i++) {
        results.push(map.get(index_results[i]))
    }

    res.json({ result: results })
});

// Export router
module.exports = router
