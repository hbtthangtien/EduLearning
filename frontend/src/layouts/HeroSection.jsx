import React from "react";

const HeroSection = () => {
    return (
        <div
            className="bg-[#000080] text-white text-center py-20 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
            <h1 className="text-5xl font-bold drop-shadow-lg">
                Học Tiếng Anh Với Gia Sư Giỏi Nhất
            </h1>
            <p className="mt-4 text-lg drop-shadow-md">
                Tìm Gia Sư Phù Hợp Với Bạn Và Bắt Đầu Học Ngay Hôm Nay!
            </p>
            <button className="mt-6 bg-white text-[#000080] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                Bắt đầu ngay
            </button>
        </div>
    );
};

export default HeroSection;
