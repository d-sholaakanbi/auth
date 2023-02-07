// email- string, unique, required,validate
// password- string, unique, minlength
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require("validator");
const bcrypt = require('bcrypt');

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
        minlength: [10, 'the minimum length of your password is 10']
    }
}, { timestamps: true}
);

//mongoose hooks 
// function that protect user info before we save 
userAuth.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

module.exports = mongoose.model("user", userAuth);