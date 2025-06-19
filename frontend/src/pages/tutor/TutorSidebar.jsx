import React from "react";
import { Link } from "react-router-dom";
import {
    FaChalkboardTeacher,
    FaUserGraduate,
    FaCalendarAlt,
    FaEnvelope,
    FaEdit,
    FaPlusCircle,
} from "react-icons/fa";

const TutorSidebar = () => {
    return (
        <div className="bg-[#000080] text-white w-64 h-screen flex flex-col p-6">
            <h2 className="text-2xl font-bold mb-6">Gia sư Dashboard</h2>

            <nav className="space-y-4">
                <Link
                    to="/tutor/classes"
                    className="flex items-center gap-3 hover:bg-[#000060] p-2 rounded-lg"
                >
                    <FaChalkboardTeacher /> Quản lý lớp học
                </Link>
                <Link
                    to="/tutor/create-class"
                    className="flex items-center gap-3 hover:bg-[#000060] p-2 rounded-lg"
                >
                    <FaPlusCircle /> Tạo lớp học
                </Link>
                <Link
                    to="/tutor/students"
                    className="flex items-center gap-3 hover:bg-[#000060] p-2 rounded-lg"
                >
                    <FaUserGraduate /> Học viên đã đăng ký
                </Link>
                <Link
                    to="/tutor/schedule"
                    className="flex items-center gap-3 hover:bg-[#000060] p-2 rounded-lg"
                >
                    <FaCalendarAlt /> Lịch dạy
                </Link>
                <Link
                    to="/tutor/messages"
                    className="flex items-center gap-3 hover:bg-[#000060] p-2 rounded-lg"
                >
                    <FaEnvelope /> Tin nhắn từ học viên
                </Link>
                <Link
                    to="/tutor/profile-edit"
                    className="flex items-center gap-3 hover:bg-[#000060] p-2 rounded-lg"
                >
                    <FaEdit /> Cập nhật hồ sơ
                </Link>
            </nav>
        </div>
    );
};

export default TutorSidebar;
