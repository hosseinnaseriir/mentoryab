const {
    Router
} = require("express");
const { completedUserController } = require("../../controller/auth/completedUser");
const { userController } = require("../../controller/auth/USer");

const route = Router();
route.get('/', (req, res) => {
    res.send('test')
});

route.post('/register', userController);
route.post('/complete-register', completedUserController);

module.exports = route;