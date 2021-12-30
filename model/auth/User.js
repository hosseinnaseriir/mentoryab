const mongoose = require("mongoose");

const {
    userYupSchema
} = require("./validation/userValidation");

const userSchema = new mongoose.Schema({
    // _id: String,
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    },
    iWantBeMentor: {
        type: Boolean,
    },
    iWantBeTeacher: {
        type: Boolean,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

// Sample
// {
//     "fullName": "54",
//     "email": "",
//     "password": "1322",
//     "confirmPassword": "1322",
//     "iWantBeMentor": "true",
//     "iWantBeTeacher": "false"
// }

userSchema.statics.registerValidation = function (body) {
    return userYupSchema.validate(body, {
        abortEarly: true
    })
}

const User = mongoose.model('User', userSchema);

module.exports = User;