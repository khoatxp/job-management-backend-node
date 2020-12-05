'use strict'

const express = require('express')

// Create express router
const router = express.Router()

// GET /products
router.get('/', (req, res) => {
    res.json('message service hello')
})

// Export router
module.exports = router
