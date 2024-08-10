import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const RedirectDashboard = ({ path }) => {
  const isAuthenticated = useAuth();
  return <Navigate to="/login" />;
};

export default RedirectDashboard;
