import React, { useEffect, useRef, useState } from "react";
import { fetchWithAuth } from "../services/api";

const ChatBox = ({ user, partner }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!user?.id || !partner?.id) return;

            try {
                const res = await fetchWithAuth(
                    `/api/Chat/conversation/${partner.id}?currentUserId=${user.id}`
                );
                const data = await res.json();

                setMessages(
                    data.map((msg) => ({
                        content: msg.content,
                        sentAt: msg.sentAt,
                        fromSelf: String(msg.senderId) === String(user.id),
                    }))
                );

                const unreadMessageIds = data
                    .filter((msg) => msg.receiverId === user.id && !msg.isRead)
                    .map((msg) => msg.id);

                if (unreadMessageIds.length === 0) {
                    console.log(
                        "ℹ️ Không có tin nhắn chưa đọc, bỏ qua gọi mark-as-read."
                    );
                    return;
                }

                const markRes = await fetchWithAuth(
                    `/api/Chat/mark-as-read?currentUserId=${user.id}`,
                    {
                        method: "POST",
                        body: JSON.stringify({ messageIds: unreadMessageIds }),
                    }
                );

                const markData = await markRes.json();

                if (!markRes.ok) {
                    if (markData?.error?.includes("No unread messages")) {
                        console.log("ℹ️ Không có tin chưa đọc cần đánh dấu.");
                    } else {
                        console.warn("❗ mark-as-read thất bại:", markData);
                    }
                } else {
                    console.log("✅ Tin nhắn đã được đánh dấu đã đọc.");
                }
            } catch (err) {
                console.error("Lỗi load tin nhắn:", err);
            }
        };

        fetchMessages();
    }, [user?.id, partner?.id]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const payload = {
            senderId: user.id,
            receiverId: partner.id,
            content: input,
        };

        try {
            const res = await fetchWithAuth("/api/Chat/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("❌ Gửi lỗi chi tiết:", data);
                return;
            }

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
            console.error("❌ Gửi lỗi:", err.message);
        }
    };

    return (
        <div className="flex flex-col h-[400px] bg-white border rounded shadow w-full">
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
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
                <div ref={bottomRef}></div>
            </div>

            <div className="p-2 border-t flex">
                <input
                    className="flex-1 border rounded p-2 mr-2 text-black bg-white placeholder-gray-400"
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
