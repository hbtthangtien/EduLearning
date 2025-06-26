import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useUserId } from "../../hooks/useUserId";
import { fetchWithAuth } from "../../services/api";
const classesData = [
    { id: 1, title: "IELTS Cấp tốc", students: 30 },
    { id: 2, title: "TOEIC 750+", students: 25 },
];

const TutorClasses = () => {
    const [courses, setCourses] = useState([]);
    const [dashLoading, setDashLoading] = useState(true);
    const [dashError, setDashError] = useState("");
    const { id, loading, error } = useUserId();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        if (!id) return;
        const fetchTutorCourses = async () => {
            try {
                const res = await fetchWithAuth(`/api/tutors/${id}/courses`);
                if (!res.ok) throw new Error(`Lỗi ${res.message}`);
                const { data } = await res.json();
                setCourses(data);
            } catch (err) {
                setDashError(err.message);
            } finally {
                setDashLoading(false);
            }
        };
        fetchTutorCourses();
    }, [id]);
    if (dashLoading) {
        return (
            <div className="text-white text-center mt-20">
                Đang thống kê dữ liệu....
            </div>
        );
    }

    if (dashError) {
        return (
            <div className="text-red-600 text-center mt-20">
                Có lỗi xảy ra: {dashError}
            </div>
        );
    }
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handleBack = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentCourses = courses.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    function getCourseStatusLabel(status) {
        switch (status) {
            case 0: return "Nháp";
            case 1: return "Chờ duyệt";
            case 2: return "Đã duyệt";
            case 3: return "Từ chối";
            case 4: return "Đã xuất bản";
            case 5: return "Lưu trữ";
            default: return status;
        }
    }
    const statusMap = {
        0: { label: "Nháp", color: "bg-gray-300 text-gray-700", icon: "📝" },
        1: { label: "Chờ duyệt", color: "bg-yellow-200 text-yellow-800", icon: "⏳" },
        2: { label: "Đã duyệt", color: "bg-blue-200 text-blue-700", icon: "✔️" },
        3: { label: "Từ chối", color: "bg-red-200 text-red-700", icon: "❌" },
        4: { label: "Đã xuất bản", color: "bg-green-200 text-green-700", icon: "🚀" },
        5: { label: "Lưu trữ", color: "bg-purple-200 text-purple-700", icon: "📦" },
    };
    return (
        <div className="p-10 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-[#000080] text-center mb-6">
                Lớp học của tôi
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentCourses.map((course) => {
                    const status = statusMap[course.status] || {
                        label: course.status,
                        color: "bg-gray-100 text-gray-700",
                        icon: "❓"
                    };
                    return (
                        <div
                            key={course.id}
                            className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 transition-transform hover:scale-105 duration-200"
                        >
                            <FaChalkboardTeacher className="text-[#000080] text-4xl" />
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">{course.title}</h2>
                                <p className="text-gray-600">
                                    Học viên: {course.numberOfStudent}
                                </p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span
                                        className={
                                            `inline-flex items-center gap-1 px-3 py-1 rounded-full font-medium text-sm shadow-sm ${status.color} animate-fadeIn`
                                        }
                                        title={status.label}
                                    >
                                        <span>{status.icon}</span>
                                        {status.label}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>


            {/* 👇 Nút chuyển trang */}
            <div className="flex justify-center items-center mt-8 gap-2">
                <button
                    onClick={handleBack}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${currentPage === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                >
                    Back
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded ${currentPage === i + 1
                            ? "bg-blue-700 text-white"
                            : "bg-gray-300 text-black"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TutorClasses;
