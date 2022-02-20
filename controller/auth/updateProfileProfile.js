const fs = require("fs");
const sharp = require("sharp");
const CompletedUser = require("../../model/auth/CompletedUser");
const User = require("../../model/auth/User");
const { getPath } = require("../../utils/getPath");

exports.updateProfileProfile = async (req, res) => {
  try {
    if (!req.files?.avatar && !req.body.avatar)
      return res.status(400).json({
        errors: ["عکس پروفایل را فراموش کردید !"],
      });
    if (!req.files?.resume && !req.body.resume)
      return res.status(400).json({
        errors: ["عکس رزومه را فراموش کردید !"],
      });

    let avatar = req.files?.avatar;
    let resume = req.files?.resume;

    console.log(avatar);

    const checkImage = (image) =>
      image?.mimetype === "image/jpeg" ||
      image?.mimetype === "image/png" ||
      image?.mimetype === "image/jpg";
    if (avatar) {
      if (checkImage(avatar)) {
        await sharp(avatar.data)
          .jpeg({ quality: 60 })
          .toFile(getPath(`public/uploads/${avatar.md5 + avatar.name}.jpg`))
          .catch((err) => console.log(err));
        // avatar?.mv(
        //   getPath(`public/uploads/${avatar.md5 + avatar.name}.jpg`),
        //   (err) => {
        //     console.log(err);
        //   }
        // );
      } else {
        return res.status(400).json({
          errors: ["عکس با فرمت png یا jpg  آپلود شود !"],
        });
      }
    }

    if (resume) {
      if (checkImage(resume)) {
        await sharp(resume.data)
          .jpeg({ quality: 60 })
          .toFile(getPath(`public/uploads/${resume.md5 + resume.name}`))
          .catch((err) => console.log(err));
        // resume?.mv(
        //   getPath(`public/uploads/${resume.md5 + resume.name}`),
        //   (err) => {
        //     console.log(err);
        //   }
        // );
      } else {
        return res.status(400).json({
          errors: ["رزومه با فرمت png یا jpg  آپلود شود !"],
        });
      }
    }

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
      avatar: avatar
        ? avatar.md5 + avatar.name + ".jpg"
        : req.body.avatar || "",
      resume: resume
        ? resume.md5 + resume.name + ".jpg"
        : req.body.resume || "",
    });

    let user = await User.findById(userID);

    if (!user)
      return res.status(404).json({
        errors: "کاربر پیدا نشد !",
      });

    let completedUser = await CompletedUser.find({
      userID: user._id,
    });

    console.log(completedUser);

    if (!completedUser)
      return res.status(404).json({
        errors: "پروفایل پیدا نشد !",
      });

    res.setHeader("Content-Type", "application/json");

    if (avatar) {
      fs.unlink(
        getPath(`/public/uploads/${completedUser[0].avatar}`),
        async (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    if (resume) {
      fs.unlink(
        getPath(`/public/uploads/${completedUser[0].resume}`),
        async (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    await CompletedUser.findOneAndUpdate(
      {
        userID: user._id,
      },
      {
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
        avatar: avatar
          ? avatar.md5 + avatar.name + ".jpg"
          : req.body.avatar || "",
        resume: resume ? resume.md5 + resume.name : req.body.resume || "",
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
