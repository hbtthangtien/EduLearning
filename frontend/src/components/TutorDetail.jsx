import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../assest/5.jpg";
import ChatBox from "../components/ChatBox";
import { fetchWithAuth } from "../services/api";
import ChatbotWidget from "../components/ChatboxWidget";
const TutorDetail = () => {
    const { id } = useParams();
    const [tutor, setTutor] = useState(null);
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
                }
            } catch (err) {
                console.error("Lỗi khi parse user từ localStorage:", err);
            }
        }
    }, []);

    useEffect(() => {
        const fetchTutor = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetchWithAuth(`/api/tutors/${id}/bio`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Không thể tải thông tin gia sư.");
                const data = await res.json();
                setTutor(data);
            } catch (err) {
                setError(err.message);
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
            } finally {
                setLoading(false);
            }
        };

        fetchTutor();
    }, [id]);

    const tutorData = tutor?.data || {};

    return (
        <>
            <div
                className="p-10 min-h-screen flex flex-col items-center bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <h1 className="text-4xl font-bold text-[#000080]">
                    Chi tiết Gia sư
                </h1>

                {loading ? (
                    <p className="mt-6 text-gray-600">Đang tải thông tin...</p>
                ) : error ? (
                    <p className="text-red-500 text-xl mt-6">{error}</p>
                ) : tutorData ? (
                    <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg text-center w-full max-w-xl mt-6">
                        <h2 className="text-3xl font-semibold">
                            {tutorData.fullName || tutorData.name}
                        </h2>
                        <p className="text-gray-600">
                            Tuổi: {tutorData.age || "Không rõ"}
                        </p>
                        <p className="text-gray-600 mt-2">
                            {tutorData.bio || tutorData.introduces}
                        </p>
                        <p className="text-[#000080] font-medium mt-2">
                            Chuyên môn:{" "}
                            {tutorData.specializations || "Chưa cập nhật"}
                        </p>

                        <button
                            onClick={() => setShowChat(true)}
                            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
                        >
                            Gửi tin nhắn
                        </button>
                    </div>
                ) : (
                    <p className="text-red-500 text-xl mt-6">
                        Không tìm thấy gia sư!
                    </p>
                )}

                {showChat && student?.id && tutorData?.userId && (
                    <div className="fixed bottom-4 right-4 w-[350px] shadow-lg z-50">
                        <div className="bg-white rounded-t-lg p-2 border-b flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-[#000080]">
                                Chat với {tutorData.fullName || tutorData.name}
                            </h3>
                            <button
                                onClick={() => setShowChat(false)}
                                className="text-gray-500 hover:text-red-600 text-xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                        <div className="bg-white rounded-b-lg border border-t-0">
                            <ChatBox
                                user={student}
                                partner={{
                                    id: tutorData.userId,
                                    name: tutorData.fullName || tutorData.name,
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
            <ChatbotWidget />
        </>
    );
};

export default TutorDetail;
