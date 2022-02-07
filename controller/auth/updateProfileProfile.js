const CompletedUser = require("../../model/auth/CompletedUser");
const User = require("../../model/auth/User");
const { getPath } = require("../../utils/getPath");

exports.updateProfileProfile = async (req, res) => {
  try {
    if (!req.files?.avatar && !req.body.avatar)
      return res.status(404).json({
        errors: ["عکس پروفایل را فراموش کردید !"],
      });
    if (!req.files?.resume && !req.body.resume)
      return res.status(404).json({
        errors: ["عکس رزومه را فراموش کردید !"],
      });

    let avatar = req.files?.avatar;
    let resume = req.files?.resume;

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

    await CompletedUser.completeUserValidation({
      ...req.body,
      avatar: avatar ? avatar.md5 + ".jpg" : req.body.avatar || "",
      resume: resume ? resume.md5 + ".jpg" : req.body.resume || "",
    });

    let user = await User.findById(userID);

    if (!user)
      return res.status(404).json({
        errors: "کاربر پیدا نشد !",
      });

    let completedUser = await CompletedUser.find({
      userID: user._id,
    });

    if (!completedUser)
      return res.status(404).json({
        errors: "پروفایل پیدا نشد !",
      });

    res.setHeader("Content-Type", "application/json");

    avatar?.mv(getPath(`public/uploads/${avatar.md5}.jpg`), (err) => {
      console.log(err);
    });
    resume?.mv(getPath(`public/uploads/${resume.md5}.jpg`), (err) => {
      console.log(err);
    });

    await CompletedUser.findOneAndUpdate(
      {
        userID: user._id,
      },
      {
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
        avatar: avatar ? avatar.md5 + ".jpg" : req.body.avatar || "",
        resume: resume ? resume.md5 + ".jpg" : req.body.resume || "",
      }
    );

    return res.status(200).json({
      message: `${user.fullName} عزیز ،  پروفایل شما با موفقیت آپدیت شد !`,
    });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      errors: err.errors || err,
    });
  }
};
