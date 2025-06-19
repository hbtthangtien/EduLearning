import React, { useState } from "react";
import ChatBox from "../../components/ChatBox";

const TutorMessages = () => {
    const tutor = { id: 5, name: "Gia sư B" };

    // 👇 student phải là object có id + name
    const students = [
        { id: 7, name: "Nguyễn Văn A" },
        { id: 4, name: "Trần Thị B" },
    ];

    const [selectedStudent, setSelectedStudent] = useState(students[0]);

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
                                student.id === selectedStudent.id
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
                <h2 className="text-2xl font-bold mb-4 text-[#000080]">
                    Trò chuyện với {selectedStudent.name}
                </h2>

                <div className="flex-1">
                    {/* Truyền đúng user & partner (có id và name) */}
                    <ChatBox user={tutor} partner={selectedStudent} />
                </div>
            </div>
        </div>
    );
};

export default TutorMessages;
