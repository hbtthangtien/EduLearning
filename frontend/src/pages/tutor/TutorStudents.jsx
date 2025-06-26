import React, { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { useUserId } from "../../hooks/useUserId";

const TutorStudents = () => {
    const { id } = useUserId();
    const [students, setStudents] = useState([]);
    const [dashLoading, setDashLoading] = useState(true);
    const [dashError, setDashError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        if (!id) return;
        const fetchStudents = async () => {
            try {
                const res = await fetch(
                    `https://localhost:7211/api/tutors/${id}/courses/students`
                );
                if (!res.ok) throw new Error(`Lỗi ${res.message}`);
                const { data } = await res.json();
                setStudents(data);
            } catch (err) {
                setDashError(err.message);
            } finally {
                setDashLoading(false);
            }
        };
        fetchStudents();
    }, [id]);

    if (dashLoading) {
        return (
            <div className="text-blue-700 text-center mt-20 font-semibold text-xl animate-pulse">
                Đang thống kê dữ liệu...
            </div>
        );
    }

    if (dashError) {
        return (
            <div className="text-red-600 text-center mt-20 text-lg">
                Có lỗi xảy ra: {dashError}
            </div>
        );
    }

    const totalPages = Math.ceil(students.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentStudent = students.slice(indexOfFirst, indexOfLast);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handleBack = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-[#e3eeff] to-[#faf0ff] p-0 md:p-10">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-10 justify-center">
                    <FaUserGraduate className="text-4xl text-[#5b2cff] drop-shadow" />
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#5b2cff] via-[#d13d76] to-[#fea3c3] drop-shadow">
                        Danh sách học viên
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentStudent.map((student) => (
                        <div
                            key={student.id}
                            className="bg-white p-6 rounded-2xl shadow-xl border border-[#f5e6ff] flex items-center gap-5 hover:scale-[1.03] transition-all duration-300"
                        >
                            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#d13d76] to-[#fea3c3] flex items-center justify-center shadow">
                                <FaUserGraduate className="text-white text-3xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#000080]">
                                    {student.studentName}
                                </h2>
                                <p className="text-[#d13d76] font-medium mt-1">
                                    Lớp học: <span className="font-bold">{student.titleCourse}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-12 gap-2">
                    <button
                        onClick={handleBack}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-full transition text-lg shadow ${
                            currentPage === 1
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-[#5b2cff] to-[#fea3c3] text-white hover:from-[#d13d76] hover:to-[#fea3c3]"
                        }`}
                    >
                        {"<"}
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-full text-lg font-semibold shadow ${
                                currentPage === i + 1
                                    ? "bg-gradient-to-br from-[#fea3c3] to-[#5b2cff] text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-full transition text-lg shadow ${
                            currentPage === totalPages
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-[#5b2cff] to-[#fea3c3] text-white hover:from-[#d13d76] hover:to-[#fea3c3]"
                        }`}
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorStudents;
