import React from 'react';
import authRoute from './authRoute';
import {ADMIN,MANAGER,USER} from "constants/roles.constant"
export const publicRoutes = [...authRoute];

export const protectedRoutes = [
  {
    key: 'home',
    path: '/home',
    component: React.lazy(() => import('views/home')),
    authority: [ADMIN,MANAGER,USER],
    access:[]
  },

];
