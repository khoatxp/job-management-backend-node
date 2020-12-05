'use strict'

require('better-logging')(console)
const express = require('express')
var cors = require('cors')

// Create the server
const server = express()

server.use(express.json()) 
server.use(cors())

// Routes
server.use('/messaging/', [
    require('./routes/messaging')
])

// Start the server
const port = process.env.PORT || 8088;
server.listen(port, error => {
    if (error) {
        console.error(error)
    } else {
        console.log('Started at http://localhost:8088')
    }
})
