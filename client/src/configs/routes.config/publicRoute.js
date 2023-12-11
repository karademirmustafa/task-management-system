import React from 'react';

const publicRoute = [
  {
    key: 'info',
    path: `/info`,
    component: React.lazy(() => import('views/info')),
    title:"Info Page(TEST)",
    type:"Private",
    description:"Info all page permission and path",
    authority:[],


  },
  

];

export default publicRoute;
