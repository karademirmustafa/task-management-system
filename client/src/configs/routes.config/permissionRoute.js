import React from 'react';

const permissionRoute = [
  {
    key: 'accessDenied',
    path: `/access-denied`,
    component: React.lazy(() => import('views/access-denied')),
    title:"Access Denied Page",
    type:"Public",
    description:"Permissin denied.",
    authority:['All'],


  },
  

];

export default permissionRoute;
