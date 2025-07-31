import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import AccountDelete from "./pages/AccountDelete";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/account/delete" element={<AccountDelete />} />
  </Routes>
);

export default AppRoutes;
