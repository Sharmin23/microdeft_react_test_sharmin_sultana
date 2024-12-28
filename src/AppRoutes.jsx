import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddCourses from "./pages/Courses/Add";
import CoursesList from "./pages/Courses/List";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addcourses" element={<AddCourses />} />
        <Route path="/courseslist" element={<CoursesList />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
