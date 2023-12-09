const BaseService = require("./BaseService");
const User = require("../models/User");

class AuthService extends BaseService {
  constructor() {
    super(User);
  }

  sendToken(params) {
    const { user, statusCode } = params;
    const token = user.getSignedToken();
    let message;

    switch (statusCode) {
      case 200:
        message = "Sign in successfull";
        break;
      case 201:
        message = "Sign up successfull";
        break;
      default:
        message = "";
        break;
    }
    const data = {
      token,
      message,
    };
    return data;
  }

}

module.exports = new AuthService();
