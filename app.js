var debug = require('debug')('app')
const express = require('express');
const app = express();


require('./config/env')(app);
require('./config/db')();
require('./middlewares/encodeing')(app);


const port = process.env.PORT;

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/auth' , require('./routes/auth'))

app.listen(port, () => debug(` app listening on port ${port}!`))