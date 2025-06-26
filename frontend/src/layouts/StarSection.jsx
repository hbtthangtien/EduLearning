import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/api";

const StarSection = () => {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetchWithAuth("/api/home");
                if (!res.ok) throw new Error(`Lỗi ${res.status}`);
                const data = await res.json();
                setStats(data.stats);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchStats();
    }, []);

    if (error) return <div className="text-center text-red-600">{error}</div>;

    if (!stats)
        return (
            <div className="text-center text-gray-500">Đang tải thống kê…</div>
        );

    const mappedStats = [
        { number: stats.totalStudents, label: "Học Viên Trong Trung Tâm" },
        { number: stats.totalTutors, label: "Gia Sư Trung Tâm" },
        { number: stats.totalCourses, label: "Lớp Học Hiện Có" },
        { number: `${stats.averageRating} ★★★★★`, label: "Đánh Giá Hài Lòng" },
    ];

    return (
        <div className="bg-gray-100 py-20 px-6 text-center rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {mappedStats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md"
                    >
                        <h3 className="text-3xl font-bold text-[#000080]">
                            {stat.number}
                        </h3>
                        <p className="text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StarSection;
