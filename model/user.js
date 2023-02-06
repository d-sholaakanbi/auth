// email- string, unique, required,validate
// password- string, unique, minlength
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require("validator");

const userAuth = new Schema({
    email: {
        type: String,
        unique: [true, 'This email has been registered'],
        required: [true, 'Please provide your email address'],
        validate: [isEmail, 'please enter a valid email']
    },

    password: {
        type: String,
        required: [true,'Please enter your password'],
        minlenght: [10, 'the minimum length of your password is 10']
    }
}, { timestamps: true}
)

module.exports = mongoose.model("user", userAuth);