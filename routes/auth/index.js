const { Router } = require("express");
const {
  completedUserController,
} = require("../../controller/auth/completedUser");
const {
  registerUserController,
} = require("../../controller/auth/registerUser");
const { loginUserController } = require("../../controller/auth/loginUser");
const authenticate = require("../../middlewares/auth/authenticate");
const {
  getProfileHandler,
} = require("../../controller/auth/getProfileHandler");
const {
  updateProfileProfile,
} = require("../../controller/auth/updateProfileProfile");
const {
  handleForgotPassword,
} = require("../../controller/auth/forgotPassword");
const jwt = require("jsonwebtoken");
const User = require("../../model/auth/User");
const bcrypt = require("bcryptjs");

const route = Router();

route.post("/login", loginUserController);
route.post("/register", registerUserController);
route.post("/complete-register", authenticate, completedUserController);
route.get("/get-profile", authenticate, getProfileHandler);
route.post("/forgot-password", handleForgotPassword);
route.get("/reset-password/:token", async (req, res) => {
  let token =
    req.params && jwt.verify(req.params.token, process.env.TOKEN_SECRET);
  let user = await User.findById(token._id);
  if (!user)
    return res.status(404).json({
      errors: "کاربر پیدا نشد !",
    });

  res.status(200).json({
    _id: token._id,
  });
});
route.post("/reset-password", async (req, res) => {
  const { password, repeatPassword, _id } = req.body;
  let hashedPassword = await bcrypt.hash(password, 10);
  try {
    let user = await User.findOneAndUpdate(
      {
        _id,
      },
      {
        password: hashedPassword,
        confirmPassword: hashedPassword,
      }
    );
    res.status(200).json({
      message: `${user.fullName} عزیز رمز عبور شما تغییر کرد  .`,
    });
  } catch (err) {
    console.log(err);
  }
});
route.put("/update-profile", authenticate, updateProfileProfile);

module.exports = route;
