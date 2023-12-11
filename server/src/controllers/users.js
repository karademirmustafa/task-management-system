const UserService = require("../services/UserService");

const getProfile = async (req, res, next) => {
  try {
    const { password, ...userWithoutPassword } = req.user._doc;

    return res
      .status(200)
      .json({
        status: true,
        message: "Get Profile",
        data: userWithoutPassword,
      });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.list({},'_id name email');
    
    return res.status(200).json({status:true,message:"Get All Users",data:users});
  } catch (err) {
    next(err);
  }
};
module.exports = { getProfile,getAllUsers };
