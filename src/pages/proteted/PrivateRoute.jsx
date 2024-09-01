// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const PrivateRoutes = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/" />
  }

  return <Outlet />
};

export default PrivateRoutes;
