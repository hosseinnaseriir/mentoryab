const mongoose = require("mongoose");
const {
    completeUserYupSchema
} = require("./validation/completedUserValidation");

const userSchema = new mongoose.Schema({
    userID: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    expertise: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    job: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    workExperience: {
        type: Number,
        required: true,
    },
    resume: {
        type: Boolean,
    },
    province: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    socialMedia: {
        any: [{}]
    },
    birthday: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});


userSchema.statics.completeUserValidation = function (body) {
    return completeUserYupSchema.validate(body, {
        abortEarly: true
    })
}

const CompletedUser = mongoose.model('CompletedUser', userSchema);

module.exports = CompletedUser;


// {
//     "userID": "61ca322feadc3b2b5535d3ab",
//     "expertise": "expertise",
//     "job": "job",
//     "company": "company",
//     "workExperience": "workExperience",
//     "resume": "true",
//     "province": "province",
//     "city": "city",
//     "address": "address",
//     "birthday": "birthday",
//     "socialMedia": "[{}]",
//     "bithday": "bithday",
//     "phoneNumber": "bithday"
// }