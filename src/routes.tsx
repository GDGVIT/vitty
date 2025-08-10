import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import AccountDelete from "./pages/AccountDelete";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/login";
import { GuardedRoute, UnauthGuard } from "./components/GuardRoute";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route element={<UnauthGuard />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<GuardedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account/delete" element={<AccountDelete />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Route>
  </Routes>
);

export default AppRoutes;
