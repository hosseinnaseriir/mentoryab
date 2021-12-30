const morgan = require("morgan");
const {
    getPath
} = require("../../utils/getPath");

function env_setup(app) {
    require('dotenv').config({
        path: getPath('config/env/.env')
    });
    (process.env.NODE_ENV === 'development' && app.get('env') === 'development') && app.use(morgan('tiny'))
};

module.exports = env_setup;