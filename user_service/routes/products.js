'use strict'

const express = require('express')

// Create express router
const router = express.Router()

// GET /products
router.get('/', (req, res) => {
    res.json('User Service HELLO')
})

// http://localhost:8083/user/1
router.get('/user/:userId', (req, res) => {
    res.json('User ID PASSED: ' + req.params.userId)
})

// Export router
module.exports = router
