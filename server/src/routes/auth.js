const express = require("express");
const router = express.Router();

// Controller
const authController = require("../controllers/auth");
// Validations
const authSchemas = require("../validations/auth");
// Validate Middleware
const { validate } = require("../middlewares/validate");

router
  .route("/login")
  .post(validate(authSchemas.loginSchema), authController.login);

router
  .route("/register")
  .post(validate(authSchemas.registerSchema), authController.register);



module.exports = router;
