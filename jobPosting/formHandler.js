const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(express.static(__dirname));

app.get('/',(req, res) =>{
    //res.sendFile(path.join(__dirname,'createPostPage.html'));
    res.sendFile(path.join(__dirname,'logIn.html'));
});

app.post('/',(req,res) => {
    res.sendFile(path.join(__dirname,'PostTablePage.html'));

});

app.listen(PORT, () => console.log(`Listening on port ${PORT} ` ));


