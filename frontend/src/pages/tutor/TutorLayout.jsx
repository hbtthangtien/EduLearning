import React from "react";
import TutorSidebar from "../tutor/TutorSidebar";
import { Outlet } from "react-router-dom";

const TutorLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar cố định bên trái */}
            <TutorSidebar />

            {/* Nội dung thay đổi theo route */}
            <div className="flex-grow p-10 bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default TutorLayout;
