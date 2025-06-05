import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

const classesData = [
    { id: 1, title: "IELTS Cấp tốc", students: 30 },
    { id: 2, title: "TOEIC 750+", students: 25 },
];

const TutorClasses = () => {
    return (
        <div className="p-10 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-[#000080] text-center mb-6">
                Lớp học của tôi
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classesData.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4"
                    >
                        <FaChalkboardTeacher className="text-[#000080] text-4xl" />
                        <div>
                            <h2 className="text-xl font-semibold">
                                {course.title}
                            </h2>
                            <p className="text-gray-600">
                                Học viên: {course.students}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorClasses;
