const BaseService = require("./BaseService");
const Task = require("../models/Task");

class TaskService extends BaseService {
  constructor() {
    super(Task);
  }

}

module.exports = new TaskService();
