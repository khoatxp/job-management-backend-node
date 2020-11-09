const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const mongoose=require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')
const {MONGODB} = require ('./config.js');

const app = express();

app.use(cors({
	origin: true,
	credentials: true,
}));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

server.applyMiddleware({
	app,
	path: '/',
	cors: false,
});

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


