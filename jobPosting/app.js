const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database');
const { render } = require('ejs');
const { title } = require('process');
//console.log(db.findOne('job_posting',{}));
const app = express();
const PORT = 5000;


//db.findOne('jobposts',{createdAt: '2020-12-01T08:18:52.115Z'}).then((results)=>{console.log(results)})
//db.getAll('users').then( (results)=> console.log(` ${results}`) );
//Setting view engine
app.set('view engine', 'ejs');

app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));

app.get('/',(req, res) =>{
    //res.sendFile(path.join(__dirname,'createPostPage.html'));
    //res.sendFile(path.join(__dirname,'logIn.html'));
    res.render('welcomePage');
});

app.post('/',(req,res) => {
    //res.sendFile(path.join(__dirname,'PostTablePage.html'));
    console.log(req.body);
    // 
    res.redirect('/createPost');
});

// Get the page that allows the user to create a post
app.get('/createPost',(req,res)=>{
    //res.render('createPostPage');
    res.redirect('/displayPostList');
})

app.get('/displayForm',(req,res)=>{
    res.render('jobForm');
})


app.get('/displayPostList', (req,res)=>{
    
    const posts = db.getAll('jobposts');
   //posts.forEach(post => console.log(post));
    //res.render('displayUserPosts', {posts});
    posts.then( (results) => res.render('displayUserPosts', {results}) )
    .catch((err)=>console.log(err));
})

app.get('/displayPostList/:postId', (req,res)=>{
    const id = req.params.postId;
    //console.log(id);
    db.findById('jobposts',id).then((results)=>{
            res.render('details', {post : results});
        }).catch(err=>{
            console.log(err);
        })
})

app.delete('/displayPostList/:postId', (req,res)=>{
    const id = req.params.postId; // using this instead causes some error saying it must be a single string
    console.log('Processing DELETE REQUEST'); 

    db.delete('jobposts',parseInt(id))
    .then(result => {
        res.send({redirect:"/displayPostList"})
    })
    .catch(err => {
        console.log(err)});
})

app.post('/displayPostList', (req,res)=>{
    // User inputs
    const jobTitle = req.body.job_title,
          jobType  = req.body.jobType,
          jobDesc  = req.body.job_description;

          //test data
    const contents = {
        user:"5fa79deb7f941208b97a0b4d",
        username:"khoatxp",
        title:jobTitle,
        body: jobDesc,
        company: "Test"
    };
    //---------Insert a the new post to the database
    db.insertRecord('jobposts', contents);
    //db.findOne('jobposts',{title: "Test"}).then(result=>console.log(result));
    res.redirect('/displayPostList');


})


app.get('/displayPostList/editPost/:id', (req,res) => {
    const id = req.params.id;
    db.findById('jobposts',id).then(result => {
        res.render('editPost', {result});
    })
})
app.post('/displayPostList/editPost/:id', (req,res) => {
    const contents = {
        title : req.body.job_title,
        body : req.body.job_desc,
        company: req.body.company
    };
    db.update('jobposts',req.params.id,contents).then(result => {
        res.redirect('/displayPostList');
    })
})
app.listen(PORT, () => console.log(`Listening on port ${PORT} ` ));


