import React from "react";

const TutorDashboard = () => {
    return (
        <div className="flex-grow p-10 bg-gray-100">
            <h1 className="text-4xl font-bold text-[#000080] text-center mb-6">
                Dashboard Gia sư
            </h1>

            {/* Nội dung Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold">Tổng số lớp học</h2>
                    <p className="text-3xl font-bold text-[#000080]">5</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold">Số học viên</h2>
                    <p className="text-3xl font-bold text-[#000080]">50+</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold">Tin nhắn chưa đọc</h2>
                    <p className="text-3xl font-bold text-red-500">3</p>
                </div>
            </div>
        </div>
    );
};

export default TutorDashboard;
