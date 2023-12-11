import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from 'utils/hooks/useAuth';
import appConfig from 'configs/app.config';

const { authenticatedEntryPath } = appConfig;

const PublicRoute = () => {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Navigate to={authenticatedEntryPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
