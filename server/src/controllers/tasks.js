const TaskService = require("../services/TaskService");


const insertTask = async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const params = { body, user, next };
    const newTask = await TaskService.createTask(params);

    return res
      .status(201)
      .json({ status: true, message: "Insert Task", data: newTask });
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req, res, next) => {
    try {
      const user = req.user;
      const query = req.query;
      const where = {};
      const roles = req.roles;
      const params = { user, query, where,next,roles};
  
      const tasks = await TaskService.getTasks(params);
  
      return res
        .status(200)
        .json({ status: true, message: "Fetch tasks", data: tasks.data,meta:tasks.meta });
    } catch (err) {
      next(err);
    }
  };

const getTask = async (req, res, next) => {
    try {
      const params = req.params;
  
      const task = await TaskService.findById(params.id);
  
      if (!task) throw NotFound;
  
      return res
        .status(200)
        .json({ status: true, message: "Get Task", data: task });
    } catch (err) {
      next(err);
    }
  };

module.exports = { insertTask,getTasks,getTask};
