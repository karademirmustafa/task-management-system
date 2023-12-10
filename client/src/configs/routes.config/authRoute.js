import React from 'react';

const authRoute = [
  {
    key: 'signIn',
    path: `/sign-in`,
    component: React.lazy(() => import('views/auth/SignIn')),
    authority: ['All'],
    title:"Sign In Page",
    type:"Public",
    description:"Login user.",
  },
  {
    key: 'signUp',
    path: `/sign-up`,
    component: React.lazy(() => import('views/auth/SignUp')),
    authority: ['All'],
    title:"Sign Up Page",
    type:"Public",
    description:"Register user.",
  },

];

export default authRoute;
