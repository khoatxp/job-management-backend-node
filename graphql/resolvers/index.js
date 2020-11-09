const jobPostsResolvers = require('./jobposts');
const usersResolvers = require('./users');

module.exports = {
    Query:{
        ...jobPostsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...jobPostsResolvers.Mutation
    }
}