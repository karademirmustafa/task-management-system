const BaseService = require("./BaseService");
const User = require("../models/User");
const ROLES_LIST = require("../config/rolesList");
const { BadRequest } = require("../utils/error");

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
  async authorizeUser(params) {
    const { user, access } = params;

    if (!this.rolesInclude(access)) throw BadRequest;

    if (user.roles?.includes(access)) throw BadRequest;

    user.roles.push(access);
    await user.save();

    return user;

  }
  async revokeUser(params){
    const {user,access}=params;

    if(!this.rolesInclude(access)) throw BadRequest;

    if (user.roles?.includes(access)) {
      const index = user.roles.indexOf(access);
      user.roles.splice(index, 1);
      await user.save();
    }
    return user;
  }

  rolesInclude(role) {
    const roles = Object.values(ROLES_LIST);
    return roles.includes(role);
  }

}


module.exports = new AuthService();
