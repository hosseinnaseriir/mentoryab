const path = require("path");
let debug = require("debug")("app");
let cors = require("cors");

const express = require("express");
const fileUpload = require("express-fileupload");
const { getPath } = require("./utils/getPath");
const app = express();

app.use(cors());

require("./config/env")(app);
require("./config/db")();
require("./middlewares/encodeing")(app);
app.use(express.static(getPath("public")));
app.use(fileUpload());

const port = process.env.PORT;
app.get("/", (req, res) =>
  res.json({
    message: "Hello World!",
  })
);
app.use("/", require("./routes/home").header);
app.use("/auth", require("./routes/auth"));

app.listen(port, () => debug(` app listening on port ${port}!`));
