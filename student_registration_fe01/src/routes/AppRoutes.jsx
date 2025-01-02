import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentRegistration from "../pages/StudentRegistration";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Registration Page */}
      <Route path="/" element={<StudentRegistration />} />

      {/* Login Page */}
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard Page */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
