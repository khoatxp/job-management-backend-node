const { gql } = require('apollo-server');

module.exports = gql `
  type JobPost{
    id: ID!
    body: String!
    company: String!
    salary: String!
    title: String!
    location: String!
    username: String!
    createdAt: String!
  }
  type User{
      id: ID!
      email: String!
      token: String!
      username: String!
      createdAt: String!
  }
  input RegisterInput{
      username: String!
      password: String!
      confirmPassword: String!
      email: String!
  }
  type Query {
    getJobPosts: [JobPost]
    getJobPost(postId: ID!): JobPost
  }
  type Mutation{
      register(registerInput: RegisterInput): User!
      login(username: String!, password: String!): User!
      createJobPost(body: String!, company: String!, salary: String!, title:String!, location:String!): JobPost!
      deleteJobPost(postId: ID!): String!
  }
`;