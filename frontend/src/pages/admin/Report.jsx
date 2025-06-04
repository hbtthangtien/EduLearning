import React from "react";

const Report = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-[#000080]">
                Thống kê & Báo cáo
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">Tổng Số Học Viên</h2>
                    <p className="text-gray-600">1500 học viên đã đăng ký.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">
                        Doanh Thu Tháng Này
                    </h2>
                    <p className="text-gray-600">75,000,000 VND</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold">
                        Lớp Học Phổ Biến Nhất
                    </h2>
                    <p className="text-gray-600">
                        IELTS Cấp tốc - 200 Học Viên
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Report;
