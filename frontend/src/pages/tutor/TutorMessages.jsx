import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

const initialMessagesData = [
    {
        id: 1,
        student: "Nguyễn Văn A",
        message: "Em cần thêm tài liệu luyện IELTS.",
        reply: "", // <-- reply ban đầu
    },
    {
        id: 2,
        student: "Trần Thị B",
        message: "Bài tập TOEIC hôm nay có câu này hơi khó...",
        reply: "",
    },
];

const TutorMessages = () => {
    const [messages, setMessages] = useState(initialMessagesData);

    const handleReplyChange = (id, value) => {
        setMessages((prev) =>
            prev.map((msg) => (msg.id === id ? { ...msg, reply: value } : msg))
        );
    };

    const handleSendReply = (id) => {
        const msg = messages.find((m) => m.id === id);
        if (!msg.reply.trim())
            return alert("Nội dung phản hồi không được để trống!");

        // Gửi reply đến backend tại đây (nếu có API)
        console.log(`Phản hồi cho ${msg.student}: ${msg.reply}`);

        // Sau khi gửi xong có thể xóa nội dung phản hồi
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, reply: "" } : m))
        );
    };

    return (
        <div className="p-10 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-[#000080] text-center mb-6">
                Tin nhắn từ học viên
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4"
                    >
                        <div className="flex items-start gap-4">
                            <FaEnvelope className="text-[#000080] text-3xl mt-1" />
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {msg.student}
                                </h2>
                                <p className="text-gray-600">{msg.message}</p>
                            </div>
                        </div>

                        <textarea
                            value={msg.reply}
                            onChange={(e) =>
                                handleReplyChange(msg.id, e.target.value)
                            }
                            placeholder="Nhập phản hồi tại đây..."
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows={3}
                        />

                        <button
                            onClick={() => handleSendReply(msg.id)}
                            className="self-end bg-[#000080] text-white px-4 py-2 rounded hover:bg-[#000066]"
                        >
                            Gửi phản hồi
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorMessages;
