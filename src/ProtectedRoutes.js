import React from "react";
import { Token, getItem } from "./Services/LocalStorageManager";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token = getItem(Token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
