import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserGraduate, FaStar, FaBookOpen } from "react-icons/fa";

const tutorsData = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        age: 30,
        bio: "Gia sư IELTS với 5 năm kinh nghiệm.",
        specialty: "IELTS",
        rating: 4.9,
    },
    {
        id: 2,
        name: "Trần Thị B",
        age: 28,
        bio: "Chuyên gia luyện TOEIC cấp tốc.",
        specialty: "TOEIC",
        rating: 4.8,
    },
    {
        id: 3,
        name: "Lê Văn C",
        age: 35,
        bio: "Giảng viên tiếng Anh giao tiếp.",
        specialty: "Giao tiếp tiếng Anh",
        rating: 4.7,
    },
    {
        id: 4,
        name: "Hoàng Gia D",
        age: 40,
        bio: "Chuyên sâu về ngữ pháp tiếng Anh.",
        specialty: "Ngữ pháp",
        rating: 4.8,
    },
];

const TutorList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const tutorsPerPage = 4;
    const totalPages = Math.ceil(tutorsData.length / tutorsPerPage);

    const lastIndex = currentPage * tutorsPerPage;
    const firstIndex = lastIndex - tutorsPerPage;
    const currentTutors = tutorsData.slice(firstIndex, lastIndex);

    return (
        <div className="p-10 min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold text-[#000080] text-center mb-6">
                Danh sách Gia sư
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTutors.map((tutor) => (
                    <div
                        key={tutor.id}
                        className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
                    >
                        <FaUserGraduate className="text-[#000080] text-6xl mb-3" />
                        <h2 className="text-2xl font-semibold">{tutor.name}</h2>
                        <p className="text-gray-600">Tuổi: {tutor.age}</p>
                        <p className="text-gray-600">{tutor.bio}</p>
                        <p className="text-[#000080] font-medium flex items-center gap-2">
                            <FaBookOpen /> {tutor.specialty}
                        </p>
                        <p className="text-yellow-500 flex items-center gap-2">
                            <FaStar /> {tutor.rating} ★
                        </p>

                        {/* Nút xem chi tiết */}
                        <Link
                            to={`/tutor-detail/${tutor.id}`}
                            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition inline-block"
                        >
                            Xem chi tiết
                        </Link>
                    </div>
                ))}
            </div>

            {/* Phân trang */}
            <div className="flex justify-center mt-6 space-x-3">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-lg ${
                        currentPage === 1
                            ? "bg-gray-300"
                            : "bg-[#000080] text-white hover:bg-[#000060] transition"
                    }`}
                >
                    ◀
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 rounded-lg ${
                            currentPage === index + 1
                                ? "bg-[#000080] text-white"
                                : "bg-gray-200 hover:bg-gray-300 transition"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-lg ${
                        currentPage === totalPages
                            ? "bg-gray-300"
                            : "bg-[#000080] text-white hover:bg-[#000060] transition"
                    }`}
                >
                    ▶
                </button>
            </div>
        </div>
    );
};

export default TutorList;
