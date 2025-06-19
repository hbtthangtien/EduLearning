import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assest/logoedusync.png";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
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
            <div className="space-x-3">
                {token ? (
                    <>
                        <span className="text-white font-medium">
                            Hello, {name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
