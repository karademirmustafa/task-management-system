import { Button } from 'components/ui';
import { HiPlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import React from 'react';
import TaskTableSearch from './TaskTableSearch';
import TaskSortBy from './TaskSortBy';
import TaskStatusFilter from './TaskStatusFilter';
import TaskDateFilter from './TaskDateFilter';
const TaskTableTools = () => {
  return (
    <div className="flex flex-col items-center md:items-center lg:flex-row lg:items-center gap-2">
      <TaskTableSearch />
      <TaskDateFilter />
      <TaskStatusFilter />
      <TaskSortBy />
      <Link to={`/tasks/add-task`} className="block lg:inline-block md:mx-2  md:ml-2 lg:ml-2 w-full">
        <Button variant="default" block size="sm" icon={<HiPlus />}>
          Create Task
        </Button>
      </Link>
    </div>
  );
};

export default TaskTableTools;
