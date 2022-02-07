const { Router } = require("express");
const {
  completedUserController,
} = require("../../controller/auth/completedUser");
const {
  registerUserController,
} = require("../../controller/auth/registerUser");
const { loginUserController } = require("../../controller/auth/loginUser");
const authenticate = require("../../middlewares/auth/authenticate");
const { getProfileHandler } = require("../../controller/auth/getProfileHandler");
const { updateProfileProfile } = require("../../controller/auth/updateProfileProfile");
const route = Router();

route.post("/login", loginUserController);
route.post("/register", registerUserController);
route.post("/complete-register", authenticate, completedUserController);
route.get("/get-profile", authenticate, getProfileHandler);
route.put("/update-profile", authenticate, updateProfileProfile);

module.exports = route;
