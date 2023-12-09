const BaseService = require("./BaseService");
const Task = require("../models/Task");

class TaskService extends BaseService {
  constructor() {
    super(Task);
  }

  async createTask(params) {
    const { next, body, user } = params;
    const userId = user._id;
    try {
      const newTask = await this.create({ ...body, userId });

      return newTask;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TaskService();
