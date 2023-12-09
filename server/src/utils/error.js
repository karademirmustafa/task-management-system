class ErrorResponse extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  module.exports = {
    ErrorResponse,
    BadRequest: new ErrorResponse("Bad Request.", 400),
  };
  