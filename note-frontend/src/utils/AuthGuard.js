// PrivateRoute.js

import React from "react";
import { Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthGuard = ({Component}) => {
  const isAuthenticated = useAuth();

  console.log(isAuthenticated)

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default AuthGuard;
