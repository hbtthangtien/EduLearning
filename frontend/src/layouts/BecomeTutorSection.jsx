import React from "react";
import { Link } from "react-router-dom";
import logotutor from "../assest/tutor.jpg";
const BecomeTutorSection = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#000080] text-white py-20 px-6 rounded-lg shadow-lg">
            {/* Ảnh gia sư - Bên trái */}
            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src={logotutor}
                    alt="Gia sư chuyên nghiệp"
                    className="w-80 h-80 rounded-lg shadow-lg object-cover"
                />
            </div>

            {/* Nội dung đăng ký - Bên phải */}
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-4xl font-bold">
                    Trở Thành Gia Sư Cùng Chúng Tôi
                </h2>
                <p className="mt-4 text-lg max-w-xl">
                    Bạn yêu thích giảng dạy và muốn giúp học viên đạt được mục
                    tiêu học tập? Hãy tham gia đội ngũ gia sư của chúng tôi và
                    chia sẻ kiến thức tuyệt vời của bạn!
                </p>

                {/* Link đăng ký trở thành Tutor */}
                <Link
                    to="/becometutor"
                    className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition inline-block"
                >
                    Đăng ký ngay
                </Link>
            </div>
        </div>
    );
};

export default BecomeTutorSection;
