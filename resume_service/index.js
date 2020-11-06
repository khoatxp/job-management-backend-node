'use strict'
//Dependency
const express = require('express')
const bodyParser = require('body-parser');
const multiparty = require("multiparty");
const cors = require("cors");
var fs = require("fs");
const request = require("request");
var app = express();

//Middleware
//app.options('*', cors()) ;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:false,limit: '50mb'}));
//app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
    next();
  });


app.set('view engine', 'ejs');

/**
 * This page is to test output by choosing a resume and inspect response object
 */
app.get('/resumeservice',(req, res) => {
    res.render("index")
})

/**
 * Parse the resume by file sent from client
 * Then call the API and return result to client
 */
app.post('/parseByFile',(req, res) =>{
    var form = new multiparty.Form();
    form.parse(req, (err,fields,files)=>{
        if(err){
          res.end(err);
        }
        var contents = fs.readFileSync(files.resume[0].path).toString('base64');
        request.post({
            url:'https://g5wkkduchj.execute-api.us-east-2.amazonaws.com/Prod',
            
            headers: {
                'Content-Type': 'application/json',
            },
            
            json: true,
            body: {
                content: contents
            }
        },
            function(error, response, body){
                res.send(body);
        })
        
    });

})

/**
 * Parse the resume by the base64 encoding from client
 * Then call the API and return result to client
 */
app.post('/parseResume',(req, res) =>{
    request.post({
        url:'https://g5wkkduchj.execute-api.us-east-2.amazonaws.com/Prod',
        
        headers: {
            'Content-Type': 'application/json',
        },
        
        json: true,
        body: {
            content: req.body.content
        }
    },
        function(error, response, body){
            console.log(body);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(body);
    })
})

    
   

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, error => {
    if (error) {
        console.error(error)
    } else {
        console.log('Started at http://localhost:8080')
    }
})
