'use strict'

const express = require('express')
const FlexSearch = require("flexsearch");

// Create express router
const router = express.Router()

// GET /products
router.get('/', (req, res) => {
    res.json('Search Service HELLO')
})

// http://localhost:8084/user/1
router.get('/user/:userId', (req, res) => {
    res.json('User ID PASSED: ' + req.params.userId)
})

// add posting
router.post('/jobPosting', function(req, res) {
    res.json({requestBody: req.body})
    // res.json("DID JOB POSINTG")
});

// Export router
module.exports = router
