'use strict'

const express = require('express')

// Create the server
const server = express()

// Routes
server.use('/', [
    require('./routes/products')
])

// Start the server
const port = process.env.PORT || 8080;
server.listen(port, error => {
    if (error) {
        console.error(error)
    } else {
        console.log('Started at http://localhost:7000')
    }
})
