const AuthService = require("../services/AuthService");

const {
  BadRequest,
  PasswordMisMatch,
  NotFoundUser,
} = require("../utils/error");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw BadRequest;

    const user = await AuthService.findOne({ email });
    // User not found
    if (!user) throw NotFoundUser;

    //Not matches password
    if (!(await user.comparePassword(password))) throw PasswordMisMatch;

    // Generate token
    const { token, message } = await AuthService.sendToken({
      user,
      statusCode: 200,
    });

    return res.status(200).json({ status: true, message, data: { token } });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw BadRequest;

    const newUser = await AuthService.create(req.body);

    const { token, message } = await AuthService.sendToken({
      user: newUser,
      statusCode: 201,
    });

    return res.status(201).json({ status: true, message, data: { token } });
  } catch (err) {
    next(err);
  }
};



module.exports = { login, register};
