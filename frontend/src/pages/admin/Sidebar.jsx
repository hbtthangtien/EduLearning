import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 bg-[#000080] text-white min-h-screen p-6">
            <nav className="mt-6 space-y-4">
                <Link
                    to="/admin"
                    className="block py-2 px-4 rounded-lg hover:bg-[#000060]"
                >
                    Dashboard
                </Link>
                <Link
                    to="/admin/users"
                    className="block py-2 px-4 rounded-lg hover:bg-[#000060]"
                >
                    Quản lý Người Dùng
                </Link>
                <Link
                    to="/admin/courses"
                    className="block py-2 px-4 rounded-lg hover:bg-[#000060]"
                >
                    Quản lý Lớp Học
                </Link>

                <Link
                    to="/admin/approve"
                    className="block py-2 px-4 rounded-lg hover:bg-[#000060]"
                >
                    Duyệt Đơn Lớp Học
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
