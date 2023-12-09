const BaseService = require("./BaseService");
const User = require("../models/User");

class UserService extends BaseService {
  constructor() {
    super(User);
  }

  

}


module.exports = new UserService();
