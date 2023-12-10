const TaskService = require("../services/TaskService");
const { NotFound } = require("../utils/error");

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
    const where = {
      isDeletedAt: { $exists: false },
    };
    const roles = req.roles;
    const params = { user, query, where, next, roles };

    const tasks = await TaskService.getTasks(params);

    return res.status(200).json({
      status: true,
      message: "Fetch tasks",
      data: tasks.data,
      meta: tasks.meta,
    });
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const params = req.params;

    const where = {
      _id: params.id,
      isDeletedAt: { $exists: false },
    };
    const populate = {
      path: "userId",
      select: "-password",
    };
    const populate2 = {
      path: "assignedTo",
      select: "-password",
    };
    const task = await TaskService.findOne(where, undefined,populate,populate2);

    if (!task) throw NotFound;

    return res
      .status(200)
      .json({ status: true, message: "Get Task", data: task });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const params = req.params;
    const user = req.user;
    const body = req.body;
    const where = {
      userId: user._id,
      _id: params.id,
    };
    const task = await TaskService.findOne(where);

    if (!task) throw NotFound;

    const result = await TaskService.updateTask({ body, task });

    return res
      .status(200)
      .json({ status: true, message: "Update Task", data: result });
  } catch (err) {
    next(err);
  }
};

const removeTask = async (req, res, next) => {
  try {
    const user = req.user;
    const params = req.params;
    const where = {
      userId: user._id,
      _id: params.id,
    };
    const task = await TaskService.findOne(where);
    if (!task) throw NotFound;

    const result = await TaskService.removeTask({ task });

    return res
      .status(200)
      .json({ status: true, message: "Remove Task", data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { insertTask, getTasks, getTask, updateTask, removeTask };
