// PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
