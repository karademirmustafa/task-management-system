class ErrorResponse extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  module.exports = {
    ErrorResponse,
    NotFound: new ErrorResponse("Not found.", 404),
    NotFoundUser: new ErrorResponse("Not found user.", 404),
    BadRequest: new ErrorResponse("Bad Request.", 400),
    PasswordMisMatch: new ErrorResponse("Password does not match.", 400),
    EmailExist: new ErrorResponse("Email already exists", 400),
  };
  