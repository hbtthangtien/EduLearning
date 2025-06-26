import React, { useEffect, useState, useCallback } from "react";
import { fetchWithAuth, refreshAccessToken } from "../../services/api";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [instructorFilter, setInstructorFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 6;

    const fetchCourses = useCallback(async (retry = false) => {
        try {
            let token = localStorage.getItem("token");
            if (!token) {
                setMessage("❌ Bạn chưa đăng nhập.");
                return;
            }

            const res = await fetchWithAuth("/api/admin/users/course", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401 && !retry) {
                const newToken = await refreshAccessToken();
                localStorage.setItem("token", newToken);
                return fetchCourses(true); // retry
            }

            if (res.status === 403) {
                setMessage("❌ Bạn không có quyền truy cập.");
                return;
            }

            if (!res.ok) {
                setMessage(`❌ Lỗi: ${res.status}`);
                return;
            }

            const data = await res.json();
            setCourses(data);
        } catch (err) {
            console.error("❌ Lỗi gọi API:", err);
            setMessage("❌ Không thể kết nối tới máy chủ.");
        }
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const filteredCourses = courses.filter((course) => {
        const matchTitle = course.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchInstructor = instructorFilter
            ? course.tutorName === instructorFilter
            : true;
        return matchTitle && matchInstructor;
    });

    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * coursesPerPage,
        currentPage * coursesPerPage
    );

    // Lấy danh sách giảng viên duy nhất để lọc
    const instructorOptions = [...new Set(courses.map((c) => c.tutorName))];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-[#000080]">
                Quản lý Khóa học
            </h1>

            {message && (
                <p className="text-red-600 font-medium my-4">{message}</p>
            )}

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mt-6 mb-4">
                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm theo tiêu đề..."
                    className="p-2 border rounded-lg w-full md:w-1/2"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />

                <select
                    className="p-2 border rounded-lg w-full md:w-1/2"
                    value={instructorFilter}
                    onChange={(e) => {
                        setInstructorFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">📚 Tất cả giảng viên</option>
                    {instructorOptions.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Danh sách khóa học */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                {paginatedCourses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
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
                    </div>
                ))}
            </div>

            {/* Phân trang */}
            <div className="flex justify-center mt-6 gap-2">
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                >
                    ◀
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx + 1}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={`px-3 py-2 rounded ${
                            currentPage === idx + 1
                                ? "bg-[#000080] text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        {idx + 1}
                    </button>
                ))}

                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                >
                    ▶
                </button>
            </div>
        </div>
    );
};

export default Courses;
