import React from 'react';

const permissionRoute = [
  {
    key: 'info',
    path: `/info`,
    component: React.lazy(() => import('views/info')),
    title:"Info Page",
    type:"Public",
    description:"Info all page permission and path",
    authority:['All'],


  },
  

];

export default permissionRoute;
