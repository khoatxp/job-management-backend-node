const mongoose = require('mongoose');
const schema = mongoose.Schema;

const recruiterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;