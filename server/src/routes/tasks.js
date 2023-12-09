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
router
  .route("/")
  .post(validate(taskSchemas.insertSchema), protect, TaskController.insertTask)
  

  router.route("/:id").get(idChecker(),protect,TaskController.getTask);


module.exports = router;
