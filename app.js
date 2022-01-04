var debug = require('debug')('app')
var cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

require('./config/env')(app);
require('./config/db')();
require('./middlewares/encodeing')(app);



const port = process.env.PORT;
app.get('/', (req, res) => res.json({
    message: 'Hello World!'
}));
app.use('/', require('./routes/home').header);
app.use('/auth', require('./routes/auth'))

app.listen(port, () => debug(` app listening on port ${port}!`))