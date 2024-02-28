// PrivateRoute.js

import React from "react";
import { Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Cookies from "js-cookie";

const AuthGuard = ({Component}) => {
  const isAuthenticated = useAuth();

  console.log(isAuthenticated)

  return Cookies.get('access_token') ? Component : <Navigate to="/login" />;
};

export default AuthGuard;
