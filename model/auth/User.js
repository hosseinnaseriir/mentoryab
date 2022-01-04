const mongoose = require("mongoose");

const {
    userYupSchema
} = require("./validation/userValidation");

const userSchema = new mongoose.Schema({
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
        default:false
    },
    iWantBeTeacher: {
        type: Boolean,
        default:false
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
        abortEarly: false
    })
}
const User = mongoose.model('User', userSchema);

module.exports = User;