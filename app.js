const debug = require("debug")("app");

const express = require("express");
const fileUpload = require("express-fileupload");
const { throwError } = require("./middlewares/errorHandler");
const app = express();

app.use(require("cors")());
require("./config/env")(app);
require("./config/db")();
require("./middlewares/encodeing")(app);
app.use(express.static(require("./utils/getPath").getPath("public")));
app.use(
  fileUpload({
    limits: {
      fileSize: 3024 * 3024,
    },
  })
);

app.get("/", (req, res, next) => {
  try {
    throw throwError(400, "error", ["dataa"]);
  } catch (ex) {
    next(ex);
  }
});
app.use("/", require("./routes/home").header);
app.use("/auth", require("./routes/auth"));

app.use(require("./middlewares/errorHandler").errorHandler);
app.use(require("./middlewares/headers").setHeaders);

const port = process.env.PORT;
app.listen(port, () => debug(` app listening on port ${port}!`));
