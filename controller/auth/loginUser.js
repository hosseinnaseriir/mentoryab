const User = require("../../model/auth/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      email,
    });

    if (!user)
      return res.status(404).json({
        errors: ["کاربری با این ایمیل پیدا نشد !"],
      });

    res.setHeader("Content-Type", "application/json");
    let comparePassword = await bcrypt.compare(password , user.password);

    if (!comparePassword)
      return res.status(400).json({
        errors: ["ایمیل یا کلمه عبور شما اشتباه است !"],
      });

    let verifyToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.TOKEN_SECRET
    );
    res.header("ath-token", verifyToken);
    return res.status(200).json({
      message: `${user.fullName} عزیز ،خوش آمدید .`,
      token: verifyToken,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      errors: err.errors || err,
    });
  }
};
