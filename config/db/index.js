var debug = require('debug')('db');
const mongoose = require("mongoose");

function connect_db() {
     mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        .then(db => debug(`connected to database`))
        .catch(err => {
            console.error("Connection error", err);
            process.exit();
        });
};


module.exports = connect_db;



