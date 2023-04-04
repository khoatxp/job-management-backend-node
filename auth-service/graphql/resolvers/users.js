const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {
    validateRegisterInput,
    validateLoginInput
} = require('../../util/validators');
const {SECRET_KEY} = require('../../config');
const User = require('../../models/User');
const default_profile_pic_url = "https://storage.googleapis.com/cmpt470profilepics/default_profile_pic.jpeg"

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        SECRET_KEY,
        {expiresIn: '1h'}
    );
}

module.exports = {
    Query: {
        async getProfile(_, {userId}, context) {
            try {
                // Find user by ID
                const user = await User.findById(userId);

                // Return user profile data
                return {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    biography: user.biography,
                    profileUrl: user.profileUrl || default_profile_pic_url
                };
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async changeProfileUrl(_, {userId, profileUrl}, context) {
            try {
                const user = await User.findByIdAndUpdate(
                    userId,
                    {profileUrl: profileUrl},
                    {new: true}
                );

                // Return updated user profile data
                return {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    biography: user.biography,
                    profileUrl: user.profileUrl
                };
            } catch (err) {
                throw new Error(err);
            }
        },
        async login(_, {username, password}) {
            const {errors, valid} = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Errors', {errors});
            }

            const user = await User.findOne({username});

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors});
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong crendetials', {errors});
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(
            _,
            {
                registerInput: {username, email, password, confirmPassword, firstName, lastName, biography}
            }
        ) {
            // Validate user data
            const {valid, errors} = validateRegisterInput(
                username,
                email,
                password,
                confirmPassword
            );
            if (!valid) {
                throw new UserInputError('Errors', {errors});
            }
            const user = await User.findOne({username});
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);
            biography = biography || "";

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString(),
                firstName,
                lastName,
                biography,
                default_profile_pic_url
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };
        }
    }
};