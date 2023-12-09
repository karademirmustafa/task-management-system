import React from 'react';

const AppRoute = ({ component: Component, routeKey, ...props }) => {


  return <Component {...props} />;
};

export default AppRoute;
