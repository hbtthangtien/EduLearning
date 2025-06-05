import React from "react";
import { Routes, Route } from "react-router-dom";
import TutorLayout from "../pages/tutor/TutorLayout";
import TutorDashboard from "../pages/tutor/TutorDashboard";
import TutorClasses from "../pages/tutor/TutorClasses";
import TutorStudents from "../pages/tutor/TutorStudents";
import TutorSchedule from "../pages/tutor/TutorSchedule";
import TutorMessages from "../pages/tutor/TutorMessages";
import TutorProfile from "../pages/tutor/TutorProfile";

const TutorRoutes = () => {
    return (
        <Routes>
            <Route path="/tutor" element={<TutorLayout />}>
                {/* Trang mặc định khi vào /tutor */}
                <Route index element={<TutorDashboard />} />

                {/* Các trang con */}
                <Route path="classes" element={<TutorClasses />} />
                <Route path="students" element={<TutorStudents />} />
                <Route path="schedule" element={<TutorSchedule />} />
                <Route path="messages" element={<TutorMessages />} />
                <Route path="profile-edit" element={<TutorProfile />} />
            </Route>
        </Routes>
    );
};

export default TutorRoutes;
