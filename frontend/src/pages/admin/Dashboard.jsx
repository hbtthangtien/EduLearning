import React, { useEffect, useState } from "react";
import { refreshAccessToken } from "../../services/api";

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

                const res = await fetch(
                    "https://localhost:7211/api/admin/users/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

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
        <div className="p-6 bg-gray-100 min-h-screen">
            {message && (
                <p className="text-center text-red-600 font-medium mb-4">
                    {message}
                </p>
            )}

            {/* Thống kê nhanh */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold text-[#000080]">
                        Tổng Số Người Dùng
                    </h2>
                    <p className="text-gray-600 text-3xl font-bold">
                        {stats.totalUsers}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold text-[#000080]">
                        Tổng số Lớp Học
                    </h2>
                    <p className="text-gray-600 text-3xl font-bold">
                        {stats.totalCourses}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold text-[#000080]">
                        Doanh Thu Tháng này
                    </h2>
                    <p className="text-gray-600 text-3xl font-bold">
                        {stats.monthlyRevenue.toLocaleString()} VND
                    </p>
                </div>
            </div>

            {/* Danh sách khóa học */}
            <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
                <h2 className="text-xl font-semibold text-[#000080] text-center">
                    Lớp Học Mới đăng ký
                </h2>
                <table className="w-full mt-4 border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#000080] text-white">
                            <th className="p-3 border">Lớp Học</th>
                            <th className="p-3 border">Gia Sư</th>
                            <th className="p-3 border">Học Viên</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.recentCourses.map((course, index) => (
                            <tr
                                key={index}
                                className="bg-white hover:bg-gray-100"
                            >
                                <td className="p-3 border">{course.title}</td>
                                <td className="p-3 border">
                                    {course.tutorName}
                                </td>
                                <td className="p-3 border">
                                    {course.studentCount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
