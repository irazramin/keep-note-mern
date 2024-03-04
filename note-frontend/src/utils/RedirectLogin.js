import React from "react";
import { Navigate } from "react-router-dom";

const RedirectLogin = () => {
  return <Navigate to="/login" />;
};

export default RedirectLogin;
