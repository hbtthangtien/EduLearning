import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assest/logoedusync.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-gradient-to-r from-[#000080] to-[#000080] shadow-md p-6 fixed top-0 w-full z-50 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
                <img src={logo} alt="Edusync Logo" className="w-10 h-10" />
                <Link to="/">
                    <h1 className="text-3xl font-bold text-white">Edusync</h1>
                </Link>
            </div>

            {/* Navbar Links */}
            <div className="space-x-6 hidden md:flex">
                <Link
                    to="/"
                    className="text-white hover:text-gray-300 font-medium"
                >
                    Trang chủ
                </Link>
                <Link
                    to="/tutors"
                    className="text-white hover:text-gray-300 font-medium"
                >
                    Gia sư
                </Link>
                <Link
                    to="/courses"
                    className="text-white hover:text-gray-300 font-medium"
                >
                    Lớp Học
                </Link>
                <Link
                    to="/contact"
                    className="text-white hover:text-gray-300 font-medium"
                >
                    Liên hệ
                </Link>
            </div>

            {/* Auth Section */}
            <div className="relative inline-block group text-left">
                {user ? (
                    <div className="bg-transparent">
                        {/* Gói cả Hello và dropdown vào 1 div */}
                        <div className="text-white font-medium cursor-pointer px-3 py-2">
                            Hello, {user.name}
                        </div>

                        {/* Dropdown menu – KHÔNG dùng mt-2 nữa */}
                        <div
                            className="absolute left-[-80px] top-full w-52 bg-white rounded-md shadow-lg
                opacity-0 invisible group-hover:visible group-hover:opacity-100
                transition duration-200 z-50"
                        >
                            {user.role === "Student" && (
                                <Link
                                    to="/my-classes"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Lớp Học Của Tôi
                                </Link>
                            )}

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Đăng Xuất
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-x-3">
                        <Link
                            to="/login"
                            className="bg-white text-[#000080] px-5 py-2 rounded-lg hover:bg-gray-200 font-medium"
                        >
                            Đăng nhập
                        </Link>
                        <Link
                            to="/register"
                            className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 font-medium"
                        >
                            Đăng ký
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
