const express = require("express");
const router = express.Router();

// Controller
const TaskController = require("../controllers/tasks");
// Middleware Auth
const { protect } = require("../middlewares/auth");
// Validations
const taskSchemas = require("../validations/tasks");
//  Middleware Validate
const { validate } = require("../middlewares/validate");
// MongoDB ObjectId Checker
const idChecker = require("../middlewares/idChecker");
// Role List
const ROLES_LIST = require("../config/rolesList");
// Middleware Verify Roles
const verifyRoles = require("../middlewares/verifyRoles");

router
  .route("/")
  .post(
    validate(taskSchemas.insertSchema),
    protect,
    verifyRoles(...Object.values(ROLES_LIST)),
    TaskController.insertTask
  )
  .get(
    protect,
    verifyRoles(...Object.values(ROLES_LIST)),
    TaskController.getTasks
  );

router.route("/:id").get(idChecker(), protect, TaskController.getTask);

module.exports = router;
