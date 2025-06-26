import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    HomeIcon,
    UserGroupIcon,
    BookOpenIcon,
    CheckCircleIcon,
    ClipboardDocumentCheckIcon,
    // ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Quản lý Người Dùng", href: "/admin/users", icon: UserGroupIcon },
    { name: "Quản lý Lớp Học", href: "/admin/courses", icon: BookOpenIcon },
    {
        name: "Duyệt Đơn Thành Gia Sư",
        href: "/admin/approve",
        icon: CheckCircleIcon,
    },
    {
        name: "Duyệt Đơn Tạo Lớp Học",
        href: "/admin/approve/classes",
        icon: ClipboardDocumentCheckIcon,
    },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="w-64 bg-[#000080] text-white min-h-screen shadow-lg flex flex-col">
            <div className="h-16 flex items-center justify-center border-b border-blue-900 text-xl font-semibold">
                🎓 Administrator
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center px-4 py-2 rounded-lg transition text-sm font-medium ${
                                isActive
                                    ? "bg-white text-[#000080]"
                                    : "hover:bg-[#000060] text-white"
                            }`}
                        >
                            <item.icon
                                className={`w-5 h-5 mr-3 ${
                                    isActive ? "text-[#000080]" : "text-white"
                                }`}
                            />
                            {item.name}
                        </Link>
                    );
                })}

                {/* Đăng xuất
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}
                    className="flex items-center w-full px-4 py-2 mt-4 text-sm font-medium text-red-200 hover:text-white hover:bg-red-500 rounded-lg transition"
                >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                    Đăng Xuất
                </button> */}
            </nav>
        </div>
    );
};

export default Sidebar;
