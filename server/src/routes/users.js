const express = require("express");
const router = express.Router();

// Controller
const userController = require("../controllers/users");
//Protect Middleware
const { protect } = require("../middlewares/auth");



router
  .route("/profile")
  .get(protect,userController.getProfile);



module.exports = router;
