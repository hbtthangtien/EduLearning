import React from "react";

const Dashboard = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Thống kê nhanh */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold text-[#000080]">
                        Tổng Số Người Dùng
                    </h2>
                    <p className="text-gray-600 text-3xl font-bold">120</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold text-[#000080]">
                        Tổng số Lớp Học
                    </h2>
                    <p className="text-gray-600 text-3xl font-bold">15</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-semibold text-[#000080]">
                        Doanh Thu Tháng này
                    </h2>
                    <p className="text-gray-600 text-3xl font-bold">
                        75,000,000 VND
                    </p>
                </div>
            </div>

            {/* Biểu đồ doanh thu */}
            <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
                <h2 className="text-xl font-semibold text-[#000080] text-center">
                    Doanh thu theo tháng
                </h2>
                <img
                    src="/assets/revenue-chart.png"
                    alt="Biểu đồ doanh thu"
                    className="w-full h-64 mt-4 rounded-lg"
                />
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
                        <tr className="bg-white hover:bg-gray-100">
                            <td className="p-3 border">IELTS Cấp tốc</td>
                            <td className="p-3 border">Bùi Xuân Huấn</td>
                            <td className="p-3 border">50</td>
                        </tr>
                        <tr className="bg-white hover:bg-gray-100">
                            <td className="p-3 border">TOEIC 750+</td>
                            <td className="p-3 border">Đoàn Di Băng</td>
                            <td className="p-3 border">30</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
