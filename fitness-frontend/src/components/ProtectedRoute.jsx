import React from "react";
import { Navigate } from "react-router-dom";
import { extractUserInfoFromToken } from "../utils/tokenUtils";

const ProtectedRoute = ({ children, requiredRole }) => {
  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  // Ensure token is not null and is a valid string
  if (!token || typeof token !== "string") {
    return <Navigate to="/login" replace />;
  }

  // Extract user info from the token
  const { role, email } = extractUserInfoFromToken(token);

  // If there's no role or the role doesn't match the required role, redirect to login
  if (!role || role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  // If everything is valid, render the children components
  return children;
};

export default ProtectedRoute;
