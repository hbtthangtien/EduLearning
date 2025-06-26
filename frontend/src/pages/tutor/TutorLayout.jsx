// TutorLayout.jsx
import React from "react";
import TutorSidebar from "../tutor/TutorSidebar";
import { Outlet } from "react-router-dom";

const TutorLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <TutorSidebar />
      <div className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default TutorLayout;
