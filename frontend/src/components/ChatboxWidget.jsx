import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaComments } from "react-icons/fa";

const BOT_NAME = "AI Trợ lý";
//const WIDGET_COLOR = "#5b2cff"; // chỉnh màu nếu muốn

const defaultWelcome = "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: defaultWelcome }
  ]);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef();

  // Scroll to bottom khi có tin nhắn mới
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    // Giả lập trả lời, thay bằng call API ở đây nếu muốn
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Bạn vừa hỏi: \"" + userMsg + "\". (Đây là phản hồi demo, hãy tích hợp API thật nếu muốn!)"
        }
      ]);
    }, 800);
  };

  return (
    <div>
      {/* Bubble mở chatbot */}
      <button
        className={`fixed z-50 bottom-8 right-8 bg-gradient-to-br from-[#5b2cff] to-[#fea3c3] text-white p-4 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-110`}
        style={{ boxShadow: "0 6px 24px #5b2cff55" }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Mở Chatbot"
      >
        <FaComments className="text-2xl" />
        <span className="hidden md:inline font-bold text-base">Hỗ trợ</span>
      </button>

      {/* Khung chat */}
      {open && (
        <div
          className="fixed z-[9999] bottom-24 right-8 w-[330px] max-w-[92vw] rounded-3xl shadow-2xl bg-white border border-[#ede7ff] flex flex-col animate-fade-in"
          style={{ minHeight: 420, boxShadow: "0 8px 32px #5b2cff22" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#5b2cff] to-[#fea3c3] flex items-center gap-3 px-4 py-3 rounded-t-3xl">
            <FaRobot className="text-white text-2xl" />
            <span className="font-bold text-white text-lg">{BOT_NAME}</span>
            <button
              className="ml-auto text-white hover:text-[#ffb7c5] text-2xl px-2"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          {/* Nội dung chat */}
          <div
            className="flex-1 p-4 overflow-y-auto max-h-[360px] scrollbar-thin scrollbar-thumb-[#d1aaff] scrollbar-track-[#f8f6ff]"
            ref={chatBodyRef}
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex mb-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] text-base shadow
                    ${msg.from === "bot"
                      ? "bg-gradient-to-br from-[#f8f6ff] to-[#f1e6fa] text-[#5b2cff]"
                      : "bg-gradient-to-br from-[#d13d76] to-[#fea3c3] text-white"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Thanh nhập */}
          <form onSubmit={handleSendMessage} className="flex gap-2 border-t px-4 py-3 bg-[#f9f7fe] rounded-b-3xl">
            <input
              className="flex-1 rounded-xl border px-3 py-2 outline-none focus:border-[#5b2cff] transition"
              type="text"
              placeholder="Nhập nội dung..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus={open}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#5b2cff] to-[#fea3c3] text-white px-4 py-2 rounded-xl shadow font-semibold hover:scale-105 transition"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
