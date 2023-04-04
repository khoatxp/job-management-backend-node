const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config.js');


const server = new ApolloServer({
    cors: {
        origin: true,
        credentials: true,
    },
    typeDefs,
    resolvers,
    context: ({req}) => ({req}),
    playground: {
        endpoint: "/graphql"
    }
});

mongoose
    .connect(MONGODB, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB Connected');
    }).catch(err => {
    console.log("DB Connection Error: ${err.message}");
});
const port = process.env.PORT || 8080;


server.listen(port, error => {
    if (error) {
        console.error(error)
    } else {
        console.log('Started at http://localhost:8080')
    }
})


