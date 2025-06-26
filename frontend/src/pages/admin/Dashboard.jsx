import React, { useEffect, useState } from "react";
import { fetchWithAuth, refreshAccessToken } from "../../services/api";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCourses: 0,
        monthlyRevenue: 0,
        recentCourses: [],
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchDashboard = async (retry = false) => {
            try {
                let token = localStorage.getItem("token");
                if (!token) {
                    setMessage("❌ Bạn chưa đăng nhập.");
                    return;
                }

                const res = await fetchWithAuth("/api/admin/users/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 401 && !retry) {
                    const newToken = await refreshAccessToken();
                    localStorage.setItem("token", newToken);
                    return fetchDashboard(true);
                }

                if (res.status === 403) {
                    setMessage("❌ Bạn không có quyền truy cập.");
                    return;
                }

                if (!res.ok) {
                    setMessage(`❌ Lỗi: ${res.status}`);
                    return;
                }

                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("❌ Lỗi API:", err);
                setMessage("❌ Không thể kết nối máy chủ.");
            }
        };

        fetchDashboard();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-bold text-center text-[#000080] mb-10">
                📊 Quản Lý Hệ Thống
            </h2>

            {message && (
                <p className="text-center text-red-600 font-medium mb-6">
                    {message}
                </p>
            )}

            {/* Thống kê nhanh */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow text-center">
                    <h5 className="text-sm text-gray-500 font-semibold uppercase">
                        Tổng người dùng
                    </h5>
                    <h3 className="text-3xl font-bold text-blue-700 mt-2">
                        {stats.totalUsers}
                    </h3>
                </div>

                <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow text-center">
                    <h5 className="text-sm text-green-700 font-semibold uppercase">
                        Tổng lớp học
                    </h5>
                    <h3 className="text-3xl font-bold text-green-700 mt-2">
                        {stats.totalCourses}
                    </h3>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl shadow text-center">
                    <h5 className="text-sm text-yellow-700 font-semibold uppercase">
                        Doanh thu tháng
                    </h5>
                    <h3 className="text-3xl font-bold text-yellow-700 mt-2">
                        {stats.monthlyRevenue.toLocaleString()} VND
                    </h3>
                </div>
            </div>

            {/* Lớp học mới đăng ký */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-[#000080] text-center mb-6">
                    📝 Lớp Học Mới Đăng Ký
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.recentCourses.length > 0 ? (
                        stats.recentCourses.slice(0, 3).map((course, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-100 rounded-xl shadow hover:shadow-md transition overflow-hidden"
                            >
                                <div className="p-5">
                                    <h4 className="font-bold text-lg text-indigo-700 mb-1">
                                        {course.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        👨‍🏫 <strong>Gia sư:</strong>{" "}
                                        {course.tutorName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        👥 <strong>Số học viên:</strong>{" "}
                                        {course.studentCount}
                                    </p>
                                </div>
                                <div className="bg-gray-100 text-right px-5 py-2 text-sm text-gray-500">
                                    #{index + 1}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-gray-500">
                            Không có lớp học nào gần đây.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
