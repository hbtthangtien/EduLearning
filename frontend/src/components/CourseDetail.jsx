import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
    FaChalkboardTeacher,
    FaBookOpen,
    FaClock,
    FaDollarSign,
    FaPlayCircle,
} from "react-icons/fa";
import backgroundImage from "../assest/6.jpg";
import ChatBox from "../components/ChatBox";
const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                if (parsedUser?.id && parsedUser?.name) {
                    setStudent(parsedUser);
                    console.log(
                        "✅ Student loaded from localStorage:",
                        parsedUser
                    );
                } else {
                    console.warn("⚠️ User object thiếu id hoặc name.");
                }
            } catch (err) {
                console.error("❌ Lỗi khi parse user từ localStorage:", err);
            }
        } else {
            console.warn("⚠️ Không tìm thấy user trong localStorage.");
        }
    }, []);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(
                    `https://edusyncc-f8atbbd5ene8a3c9.canadacentral-01.azurewebsites.net/api/courses/${id}`
                );
                if (!res.ok) throw new Error(`Lỗi ${res.status}`);
                const data = await res.json();
                setCourse(data);
                console.log("✅ Course loaded:", data);
            } catch (err) {
                setError(err.message);
                console.error("❌ Lỗi khi fetch khóa học:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <div className="text-white text-center mt-20">
                Đang tải khóa học…
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center mt-20">
                Có lỗi xảy ra: {error}
            </div>
        );
    }

    const tutorId = course?.tutorId;
    // const tutorId = tutor?.userId || tutor?.user?.id || tutor?.id || undefined;
    console.log("🧪 tutorBio:", course?.tutorId);
    // console.log("🧪 tutorBio:", tutor);
    console.log("📌 Debug:", {
        showChat,
        student,
        // tutor,
        tutorId,
    });

    return (
        <>
            <div
                className="text-white min-h-screen flex flex-col items-center py-12 px-6 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <h1 className="text-5xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg max-w-2xl text-center mb-8">
                    {course.description}
                </p>

                <div className="bg-white bg-opacity-80 text-[#000080] p-8 rounded-lg shadow-lg max-w-4xl w-full">
                    <div className="mb-6 flex items-center gap-6">
                        <FaChalkboardTeacher className="text-4xl" />
                        <div>
                            <p className="text-xl font-semibold">
                                Giảng viên: {tutorId?.fullName || "Không rõ"}
                            </p>
                            <p className="text-gray-700 mt-1">
                                {tutorId?.introduces}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="flex items-center gap-3">
                            <FaClock />
                            <span>
                                Buổi thử nghiệm:{" "}
                                {course.isTrialAvailable
                                    ? `${course.trialSessions} buổi`
                                    : "Không có"}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaDollarSign />
                            <span>Giá/buổi: ${course.pricePerSession}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaBookOpen />
                            <span>
                                Số chương: {course.courseContents.length}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold flex items-center gap-2">
                            <FaPlayCircle /> Nội Dung Lớp Học
                        </h3>
                        <ul className="mt-3 list-disc list-inside space-y-1 text-lg">
                            {course.courseContents
                                .slice(0, 10)
                                .map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                        </ul>
                    </div>

                    <div className="flex justify-center gap-4 mt-6">
                        <Link
                            to={`/enroll/${id}`}
                            className="bg-yellow-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition"
                        >
                            📢 Đăng ký ngay
                        </Link>
                        <button
                            onClick={() => setShowChat(true)}
                            className="bg-[#000080] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#000060] transition"
                        >
                            💬 Nhắn với gia sư
                        </button>
                    </div>
                </div>

                {showChat && student?.id && tutorId && (
                    <div className="fixed bottom-4 right-4 w-[350px] shadow-lg z-50">
                        <div className="bg-white rounded-t-lg p-2 border-b flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-[#000080]">
                                Chat với {tutorId?.fullName || "Gia sư"}
                            </h3>
                            <button
                                onClick={() => setShowChat(false)}
                                className="text-gray-500 hover:text-red-600 text-xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                        <div className="bg-white rounded-b-lg border border-t-0 h-[400px] overflow-hidden">
                            <ChatBox
                                user={student}
                                partner={{
                                    id: tutorId,
                                    name:
                                        course?.tutorBio?.fullName || "Gia sư",
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CourseDetail;
