const BaseService = require("./BaseService");
const Task = require("../models/Task");
const { Forbidden, BadRequest } = require("../utils/error");
const { hasRole } = require("../utils/hasRole");
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
    const { next, query, where, user, roles } = params;
    console.log(params, "params");
    let { page, size, sort, filter } = query;

   page = Math.max(1, parseInt(page) || 1);
  size = parseInt(size) || 10;

  // Sıralama ayarları
  const sortOrder = {};
  sort && Object.keys(sort).forEach(key => {
    sortOrder[key] = sort[key] === "asc" ? 1 : -1;
  });

  const filters={}
  if (filter) {
    ['dueDate', 'createdAt'].forEach(dateField => {
      if (filter[dateField] && filter[dateField].start && filter[dateField].end) {
        const startDate = new Date(filter[dateField].start);
        const endDate = new Date(filter[dateField].end);
        endDate.setHours(23, 59, 59, 999);
  
        filters[dateField] = { $gte: startDate, $lte: endDate };
      }
    });
  
    if (filter.status) {
      filters.status = { $in: [] };
      Object.entries(filter.status).forEach(([statusKey, statusValue]) => {
        if(statusValue=="true") filters.status.$in.push(statusKey);
     
      });
      if (filters.status.$in.length === 0) {
        delete filters.status; 
      }
      
    }
  }
    const userId = user._id;
    try {
     

      // maybe it could be constant
      const allowedFilters = ["title", "status", "userId", "description"];

      // if (filterBy && filterBy.includes(":")) {
      //   const [filterKey, filterValue] = filterBy.split(":");

      //   if (
      //     filterKey === "userId" &&
      //     !hasRole(roles, ROLES_LIST.admin) &&
      //     filterValue !== userId.toString()
      //   ) {
      //     throw Forbidden; // unauthorized entry
      //   } else if (allowedFilters.includes(filterKey)) {
      //     where[filterKey] =
      //       filterKey === "userId" && !hasRole(roles, ROLES_LIST.admin)
      //         ? userId.toString()
      //         : filterValue;
      //   } else {
      //     throw BadRequest; // invalid filter key
      //   }
      // }
      const skip = (parseInt(page) - 1) * parseInt(size);

      if (hasRole(roles, ROLES_LIST.admin)) {
        where = {};
      } else {
        if (hasRole(roles, ROLES_LIST.manager)) {
          where.$or = [{ assignedTo: userId }, { userId }];
        } else {
          where.userId = userId;
        }
      }
      const tasks = await Task.find({ ...where, ...filters})
        .skip(skip)
        .limit(size)
        .sort(sortOrder)
        .populate("userId", "name email -_id")
        .populate("assignedTo", "name email -_id");

      const total = await Task.countDocuments({ ...where,...filters });
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

  async updateTask(params) {
    try {
      const { body, task } = params;

      task.title = body.title;
      task.description = body.description;
      task.dueDate = body.dueDate;
      task.status = body.status;

      // track task history
      if (body.status || body.dueDate) {
        const updatedAt = new Date();
        if (body.status) task.history.push({ key: "status", updatedAt });
        if (body.dueDate) task.history.push({ key: "dueDate", updatedAt });
      }

      await task.save();

      return task;
    } catch (err) {
      next(err);
    }
  }

  async removeTask(params) {
    try {
      const { task } = params;

      task.isDeletedAt = new Date();

      await task.save();

      return task;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TaskService();
