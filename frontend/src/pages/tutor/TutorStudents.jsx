import React from "react";
import { FaUserGraduate } from "react-icons/fa";

const studentsData = [
    { id: 1, name: "Nguyễn Văn A", course: "IELTS Cấp tốc" },
    { id: 2, name: "Trần Thị B", course: "TOEIC 750+" },
];

const TutorStudents = () => {
    return (
        <div className="p-10 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-[#000080] text-center mb-6">
                Danh sách học viên
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studentsData.map((student) => (
                    <div
                        key={student.id}
                        className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4"
                    >
                        <FaUserGraduate className="text-[#000080] text-4xl" />
                        <div>
                            <h2 className="text-xl font-semibold">
                                {student.name}
                            </h2>
                            <p className="text-gray-600">
                                Lớp học: {student.course}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorStudents;
