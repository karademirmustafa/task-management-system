import React from 'react';
import authRoute from './authRoute';
import permissionRoute from './permissionRoute';
import {ADMIN,MANAGER,USER} from "constants/roles.constant"
import publicRoute from './publicRoute';
import taskRoute from './taskRoute';
export const publicRoutes = [...authRoute,...permissionRoute,...publicRoute];

export const protectedRoutes = [
  ...taskRoute,
  {
    key: 'home',
    path: '/home',
    component: React.lazy(() => import('views/home')),
    authority: [USER],
    access:[],
    title:"Home Page",
    type:"Private",
    description:"Home Page, info cards"
  },

];
