const getProfile = async (req, res, next) => {
  try {
    const {password,...userWithoutPassword} = req.user._doc;

    return res
      .status(200)
      .json({ status: true, message: "Get Profile", data: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile };
