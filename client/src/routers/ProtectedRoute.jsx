import React from "react";
import useAuth from "../hooks/useAuth";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("multiUser"));
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
