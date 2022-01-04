const {
    Router
} = require("express");
const { completedUserController } = require("../../controller/auth/completedUser");
const { registerUserController } = require("../../controller/auth/registerUser");
const { loginUserController } = require("../../controller/auth/loginUser");

const route = Router();

route.post('/login', loginUserController);
route.post('/register', registerUserController);
route.post('/complete-register', completedUserController);

module.exports = route;