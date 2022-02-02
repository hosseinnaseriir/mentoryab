const {
    Router
} = require("express");
const { completedUserController } = require("../../controller/auth/completedUser");
const { registerUserController } = require("../../controller/auth/registerUser");
const { loginUserController } = require("../../controller/auth/loginUser");
const handleUploadImage = require('./../../controller/media/uploadController');
const authenticate = require("../../middlewares/auth/authenticate");
const route = Router();


route.post('/login', loginUserController);
route.post('/register', registerUserController);
route.post('/complete-register' ,authenticate , completedUserController);


module.exports = route;