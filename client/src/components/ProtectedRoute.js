import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/tokenService";

// Usage (React Router v6):
// <Route element={<ProtectedRoute />}> <Route path="/dashboard" element={<Dashboard/>} /> </Route>

export default function ProtectedRoute({ redirectTo = "/login" }) {
  const token = getAccessToken();
  if (!token) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
}
