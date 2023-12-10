import AppRoute from 'components/route/AppRoute';
import PublicRoute from 'components/route/PublicRoute';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes, protectedRoutes } from 'configs/routes.config';
import appConfig from 'configs/app.config';
import { useSelector } from 'react-redux';
import AuthorityGuard from 'components/route/AuthorityGuard';
import ProtectedRoute from 'components/route/ProtectedRoute';
import { PageContainer } from 'components/shared';

const { authenticatedEntryPath } = appConfig;

const AllRoutes = (props) => {
  const userAuthority = useSelector((state) => state.auth.authority.roles);

  return (
    <Routes>
      {/* Protected */}

      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate replace to={authenticatedEntryPath} />} />
        {protectedRoutes.map((route, index) => (
          <Route
            key={route.key + index}
            path={route.path}
            element={
              <AuthorityGuard
                route={route}
                userAuthority={userAuthority}
                access={route.access}
                authority={route.authority}>
                <PageContainer>
                  <AppRoute routeKey={route.key} component={route.component} {...route.meta} />
                </PageContainer>
              </AuthorityGuard>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Public */}
      <Route path="/" element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              // <PageContainer>
                <AppRoute routeKey={route.key} component={route.component} {...route.meta} />
              // </PageContainer>
            }
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
