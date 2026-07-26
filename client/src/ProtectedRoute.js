import React from "react";
import { Navigate } from "react-router-dom";

const getUserAndRole = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return { user: null, role: null };

  try {
    const user = JSON.parse(storedUser);

    let role = null;
    if (user.student) role = "student";
    else if (user.faculty) role = "faculty";
    else if (user.admin) role = "admin";
    else if (user.warden) role = "warden";

    return { user, role };
  } catch {
    localStorage.removeItem("user");
    return { user: null, role: null };
  }
};

const ProtectedRoute = ({ allowedRole, children }) => {
  const { user, role } = getUserAndRole();

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role && allowedRole !== role) {
    let redirectPath = "/";
    if (role === "student") redirectPath = "/student/home";
    else if (role === "faculty") redirectPath = "/faculty/home";
    else if (role === "admin") redirectPath = "/admin/home";
    else if (role === "warden") redirectPath = "/warden-dashboard";

    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;

