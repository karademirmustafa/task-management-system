import { Button } from 'components/ui';
import { HiPlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import React from 'react';

const TaskTableTools = () => {
  return (
    <div className="flex flex-col md:items-center lg:flex-row lg:items-center">
      
      <Link to={`/tasks/add-task`} className="block lg:inline-block md:mx-2  md:ml-2 lg:ml-2 mt-4 ">
        <Button variant="default" size="sm" icon={<HiPlus />}>
          Create Task
        </Button>
      </Link>
    </div>
  );
};

export default TaskTableTools;
