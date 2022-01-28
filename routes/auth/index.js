const {
    Router
} = require("express");
const { completedUserController } = require("../../controller/auth/completedUser");
const { registerUserController } = require("../../controller/auth/registerUser");
const { loginUserController } = require("../../controller/auth/loginUser");
const handleUploadImage = require('./../../controller/media/uploadController');
const route = Router();
const multer = require('multer');

route.post('/login', loginUserController);
route.post('/register', registerUserController);
route.post('/complete-register', handleUploadImage(['avatar' , 'resume']) , completedUserController);


module.exports = route;