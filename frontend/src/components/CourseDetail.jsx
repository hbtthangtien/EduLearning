import React from "react";
import {
    FaChalkboardTeacher,
    FaBookOpen,
    FaGraduationCap,
    FaClock,
} from "react-icons/fa"; // Import icon từ react-icons

const CourseDetail = () => {
    return (
        <div className="bg-[#000080] text-white min-h-screen flex flex-col items-center py-12 px-6">
            {/* Tiêu đề khóa học */}
            <h1 className="text-5xl font-bold mb-6">Chi tiết khóa học</h1>

            {/* Nội dung khóa học */}
            <div className="bg-white text-[#000080] p-6 rounded-lg shadow-lg max-w-4xl w-full">
                <h2 className="text-3xl font-semibold flex items-center gap-3">
                    <FaGraduationCap /> IELTS Cấp tốc 7.5+
                </h2>
                <p className="mt-2 text-lg flex items-center gap-3">
                    <FaClock /> Luyện thi IELTS cấp tốc với lộ trình tối ưu giúp
                    bạn đạt 7.5+ nhanh chóng.
                </p>

                {/* Thông tin giảng viên */}
                <div className="mt-6 flex items-center gap-6">
                    <img
                        src="/assets/instructor.png"
                        alt="Giảng viên"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-lg font-semibold flex items-center gap-2">
                            <FaChalkboardTeacher /> Giảng viên: Nguyễn Văn A
                        </p>
                        <p className="text-gray-600">
                            Kinh nghiệm 5 năm giảng dạy IELTS
                        </p>
                    </div>
                </div>

                {/* Nội dung khóa học */}
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold flex items-center gap-3">
                        <FaBookOpen /> Nội dung khóa học
                    </h3>
                    <ul className="mt-3 list-disc list-inside text-lg">
                        <li>Kỹ năng Nghe, Nói, Đọc, Viết</li>
                        <li>Chiến lược làm bài IELTS hiệu quả</li>
                        <li>Ôn tập đề thi mới nhất</li>
                        <li>Phân tích bài mẫu & luyện tập thực tế</li>
                    </ul>
                </div>

                {/* Đăng ký học */}
                <div className="mt-6 text-center">
                    <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition flex items-center gap-3">
                        📢 Đăng ký ngay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
