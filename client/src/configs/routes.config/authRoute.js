import React from 'react';

const authRoute = [
  {
    key: 'signIn',
    path: `/sign-in`,
    component: React.lazy(() => import('views/auth/SignIn')),
    authority: []
  },
  {
    key: 'signUp',
    path: `/sign-up`,
    component: React.lazy(() => import('views/auth/SignUp')),
    authority: []
  },

];

export default authRoute;
