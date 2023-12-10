import React from 'react';
import { ADMIN, MANAGER, USER } from 'constants/roles.constant';

const taskRoute = [
  {
    key: 'tasks',
    path: '/tasks',
    component: React.lazy(() => import('views/dashboard/Task')),
    authority: [USER],
    access: [],
    title: 'Task Page',
    type: 'Private',
    description: 'Tasks show'
  },
  {
    key: 'addTask',
    path: '/tasks/add-task',
    component: React.lazy(() => import('views/dashboard/Task/components/AddTask')),
    authority: [USER],
    access: [],
    title: 'Add Task Page',
    type: 'Private',
    description: 'Add Task'
  },
  {
    key: 'editTask',
    path: '/tasks/:id',
    component: React.lazy(() => import('views/dashboard/Task/components/EditTask')),
    authority: [USER],
    access: [],
    title: 'Edit Task Page',
    type: 'Private',
    description: 'Edit Task'
  },
  {
    key: 'myTasks',
    path: '/tasks/my-tasks',
    component: React.lazy(() => import('views/dashboard/Task/components/MyTask')),
    authority: [USER],
    access: [],
    title: 'My Tasks Page',
    type: 'Private',
    description: 'My Task'
  }
];

export default taskRoute;