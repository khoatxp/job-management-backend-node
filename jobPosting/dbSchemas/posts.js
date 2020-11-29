const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type:{
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Applicant = mongoose.model('Applicant', applicantSchema);

module.exports = Applicant;