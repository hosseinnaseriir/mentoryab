const CompletedUser = require("../../model/auth/CompletedUser");

exports.getProfileHandler = async (req, res) => {
  try {
    let user = await CompletedUser.find({
      userID: req.user._id,
    });
    console.log(user);
    if (!user)
      return res.status(404).json({
        errors: ["کاربر پیدا نشد !"],
      });
    return res.status(200).json(user[0]);
  } catch (err) {
    console.log("err", err);
    res.status(400).json({
      errors: err.errors || err,
    });
  }
};
