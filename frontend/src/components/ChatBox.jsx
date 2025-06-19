import React, { useEffect, useState } from "react";

const ChatBox = ({ user, partner }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // 🚀 Gửi tin nhắn
    const handleSend = async () => {
        if (!input.trim()) return;

        const payload = {
            senderId: user.id,
            receiverId: partner.id,
            content: input,
        };

        console.log("Sending message:", payload);

        try {
            const res = await fetch("https://localhost:7211/api/Chat/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Gửi lỗi chi tiết:", data);
                return;
            }

            // ✅ Hiển thị ngay tin nhắn vừa gửi
            setMessages((prev) => [
                ...prev,
                {
                    fromSelf: true,
                    content: input,
                    sentAt: new Date().toISOString(),
                },
            ]);
            setInput("");
        } catch (err) {
            console.error("Gửi lỗi:", err.message);
        }
    };

    // 📥 Load lịch sử tin nhắn giữa user và partner
    useEffect(() => {
        if (!user?.id || !partner?.id) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch(
                    `https://localhost:7211/api/Chat/conversation/${partner.id}?currentUserId=${user.id}`
                );
                const data = await res.json();
                setMessages(
                    data.map((msg) => ({
                        content: msg.content,
                        sentAt: msg.sentAt,
                        fromSelf: msg.senderId === user.id,
                    }))
                );
            } catch (err) {
                console.error("Lỗi load tin nhắn:", err);
            }
        };

        fetchMessages();
    }, [user.id, partner.id]);

    return (
        <div className="flex flex-col h-[400px] bg-white border rounded shadow w-full">
            <div
                className="flex-1 overflow-y-auto p-3 space-y-2"
                id="chat-messages"
            >
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            msg.fromSelf ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`p-2 rounded max-w-xs text-sm ${
                                msg.fromSelf
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            <p>{msg.content}</p>
                            <p className="text-[10px] mt-1 text-right opacity-70">
                                {new Date(msg.sentAt).toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-2 border-t flex">
                <input
                    className="flex-1 border rounded p-2 mr-2"
                    placeholder="Nhập tin nhắn..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    onClick={handleSend}
                    className="bg-[#000080] text-white px-4 py-2 rounded"
                >
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
