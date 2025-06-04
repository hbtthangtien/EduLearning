import React from "react";

const StarSection = () => {
    const stats = [
        { number: "36,000+", label: "Học Viên Trong Trung Tâm" },
        { number: "3,600", label: "Gia Sư Trung Tâm" },
        { number: "120+", label: "Lớp Học Hiện Có" },
        { number: "4.8 ★★★★★", label: "Đánh Giá Hài Lòng" },
    ];

    return (
        <div className="bg-gray-100 py-20 px-6 text-center rounded-lg shadow-lg">
            {/* Thống kê */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
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
