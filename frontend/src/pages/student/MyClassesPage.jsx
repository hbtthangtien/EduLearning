import React, { useEffect, useState } from "react";
import { BookOpenIcon, UserIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import RateTutorPopup from "../../components/RateTutorPopUp";
import { useNavigate } from "react-router-dom";
const MyClassesPage = () => {
    const { user } = useAuth();
    const [myClasses, setMyClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showRating, setShowRating] = useState(false);
    const [selectedTutorId, setSelectedTutorId] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchRegisteredCourses = async () => {
            try {
                const res = await axios.get(
                    "https://edusyncc-f8atbbd5ene8a3c9.canadacentral-01.azurewebsites.net/api/student/registered-courses",
                    {
                        headers: {
                            Authorization: `Bearer ${user?.token}`,
                        },
                    }
                );
                setMyClasses(res.data);
            } catch (err) {
                console.error("Lỗi khi tải lớp học:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.role === "Student") {
            fetchRegisteredCourses();
        }
    }, [user]);

    const getStatusClass = (status) => {
        switch (status) {
            case "Đang học":
                return "bg-green-100 text-green-700";
            case "Hoàn thành":
                return "bg-gray-200 text-gray-700";
            case "Sắp diễn ra":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-500";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-28 px-4 md:px-12">
            <h2 className="text-4xl font-bold text-center text-[#000080] mb-12 drop-shadow-md">
                Lớp Học Của Tôi
            </h2>

            {loading ? (
                <p className="text-center text-gray-600">Đang tải lớp học...</p>
            ) : myClasses.length === 0 ? (
                <p className="text-center text-gray-600">
                    Bạn chưa đăng ký lớp học nào.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myClasses.map((cls, index) => (
                        <div
                            key={cls.id || index}
                            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <BookOpenIcon className="w-6 h-6 text-[#000080]" />
                                <h3 className="text-xl font-semibold text-[#000080]">
                                    {cls.title || "Tên lớp học"}
                                </h3>
                            </div>

                            <p className="text-gray-600 mb-4">
                                <span className="font-medium">Nội Dung:</span>{" "}
                                {cls.description || "Không có mô tả"}
                            </p>

                            <div className="text-sm text-gray-600 space-y-2 mb-4">
                                <p className="flex items-center gap-2">
                                    <UserIcon className="w-4 h-4" />
                                    <span className="font-medium">
                                        Giáo viên:
                                    </span>{" "}
                                    {cls.tutorName || "Chưa rõ"}
                                </p>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <span
                                    className={`px-3 py-1 rounded-full bg-green-500 text-white text-sm font-medium ${getStatusClass(
                                        cls.status
                                    )}`}
                                >
                                    {cls.status || "Chưa rõ"}
                                </span>
                                <button
                                    className="text-sm text-blue-600 hover:underline font-medium"
                                    onClick={() =>
                                        navigate(`/classes/${cls.courseId}`)
                                    }
                                >
                                    Xem chi tiết
                                </button>
                            </div>

                            {!cls.isRated && <div className="mt-4">
                                <button
                                    onClick={() => {
                                        setSelectedTutorId(cls.tutorId);
                                        setShowRating(true);
                                    }}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                                >
                                    Đánh giá giáo viên
                                </button>
                            </div>}
                        </div>
                    ))}
                </div>
            )}

            <RateTutorPopup
                isOpen={showRating}
                onClose={() => {
                    setShowRating(false);
                    setSelectedTutorId(null);
                }}
                tutorId={selectedTutorId}
            />
        </div>
    );
};

export default MyClassesPage;
