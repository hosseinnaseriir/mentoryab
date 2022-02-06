const mongoose = require("mongoose");
const {
  completeUserYupSchema,
} = require("./validation/completedUserValidation");

const userSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  specialty: {
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
  personPosition: {
    type: String,
    required: true,
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
    type: [mongoose.Schema.Types.Mixed],
  },
  birthDay: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
  },
  resume: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.completeUserValidation = function (body) {
  return completeUserYupSchema.validate(body, {
    abortEarly: false,
  });
};

const CompletedUser = mongoose.model("CompletedUser", userSchema);

module.exports = CompletedUser;

// {
//     "userID": "61ca322feadc3b2b5535d3ab",
//     "expertise": "expertise",
//     "specialty": "specialty",
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
