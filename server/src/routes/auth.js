const express = require("express");
const router = express.Router();

// Controller
const authController = require("../controllers/auth");
// Validations
const authSchemas = require("../validations/auth");
// Validate Middleware
const { validate } = require("../middlewares/validate");
//Protect Middleware
const { protect } = require("../middlewares/auth");
// Verify Roles
const verifyRoles = require("../middlewares/verifyRoles");
// Role List
const ROLES_LIST = require("../config/rolesList");


router
  .route("/login")
  .post(validate(authSchemas.loginSchema), authController.login);

router
  .route("/register")
  .post(validate(authSchemas.registerSchema), authController.register);


  router
  .route("/authorize")
  .patch(
    validate(authSchemas.authorizeSchema),
    protect,
    verifyRoles(ROLES_LIST.admin),
    authController.authorize
  );
router
  .route("/revoke")
  .patch(
    validate(authSchemas.revokeSchema),
    protect,
    verifyRoles(ROLES_LIST.admin),
    authController.revoke
  );

module.exports = router;
