import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Courses from "../pages/admin/Courses";
import Report from "../pages/admin/Report";
import ApproveTutors from "../pages/admin/ApproveTutors";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="courses" element={<Courses />} />
                <Route path="reports" element={<Report />} />
                <Route path="approve" element={<ApproveTutors />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
