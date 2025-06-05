import React from "react";
import { FaEnvelope } from "react-icons/fa";

const messagesData = [
    {
        id: 1,
        student: "Nguyễn Văn A",
        message: "Em cần thêm tài liệu luyện IELTS.",
    },
    {
        id: 2,
        student: "Trần Thị B",
        message: "Bài tập TOEIC hôm nay có câu này hơi khó...",
    },
];

const TutorMessages = () => {
    return (
        <div className="p-10 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-[#000080] text-center mb-6">
                Tin nhắn từ học viên
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {messagesData.map((msg) => (
                    <div
                        key={msg.id}
                        className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4"
                    >
                        <FaEnvelope className="text-[#000080] text-4xl" />
                        <div>
                            <h2 className="text-xl font-semibold">
                                {msg.student}
                            </h2>
                            <p className="text-gray-600">{msg.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorMessages;
