import React from "react";
import { Token, getItem } from "./Services/LocalStorageManager";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const token = getItem(Token);
  return !token ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoutes;
