const jobPostsResolvers = require('./jobposts');
const usersResolvers = require('./users');

module.exports = {
    Query:{
        ...usersResolvers.Query,
        ...jobPostsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...jobPostsResolvers.Mutation
    }
}