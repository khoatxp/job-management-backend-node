

const express = require('express')

// Create express router
const router = express.Router()



// GET /products
router.get('/', (req, res) => {
    res.render("../index.html")
})

// Export router
module.exports = router
