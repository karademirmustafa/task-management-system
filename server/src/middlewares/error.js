const {ErrorResponse} = require("../utils/error");

const errorHandler = (err, req, res, next) => {

  let error = { ...err };

  error.message = err.message;

  if (err.code === 11000) {
    const message = `You entered a duplicate value. Please try again`;

    error = new ErrorResponse(message, 409);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => {
      val.message;
    });
    error = new ErrorResponse(message, 400);
  }

 
  res.status(error.statusCode || 500).json({
    status: false,
    message: error.message || "Server Error",
    data: null,

  });
};

module.exports = errorHandler;
