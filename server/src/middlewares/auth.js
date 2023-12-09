const jwt = require('jsonwebtoken');
const AuthService = require('../services/AuthService');
const {ErrorResponse} = require("../utils/errorResponse");
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //Bearer tokenadfsda321431243214321
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ErrorResponse('Permission denied.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return next(new ErrorResponse('JWT token not verified.', 401));
    }
    if (decoded) {
      const user = await AuthService.findById(decoded.id);
      if (!user) {
        return next(new ErrorResponse('Not found User.', 401));
      }

      req.user = user;
      req.roles=user.roles;
      return next();
    }

    res.status(401).json({ status: false, message: 'Permission denied' });
  } catch (error) {
    return res
      .status(401)
      .json({ status: false, message: 'You do not have permission to view.' });
  }
};

