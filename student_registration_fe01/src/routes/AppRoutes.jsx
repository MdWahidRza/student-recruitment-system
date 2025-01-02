import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentRegistration from "../pages/StudentRegistration";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import ProfilePage from "../pages/ProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Registration Page */}
      <Route path="/" element={<StudentRegistration />} />

      {/* Login Page */}
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard Page */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
