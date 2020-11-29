const { introspectSchema } = require('apollo-server');
const { model, Schema } = require('mongoose');

const jobPostSchema = new Schema({
    username: String,
    createdAt: String,
    company: String,
    body: String,
    salary: String,
    title: String,
    location: String,
    applicants:[{
        username: String,
        user:{
            type: Schema.Types.ObjectId,
            ref:'users'
        },
        resume: String,
        submittedAt: String
    }],
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    }
});

module.exports = model('JobPost', jobPostSchema);