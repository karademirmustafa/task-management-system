import React from 'react';

const permissionRoute = [
  {
    key: 'accessDenied',
    path: `/access-denied`,
    component: React.lazy(() => import('views/access-denied')),
  },
  

];

export default permissionRoute;
