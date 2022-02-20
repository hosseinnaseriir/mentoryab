const User = require("../../model/auth/User");
const bcrypt = require("bcryptjs");
const { nodeMailer } = require("../../utils/nodeMailer");

exports.registerUserController = async (req, res) => {
  const { fullName, email, password, confirmPassword, iWantBeMentor } =
    req.body;

  try {
    await User.registerValidation(req.body);

    let user = await User.findOne({
      email,
    });

    res.setHeader("Content-Type", "application/json");

    if (user)
      return res.status(400).json({
        errors: ["کاربری با این ایمیل قبلا ثبت شده است !"],
      });

    let hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      iWantBeMentor,
    });

    nodeMailer(
      email,
      `${fullName} به منتوریاب خوش اومدی `,
      `<b>برای تکمیل ثبت نام لطفا روی دکه زیر کلیک کن </b>
        <hr/>
        <button>تکمیل</button>
        `
    );
    let simpleUserWellcomeMessage = `${fullName} عزیز ، شما با موفقیت ثبت نام شدید !`;
    let mentorUserWellcomeMessage = `${fullName} عزیز ، شما با موفقیت ثبت نام شدید ، لطفاََ فرایند ثبت نام خود را تکمیل کنید`;
    return res.status(201).json({
      message: iWantBeMentor
        ? mentorUserWellcomeMessage
        : simpleUserWellcomeMessage,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errors: err.errors || err,
    });
  }
};
