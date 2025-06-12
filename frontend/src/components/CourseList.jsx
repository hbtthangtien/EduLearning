import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assest/3.jpg"; // 📂 Đảm bảo đường dẫn đúng

const coursesData = [
    {
        id: 1,
        title: "IELTS Cấp tốc",
        instructor: "Nguyễn Văn A",
        students: 50,
        description: "Luyện thi IELTS cấp tốc với lộ trình chuẩn.",
    },
    {
        id: 2,
        title: "TOEIC 750+",
        instructor: "Trần Thị B",
        students: 30,
        description: "Khóa học giúp bạn đạt tối thiểu 750+ TOEIC.",
    },
    {
        id: 3,
        title: "Giao tiếp Tiếng Anh",
        instructor: "Lê Văn C",
        students: 75,
        description: "Rèn luyện kỹ năng giao tiếp tiếng Anh tự tin.",
    },
    {
        id: 4,
        title: "Ngữ pháp nâng cao",
        instructor: "Hoàng Gia D",
        students: 40,
        description: "Học ngữ pháp tiếng Anh chuyên sâu dễ hiểu.",
    },
];

const CourseList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const coursesPerPage = 4;
    const totalPages = Math.ceil(coursesData.length / coursesPerPage);

    const lastIndex = currentPage * coursesPerPage;
    const firstIndex = lastIndex - coursesPerPage;
    const filteredCourses = selectedInstructor
        ? coursesData.filter(
              (course) => course.instructor === selectedInstructor
          )
        : coursesData;
    const currentCourses = filteredCourses.slice(firstIndex, lastIndex);

    return (
        <div
            className="flex min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* 🏆 Sidebar */}
            <aside className="w-1/6 bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-[#000080]">
                    🔎 Lọc Khóa Học
                </h2>

                {/* Bộ lọc theo giảng viên */}
                <div className="mt-4">
                    <h3 className="font-semibold">Theo Giảng Viên:</h3>
                    <select
                        className="w-full p-2 border rounded-lg mt-2"
                        onChange={(e) => setSelectedInstructor(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        <option value="Nguyễn Văn A">Nguyễn Văn A</option>
                        <option value="Trần Thị B">Trần Thị B</option>
                        <option value="Lê Văn C">Lê Văn C</option>
                        <option value="Hoàng Gia D">Hoàng Gia D</option>
                    </select>
                </div>
            </aside>

            {/* 🏆 Danh sách khóa học */}
            <div className="w-5/6 p-10 flex flex-col">
                <h1 className="text-3xl font-bold text-[#000080] text-center">
                    Danh sách Lớp học
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {currentCourses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg"
                        >
                            <h2 className="text-xl font-semibold">
                                {course.title}
                            </h2>
                            <p className="text-gray-600">
                                Giảng viên: {course.instructor}
                            </p>
                            <p className="text-gray-600">
                                Học viên: {course.students}
                            </p>
                            <p className="text-[#000080] font-medium">
                                {course.description}
                            </p>

                            <Link
                                to={`/course-detail/${course.id}`}
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
        </div>
    );
};

export default CourseList;
