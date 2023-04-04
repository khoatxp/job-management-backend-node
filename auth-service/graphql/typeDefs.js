const {gql} = require('apollo-server');

module.exports = gql`
    type Applicant{
        username: String!
        resume: String!
        submittedAt: String!
        originalFile: String
    }

    type Profile {
        firstName: String!
        lastName: String!
        biography: String!
        profileUrl: String
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
        firstName: String,
        lastName: String,
        biography: String,
        profileUrl: String
    }
    input RegisterInput{
        firstName: String!,
        lastName: String!,
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        searchJobPosts(search: String): [JobPost],
        getJobPosts: [JobPost],
        getJobPostsBy(username: String!): [JobPost],
        getJobPost(postId: ID!): JobPost,
        getProfile(userId: ID!): Profile
    }
    type Mutation{
        register(registerInput: RegisterInput!): User!
        login(username: String!, password: String!): User!
        createJobPost(body: String!, company: String!, salary: String!, title:String!, location:String!): JobPost!
        deleteJobPost(postId: ID!): String!
        changeProfileUrl(userId: ID!, profileUrl: String!): User
        addApplicant(postId:ID!, resume: String!, originalFile: String!): String!
    }
`;