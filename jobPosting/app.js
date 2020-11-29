const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

//Setting view engine
app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.get('/',(req, res) =>{
    //res.sendFile(path.join(__dirname,'createPostPage.html'));
    res.sendFile(path.join(__dirname,'logIn.html'));
});

app.post('/',(req,res) => {
    res.sendFile(path.join(__dirname,'PostTablePage.html'));

});

// Get the page that allows the user to create a post
app.get('/createPost',(req,res)=>{
    res.render('createPostPage');
})

app.get('/displayForm',(req,res)=>{
    res.render('jobForm');
})

app.get('/displayPostList', (req,res)=>{
    const posts = [
        {title: 'Google full stack developer',type:'Internship' ,description: 'This job is for new graduates'},
        {title: 'Amazon full stack developer',type:'Internship' ,description: 'This job is for new graduates'},
        {title: 'Microsoft full stack developer',type:'Internship' ,description: 'This job is for new graduates'},
        {title: 'Facebook full stack developer',type:'Internship' ,description: 'This job is for new graduates'},
        {title: 'Instagram full stack developer',type:'Internship' ,description: 'This job is for new graduates'},
        {title: 'whatsApp full stack developer',type:'Internship' ,description: 'This job is for new graduates'},
        {title: 'nvidia game developer',type:'Internship' ,description: 'This job is for new graduates'},
    ];
    res.render('displayUserPosts', {posts});
})
app.listen(PORT, () => console.log(`Listening on port ${PORT} ` ));


