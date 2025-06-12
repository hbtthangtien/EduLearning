import React from "react";
import {
    FaChalkboardTeacher,
    FaUserGraduate,
    FaCalendarAlt,
    FaEnvelope,
    FaMoneyBillWave,
    FaStar,
} from "react-icons/fa";

const TutorDashboard = () => {
    return (
        <div className="flex-grow p-10 bg-gray-100">
            <h1 className="text-4xl font-bold text-[#000080] text-center mb-6">
                Dashboard Gia sư
            </h1>

            {/* Thống kê nhanh */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
                    <FaChalkboardTeacher className="text-[#000080] text-3xl" />
                    <div>
                        <h2 className="text-xl font-semibold">
                            Tổng số lớp học
                        </h2>
                        <p className="text-3xl font-bold text-[#000080]">5</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
                    <FaUserGraduate className="text-[#000080] text-3xl" />
                    <div>
                        <h2 className="text-xl font-semibold">Số học viên</h2>
                        <p className="text-3xl font-bold text-[#000080]">50+</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
                    <FaEnvelope className="text-red-500 text-3xl" />
                    <div>
                        <h2 className="text-xl font-semibold">
                            Tin nhắn chưa đọc
                        </h2>
                        <p className="text-3xl font-bold text-red-500">3</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
                    <FaMoneyBillWave className="text-green-500 text-3xl" />
                    <div>
                        <h2 className="text-xl font-semibold">
                            Doanh thu tháng này
                        </h2>
                        <p className="text-3xl font-bold text-green-500">
                            20,000,000 VNĐ
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
                    <FaStar className="text-yellow-500 text-3xl" />
                    <div>
                        <h2 className="text-xl font-semibold">
                            Đánh giá trung bình
                        </h2>
                        <p className="text-3xl font-bold text-yellow-500">
                            4.8 ★
                        </p>
                    </div>
                </div>
            </div>

            {/* Lịch dạy sắp tới */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                    <FaCalendarAlt /> Lịch dạy sắp tới
                </h2>
                <ul className="mt-3 list-disc list-inside text-lg">
                    <li>📅 12/06/2025 - 09:00 - 10:30 | IELTS Cấp tốc</li>
                    <li>📅 13/06/2025 - 14:00 - 15:30 | TOEIC 750+</li>
                </ul>
            </div>

            {/* Tin nhắn gần đây */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                    <FaEnvelope /> Tin nhắn gần đây
                </h2>
                <ul className="mt-3 list-disc list-inside text-lg">
                    <li>
                        📩 Nguyễn Văn A: "Em cần thêm tài liệu luyện IELTS."
                    </li>
                    <li>
                        📩 Trần Thị B: "Bài tập TOEIC hôm nay có câu này hơi
                        khó..."
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TutorDashboard;
