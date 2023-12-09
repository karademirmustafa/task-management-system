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

router
  .route("/")
  .post(validate(taskSchemas.insertSchema), protect, TaskController.insertTask)
  



module.exports = router;
