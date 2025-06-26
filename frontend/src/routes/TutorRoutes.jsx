import React from "react";
import { Route } from "react-router-dom";
import TutorLayout from "../pages/tutor/TutorLayout";
import TutorDashboard from "../pages/tutor/TutorDashboard";
import TutorClasses from "../pages/tutor/TutorClasses";
import TutorStudents from "../pages/tutor/TutorStudents";
import TutorSchedule from "../pages/tutor/TutorSchedule";
import TutorMessages from "../pages/tutor/TutorMessages";
import TutorProfile from "../pages/tutor/TutorProfile";
import CreateClassPage from "../pages/tutor/CreateClassPage";
import CreateSlot from "../pages/tutor/CreateSlot";

export const getTutorRoutes = () => (
    <Route path="/tutor" element={<TutorLayout />}>
        <Route index element={<TutorDashboard />} />
        <Route path="classes" element={<TutorClasses />} />
        <Route path="students" element={<TutorStudents />} />
        <Route path="schedule" element={<TutorSchedule />} />
        <Route path="messages" element={<TutorMessages />} />
        <Route path="profile-edit" element={<TutorProfile />} />
        <Route path="create-class" element={<CreateClassPage />} />
        <Route path="slots" element={<CreateSlot/>}/>
    </Route>
);
