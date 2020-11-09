const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const mongoose=require('mongoose');
const cors = require('cors');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')
const {MONGODB} = require ('./config.js');

const app = express();
var corsOptions = {
    origin: "https://jobmanagementsystem.uc.r.appspot.com",
    credentials: true 
  };

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});
app.use(cors(corsOptions));
server.applyMiddleware({
    app,
    path: '/',
    cors: false, 
  })

mongoose
    .connect(MONGODB, {useUnifiedTopology: true,useNewUrlParser: true})
    .then(()=>{
        console.log('MongoDB Connected');
    }).catch(err => {
        console.log("DB Connection Error: ${err.message}");
        });
const port = process.env.PORT || 8080;


app.listen(port, error => {
    if (error) {
        console.error(error)
    } else {
        console.log('Started at http://localhost:8080')
    }
})


