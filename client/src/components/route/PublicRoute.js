import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from 'utils/hooks/useAuth';
import appConfig from 'configs/app.config';

const { authenticatedEntryPath } = appConfig;

const PublicRoute = () => {
  const { authenticated } = useAuth();
  const location = useLocation();

  const signInPath = '/sign-in';  
  const signUpPath = '/sign-up';  

  const isAuthRestrictedRoute = location.pathname === signInPath || location.pathname === signUpPath;

  if (authenticated && isAuthRestrictedRoute) {
    return <Navigate to={authenticatedEntryPath} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
