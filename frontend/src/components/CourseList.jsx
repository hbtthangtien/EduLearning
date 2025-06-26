import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assest/3.jpg";
import ChatboxWidget from "../components/ChatboxWidget";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const coursesPerPage = 4;

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch("http://edusync.somee.com/api/courses");
                const data = await res.json();
                setCourses(data);
            } catch (err) {
                console.error("❌ Lỗi khi tải courses:", err);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = selectedInstructor
        ? courses.filter((course) => course.tutorName === selectedInstructor)
        : courses;

    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    const firstIndex = (currentPage - 1) * coursesPerPage;
    const currentCourses = filteredCourses.slice(
        firstIndex,
        firstIndex + coursesPerPage
    );

    const uniqueTutors = [...new Set(courses.map((c) => c.tutorName))];

    return (
        <>
            <div
                className="flex min-h-screen bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                {/* Sidebar lọc */}
                <aside className="w-1/6 bg-white p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-[#000080]">
                        🔎 Lọc Khóa Học
                    </h2>
                    <div className="mt-4">
                        <h3 className="font-semibold">Theo Giảng Viên:</h3>
                        <select
                            className="w-full p-2 border rounded-lg mt-2"
                            value={selectedInstructor}
                            onChange={(e) => {
                                setCurrentPage(1);
                                setSelectedInstructor(e.target.value);
                            }}
                        >
                            <option value="">Tất cả</option>
                            {uniqueTutors.map((tutor, index) => (
                                <option key={index} value={tutor}>
                                    {tutor}
                                </option>
                            ))}
                        </select>
                    </div>
                </aside>

                {/* Danh sách khóa học */}
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
                                    Giảng viên: {course.tutorName}
                                </p>
                                <p className="text-gray-600">
                                    Học viên: {course.studentCount}
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
                            onClick={() => setCurrentPage((prev) => prev - 1)}
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
                                key={index}
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
                            onClick={() => setCurrentPage((prev) => prev + 1)}
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

            {/* Chatbox hiển thị cố định */}
            <ChatboxWidget />
        </>
    );
};

export default CourseList;
