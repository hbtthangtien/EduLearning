import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChalkboardTeacher, FaUserGraduate, FaCalendarAlt, FaEnvelope, FaEdit, FaPlusCircle } from "react-icons/fa";

const sidebarLinks = [
    {
        to: "/tutor",
        icon: <FaChalkboardTeacher />,
        label: "Dashboard"
    },
    {
        to: "/tutor/classes",
        icon: <FaChalkboardTeacher />,
        label: "Quản lý lớp học"
    },
    {
        to: "/tutor/create-class",
        icon: <FaPlusCircle />,
        label: "Tạo lớp học"
    },
    {
        to: "/tutor/students",
        icon: <FaUserGraduate />,
        label: "Học viên đã đăng ký"
    },
    {
        to: "/tutor/schedule",
        icon: <FaCalendarAlt />,
        label: "Lịch dạy"
    },
    {
        to: "/tutor/messages",
        icon: <FaEnvelope />,
        label: "Tin nhắn từ học viên"
    },
    {
        to: "/tutor/profile-edit",
        icon: <FaEdit />,
        label: "Cập nhật hồ sơ"
    },
    {
        to: "/tutor/slots",
        icon: <FaEdit />,
        label: "Tạo slots cho học sinh"
    }
];
const TutorSidebar = () => {
    const location = useLocation();

    return (
        <aside className="bg-gradient-to-b from-blue-900 to-blue-700 text-white w-64 min-h-screen flex flex-col p-6 shadow-xl border-r border-blue-800">
            {/* Có thể thêm avatar/ logo ở đây */}
            <div className="mb-8 flex items-center gap-3">
                {/* <img src="/your-logo.png" alt="Logo" className="w-10 h-10 rounded-full shadow" /> */}
                <span className="text-2xl font-extrabold tracking-tight">Gia sư Dashboard</span>
            </div>

            <nav className="flex-1 space-y-2">
                {sidebarLinks.map(link => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-base transition-all 
                            ${location.pathname === link.to
                                ? "bg-gradient-to-r from-blue-600 to-pink-500 shadow-lg text-white scale-105"
                                : "hover:bg-blue-600 hover:shadow text-blue-100"
                            }`}
                    >
                        <span className="text-lg">{link.icon}</span>
                        {link.label}
                    </Link>
                ))}

            </nav>
        </aside>
    );
};

export default TutorSidebar;
