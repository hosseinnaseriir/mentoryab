const CompletedUser = require("../../model/auth/CompletedUser");
const User = require("../../model/auth/User");
const { getPath } = require("../../utils/getPath");

exports.completedUserController = async (req, res, next) => {
  try {
    if (!req.files?.avatar)
      return res.status(404).json({
        errors: ["عکس پروفایل را فراموش کردید !"],
      });
    if (!req.files?.resume)
      return res.status(404).json({
        errors: ["عکس رزومه را فراموش کردید !"],
      });

    let avatar = req.files?.avatar;
    let resume = req.files?.resume;

    const {
      userID,
      expertise,
      specialty,
      tool,
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
      avatar: avatar ? avatar.md5 + ".jpg" : "",
      resume: resume ? resume.md5 + ".jpg" : "",
    });

    const checkImage = (data) =>
      data?.mimetype === "image/jpeg" ||
      data?.mimetype === "image/png" ||
      data?.mimetype === "image/jpg";

    if (checkImage(avatar)) {
      avatar?.mv(
        getPath(
          `public/uploads/${avatar?.name}.jpg`
        ),
        (err) => {
          console.log(err);
        }
      );
    } else {
      return res.status(404).json({
        errors: ["عکس با فرمت png یا jpg  آپلود شود !"],
      });
    }

    if (checkImage(resume)) {
      resume?.mv(getPath(`public/uploads/${resume.name}`), (err) => {
        console.log(err);
      });
    } else {
      return res.status(404).json({
        errors: ["رزومه با فرمت png یا jpg  آپلود شود !"],
      });
    }

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

    await CompletedUser.create({
      userID,
      expertise,
      specialty,
      tool,
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
      resume: resume ? resume.name : null,
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
