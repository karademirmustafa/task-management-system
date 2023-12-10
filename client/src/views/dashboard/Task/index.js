import React from 'react';
import { injectReducer } from 'store';
import reducer from './store';
import TaskTable from './components/TaskTable';
import TaskTableTools from './components/TaskTableTools';
injectReducer('taskList', reducer);
const Task = () => {
  return (
    <div className="h-full">
      <div className="lg:flex items-center justify-between mb-3">
      <h5 className="mb-4 lg:mb-0">Tasks</h5>

        <TaskTableTools/>
      </div>
      <TaskTable />
    </div>
  );
};

export default Task;
