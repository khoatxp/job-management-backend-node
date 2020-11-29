const { gql } = require('apollo-server');

module.exports = gql `
  type Applicant{
    username: String!
    resume: String!
    submittedAt: String!
  }
  type JobPost{
    id: ID!
    body: String!
    company: String!
    salary: String!
    title: String!
    location: String!
    username: String!
    createdAt: String!
    applicants: [Applicant]
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
    getJobPosts: [JobPost],
    getJobPostsBy(username: String!): [JobPost],
    getJobPost(postId: ID!): JobPost
  }
  type Mutation{
      register(registerInput: RegisterInput): User!
      login(username: String!, password: String!): User!
      createJobPost(body: String!, company: String!, salary: String!, title:String!, location:String!): JobPost!
      deleteJobPost(postId: ID!): String!
      addApplicant(postId:ID!, resume: String!): String!
  }
`;