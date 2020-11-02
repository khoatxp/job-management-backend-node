'use strict'

const express = require('express')

// Create express router
const router = express.Router()

// GET /products
router.get('/', (req, res) => {
    res.json('Resume Service Hello')
})

// Export router
module.exports = router
