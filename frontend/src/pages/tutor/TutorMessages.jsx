import React, { useEffect, useState } from "react";
import ChatBox from "../../components/ChatBox";
import { fetchWithAuth } from "../../services/api";

const TutorMessages = () => {
    const tutor = JSON.parse(localStorage.getItem("user"));
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetchWithAuth(
                    `/api/Chat/contacts/${tutor.id}`
                );
                const data = await res.json();

                console.log("📩 API trả về:", res.status, data);

                if (!res.ok || !Array.isArray(data)) {
                    throw new Error("Không thể tải danh sách học viên");
                }

                // Chuyển đổi cấu trúc { id, name } như ChatBox
                const formatted = data.map((stu) => ({
                    id: stu.userId,
                    name: stu.fullName,
                }));

                setStudents(formatted);
                if (formatted.length > 0) setSelectedStudent(formatted[0]);
            } catch (err) {
                console.error("Lỗi khi load học viên:", err.message);
                setError("Không thể tải danh sách học viên.");
            } finally {
                setLoading(false);
            }
        };

        if (tutor?.id) fetchContacts();
    }, [tutor?.id]);

    if (loading)
        return <div className="p-6">Đang tải danh sách học viên...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r">
                <h2 className="text-xl font-bold text-center p-4 text-[#000080]">
                    Học viên
                </h2>
                <ul>
                    {students.map((student) => (
                        <li
                            key={student.id}
                            className={`px-4 py-3 cursor-pointer hover:bg-gray-200 ${
                                selectedStudent?.id === student.id
                                    ? "bg-gray-200 font-bold"
                                    : ""
                            }`}
                            onClick={() => setSelectedStudent(student)}
                        >
                            {student.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main chat area */}
            <div className="flex-1 flex flex-col p-6">
                {selectedStudent ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-[#000080]">
                            Trò chuyện với {selectedStudent.name}
                        </h2>

                        <div className="flex-1">
                            <ChatBox user={tutor} partner={selectedStudent} />
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600">Chưa chọn học viên nào.</p>
                )}
            </div>
        </div>
    );
};

export default TutorMessages;
