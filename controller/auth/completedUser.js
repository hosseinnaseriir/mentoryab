const CompletedUser = require("../../model/auth/CompletedUser");
const User = require("../../model/auth/User");
const { getPath } = require("../../utils/getPath");

exports.completedUserController = async (req, res, next) => {
  try {

    let avatar = req.files?.avatar;
    let resume = req.file?.resume;

    const {
      userID,
      expertise,
      specialty,
      company,
      workExperience,
      province,
      city,
      address,
      birthDay,
      socialMedia,
      phoneNumber,
      personPosition,
    } = req.body;

    console.log(
      {
        ...req.body,
        avatar,
        resume,
      },
      "(req.body here"
    );
    let x = await CompletedUser.completeUserValidation({
      ...req.body,
      avatar: avatar ? avatar.md5 + ".jpg" : '',
      resume: resume ? resume.md5 + ".jpg" : '',
    });
    console.log(
      x,
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    );

    let user = await User.findById(userID);

    if (!user)
      return res.status(404).json({
        errors: "کاربر پیدا نشد !",
      });

    let isCreated = await CompletedUser.find({
      userID: user._id,
    });

    res.setHeader("Content-Type", "application/json");
    if (isCreated.length)
      return res.status(404).json({
        errors: ["پروفایل شما تکمیل شده ، لطفا نسبت به ویرایش آن اقدام کنید !"],
      });

    avatar?.mv(getPath(`public/uploads/${avatar.md5}.jpg`), (err) => {
      console.log(err);
    });
    resume?.mv(getPath(`public/uploads/${resume.md5}.jpg`), (err) => {
      console.log(err);
    });

    await CompletedUser.create({
      userID,
      expertise,
      specialty,
      company,
      workExperience,
      personPosition,
      province,
      city,
      address,
      birthDay,
      socialMedia,
      phoneNumber,
      avatar: avatar ? avatar.md5 + ".jpg" : null,
      resume: resume ? resume.md5 + ".jpg" : null,
    });

    return res.status(201).json({
      message: `${user.fullName} عزیز ،  پروفایل شما با موفقیت ثبت شد !`,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      errors: err.errors || err,
    });
  }
};
