import { ADMIN, MANAGER, USER } from 'constants/roles.constant';

const navigationConfig = [
  {
    key: '/home',
    path: '/home',
    title: 'Home',
    icon: 'home',
    authority: [USER],
    access: [USER]
  },
  {
    key: '/dashboard',
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
    authority: [USER],
    access: [USER]
  },
  {
    key: '/tasks',
    path: '/tasks',
    title: 'Tasks',
    icon: 'my-tasks',
    authority: [USER],
    access: [USER]
  },
  
  {
    key: '/authorization',
    path: '/authorization',
    title: 'Authorization',
    icon: 'authorization',
    authority: [ADMIN],
    access: [ADMIN]
  },
  {
    key: '/task-assignment',
    path: '/task-assignment',
    title: 'Task Assignment',
    icon: 'task-assignment',
    authority: [MANAGER],
    access: [MANAGER]
  },
  { key: '/info', path: '/info', title:  'Info', icon: 'info', authority: [ADMIN], access: [ADMIN] },
  {
    key: '/logout',
    path: '/logout',
    title: 'Logout',
    icon: 'logout',
    authority: [USER],
    access: [USER]
  }
];

export default navigationConfig;
