const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database');
const { render } = require('ejs');
//console.log(db.findOne('job_posting',{}));
const app = express();
const PORT = 5000;

db.findOne('jobposts',{createdAt: '2020-12-01T08:18:52.115Z'}).then((results)=>{console.log(results)})
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
    res.redirect('/createPost')
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
    const temp = [
        {title: 'Google full stack developer',type:'Internship' ,description: 'This job is for new graduates'},
        {title: 'Amazon full stack developer',type:'Internship' ,description: 'This job is for new graduates'},
        {title: 'Microsoft full stack developer',type:'Internship' ,description: 'This job is for new graduates'},
        {title: 'Facebook full stack developer',type:'Internship' ,description: 'This job is for new graduates'},
        {title: 'Instagram full stack developer',type:'Internship' ,description: 'This job is for new graduates'},
        {title: 'whatsApp full stack developer',type:'Internship' ,description: 'This job is for new graduates'},
        {title: 'nvidia game developer',type:'Internship' ,description: 'This job is for new graduates'},
    ];
    const posts = db.getAll('jobposts');
   //posts.forEach(post => console.log(post));
    //res.render('displayUserPosts', {posts});
    posts.then( (results) => res.render('displayUserPosts', {results}) )
    .catch((err)=>console.log(err));
})

app.get('/displayPostList/:postId', (req,res)=>{
    const id = req.params.postId;
    const contents = {
        title:id

    }
    console.log(id);
    db.findOne('jobposts',contents).then((results)=>{
            res.render('details', {post : results});
        }).catch(err=>{
            console.log(err);
        })
})

app.post('/displayPostList', (req,res)=>{
    // User inputs
    const jobTitle = req.body.job_title,
          jobType  = req.body.jobType,
          jobDesc  = req.body.job_description;

    const contents = {
        body: jobDesc,
    };

})
app.listen(PORT, () => console.log(`Listening on port ${PORT} ` ));


