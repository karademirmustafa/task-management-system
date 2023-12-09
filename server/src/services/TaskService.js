const BaseService = require("./BaseService");
const Task = require("../models/Task");
const {Forbidden, BadRequest} = require("../utils/error");
const {hasRole} = require("../utils/hasRole");
const ROLES_LIST = require("../config/rolesList");

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

  async getTasks(params) {
    const { next, query, where, user,roles } = params;

    let { sort="createdAt", orderBy=-1, page=1, size=10, filterBy="" } = query;
    const userId=user._id;
    try {
      if (!page || parseInt(page) <= 0) page = 1; // valid page check

      if (!sort) sort = "createdAt"; // default createdAt sorting

      if (!orderBy) orderBy = -1; // default DESC

      if (orderBy) orderBy = orderBy.toLowerCase() === "asc" ? 1 : -1;

      // maybe it could be constant
      const allowedFilters = ['title', 'status', 'userId', 'description'];
      
      if (filterBy && filterBy.includes(":")) {
        const [filterKey, filterValue] = filterBy.split(":");
      
        if (filterKey === 'userId' && !hasRole(roles,ROLES_LIST.admin) && filterValue !== userId.toString()) {
          throw Forbidden; // unauthorized entry
        } else if (allowedFilters.includes(filterKey)) {
          where[filterKey] = (filterKey === 'userId' && !hasRole(roles,ROLES_LIST.admin)) ? userId.toString() : filterValue;
        } else {
          throw BadRequest // invalid filter key
        }
      }
      const skip = (parseInt(page) - 1) * parseInt(size);

      if (hasRole(roles,ROLES_LIST.admin)) {
        where = {};
      } else {
        if (hasRole(roles,ROLES_LIST.manager)) {
          where.$or = [{ assignedTo: userId }, { userId}];
        } else {
          where.userId = userId
        }
      }
      const tasks = await Task.find({ ...where })
        .skip(skip)
        .limit(size)
        .sort({ [sort]: orderBy })
        .populate("userId", "name email -_id")
        .populate("assignedTo", "name email -_id");

      const total = await Task.countDocuments({...where});
      const pageCount = Math.ceil(total / parseInt(size));

      const meta = {
        total,
        pageCount,
        pageSize: parseInt(size),
        pageIndex: parseInt(page),
        sort,
      };
      return { meta, data: tasks };
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TaskService();
