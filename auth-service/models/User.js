const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    firstName: String,
    lastName: String,
    biography: String,
    profileUrl: String
});

module.exports = model('User', userSchema);