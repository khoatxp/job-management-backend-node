'use strict'

const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const multiparty = require("multiparty");
var app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'ejs');

app.get('/resumeservice', (req, res) => {
    res.render("index")
})

app.post('/parse',(req, res) =>{
    var form = new multiparty.Form();
    form.parse(req, (err,fields,files)=>{
        if(err){
          res.end(err);
        }
        res.json(files.resume[0]);
        /*
        request.post({
            url:'https://jobs.lever.co/parseResume',
            json: {
                resume:files.resume[0]
            },
            headers: {
                'Content-Type': 'application/json'
            }},
            function(error, response, body){
                console.log(body);
                res.json(response);
        });
        */

        
    });

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
