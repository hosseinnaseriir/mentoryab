exports.errorHandler = (err, req, res, next) => {
  console.log("here!");
  const statusCode = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(statusCode).json({ errors: [message], data });
};

exports.throwError = (code, message, data) => {
  const error = new Error(message);
  error.code = code;
  error.data = data;
  return error;
};
