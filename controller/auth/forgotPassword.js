const JWT = require("jsonwebtoken");
const User = require("../../model/auth/User");
const { nodeMailer } = require("../../utils/nodeMailer");

exports.handleForgotPassword = async (req, res) => {
  const email  = (req.body.email).toLowerCase();
  let user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({
      errors: ["کاربری با این ایمیل  پیدا نشد !"],
    });

  console.log(user);

  const token = JWT.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });

  console.log(token);
  nodeMailer(
    email,
    "بازیابی رمز عبور حساب منتوریاب",
    `
    <div style="color:#313131;text-align:center;">
    <h4>برای بازیابی رمز عبور روی لینک زیر کلیک کنید ! </h4>
    <hr/>
    <a style="padding:.5rem 1rem;" href='${process.env.BASE_URL}reset-password/${token}'>بازیابی رمز</a>
    </div>
      `
  );
  res.status(200).json({
    message: `ایمیل بازیابی رمز به آدرس ایمیل ${email} ارسال شد !`,
  });
};
