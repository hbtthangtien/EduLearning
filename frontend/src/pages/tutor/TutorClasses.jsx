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
    return (
        <div className="p-10 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-[#000080] text-center mb-6">
                Lớp học của tôi
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentCourses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4"
                    >
                        <FaChalkboardTeacher className="text-[#000080] text-4xl" />
                        <div>
                            <h2 className="text-xl font-semibold">
                                {course.title}
                            </h2>
                            <p className="text-gray-600">
                                Học viên: {course.numberOfStudent}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 👇 Nút chuyển trang */}
            <div className="flex justify-center items-center mt-8 gap-2">
                <button
                    onClick={handleBack}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                        currentPage === 1
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
                        className={`px-4 py-2 rounded ${
                            currentPage === i + 1
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
                    className={`px-4 py-2 rounded ${
                        currentPage === totalPages
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
