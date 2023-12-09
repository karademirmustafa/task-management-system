import AppRoute from 'components/route/AppRoute';
import PublicRoute from 'components/route/PublicRoute';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from 'configs/routes.config';

const AllRoutes = (props) => {

  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<AppRoute routeKey={route.key} component={route.component} {...route.meta} />}
          />
        ))}
      </Route>
    </Routes>
  );
};

const Views = (props) => {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <AllRoutes {...props} />
    </Suspense>
  );
};

export default Views;
