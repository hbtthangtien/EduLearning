import React, { useState } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../assest/5.jpg";
import ChatBox from "../components/ChatBox";

const tutorsData = [
    /* dữ liệu như cũ */
];

const TutorDetail = () => {
    const { id } = useParams();
    const tutor = tutorsData.find((t) => t.id === parseInt(id));
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const student = { name: "Học viên A" };

    const handleSend = (msg) => {
        setMessages((prev) => [...prev, msg]);
    };

    return (
        <div
            className="p-10 min-h-screen flex flex-col items-center bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <h1 className="text-4xl font-bold text-[#000080]">
                Chi tiết Gia sư
            </h1>

            {tutor ? (
                <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg text-center w-full max-w-xl mt-6">
                    <h2 className="text-3xl font-semibold">{tutor.name}</h2>
                    <p className="text-gray-600">Tuổi: {tutor.age}</p>
                    <p className="text-gray-600">{tutor.bio}</p>
                    <p className="text-[#000080] font-medium">
                        Chuyên môn: {tutor.specialty}
                    </p>
                    <p className="text-gray-600 mt-4">{tutor.experience}</p>

                    <button
                        onClick={() => setShowChat(true)}
                        className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
                    >
                        Gửi tin nhắn
                    </button>

                    {showChat && (
                        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md w-full">
                            <h3 className="text-xl font-semibold text-[#000080] mb-2">
                                Chat với {tutor.name}
                            </h3>
                            <ChatBox
                                user={student}
                                messages={messages}
                                onSend={handleSend}
                            />
                            <button
                                onClick={() => setShowChat(false)}
                                className="mt-3 bg-gray-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-500 transition"
                            >
                                Đóng
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-red-500 text-xl mt-6">
                    Gia sư không tồn tại!
                </p>
            )}
        </div>
    );
};

export default TutorDetail;
