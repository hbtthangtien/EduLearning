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

    // 👇 Lấy thông tin user từ localStorage sau khi login
    const student = {
        id: Number(localStorage.getItem("id")),
        name: localStorage.getItem("name") || "Học viên",
    };

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(
                    `https://localhost:7211/api/courses/${id}`
                );
                if (!res.ok) throw new Error(`Lỗi ${res.status}`);
                const data = await res.json();
                setCourse(data);
            } catch (err) {
                setError(err.message);
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

    return (
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
                            Giảng viên: {course.tutorBio.fullName}
                        </p>
                        <p className="text-gray-700 mt-1">
                            {course.tutorBio.introduces}
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
                        <span>Số chương: {course.courseContents.length}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-semibold flex items-center gap-2">
                        <FaPlayCircle /> Nội dung khóa học
                    </h3>
                    <ul className="mt-3 list-disc list-inside space-y-1 text-lg">
                        {course.courseContents.slice(0, 10).map((item, idx) => (
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
                        onClick={() => setShowChat(!showChat)}
                        className="bg-[#000080] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#000060] transition"
                    >
                        💬 {showChat ? "Đóng chat" : "Nhắn với gia sư"}
                    </button>
                </div>

                {showChat && (
                    <div className="fixed bottom-4 right-4 w-[350px] max-h-[500px] z-50 shadow-lg">
                        <div className="bg-white rounded-lg border overflow-hidden">
                            <div className="bg-[#000080] text-white px-4 py-2 font-semibold flex justify-between items-center">
                                <span>Chat với {course.tutorBio.fullName}</span>
                                <button onClick={() => setShowChat(false)}>
                                    ✖
                                </button>
                            </div>
                            <ChatBox
                                user={student}
                                partner={{
                                    id:
                                        course.tutorBio.userId ||
                                        course.tutorBio.id,
                                    name: course.tutorBio.fullName,
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDetail;
