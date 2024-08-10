import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthGuard = ({ Component }) => {
  const isAuthenticated = useAuth();

  // return Cookies.get("token") ? Component : <Navigate to="/login" />;
  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default AuthGuard;
