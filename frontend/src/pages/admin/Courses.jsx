import React from "react";

const courses = [
    { id: 1, title: "IELTS Cấp tốc", instructor: "Nguyễn Văn A", students: 50 },
    { id: 2, title: "TOEIC 750+", instructor: "Trần Thị B", students: 30 },
    {
        id: 3,
        title: "Giao tiếp Tiếng Anh",
        instructor: "Lê Văn C",
        students: 75,
    },
];

const Courses = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-[#000080]">
                Quản lý Khóa học
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                    >
                        <h2 className="text-xl font-semibold">
                            {course.title}
                        </h2>
                        <p className="text-gray-600">
                            Giảng viên: {course.instructor}
                        </p>
                        <p className="text-gray-600">
                            Học viên: {course.students}
                        </p>
                        <button className="mt-4 bg-[#000080] text-white px-4 py-2 rounded-lg hover:bg-[#000060] transition">
                            Xem chi tiết
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
