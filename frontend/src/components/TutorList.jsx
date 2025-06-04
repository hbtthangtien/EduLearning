import React, { useState } from "react";

const tutorsData = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        age: 30,
        bio: "Gia sư IELTS với 5 năm kinh nghiệm.",
        specialty: "IELTS",
    },
    {
        id: 2,
        name: "Trần Thị B",
        age: 28,
        bio: "Chuyên gia luyện TOEIC cấp tốc.",
        specialty: "TOEIC",
    },
    {
        id: 3,
        name: "Lê Văn C",
        age: 35,
        bio: "Giảng viên tiếng Anh giao tiếp.",
        specialty: "Giao tiếp tiếng Anh",
    },
    {
        id: 4,
        name: "Hoàng Gia D",
        age: 40,
        bio: "Chuyên sâu về ngữ pháp tiếng Anh.",
        specialty: "Ngữ pháp",
    },
    {
        id: 5,
        name: "Phạm Thu E",
        age: 32,
        bio: "Kinh nghiệm dạy trẻ em học ngoại ngữ.",
        specialty: "Tiếng Anh trẻ em",
    },
    {
        id: 6,
        name: "Vũ Minh F",
        age: 29,
        bio: "Giảng viên luyện phát âm chuẩn.",
        specialty: "Phát âm",
    },
    {
        id: 7,
        name: "Bùi Hải G",
        age: 33,
        bio: "Chuyên sâu về viết luận học thuật.",
        specialty: "Viết học thuật",
    },
    {
        id: 8,
        name: "Đỗ Văn H",
        age: 27,
        bio: "Gia sư luyện thi chứng chỉ quốc tế.",
        specialty: "Chứng chỉ quốc tế",
    },
];

const TutorList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const tutorsPerPage = 6;

    const lastIndex = currentPage * tutorsPerPage;
    const firstIndex = lastIndex - tutorsPerPage;
    const currentTutors = tutorsData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(tutorsData.length / tutorsPerPage);

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold text-[#000080] text-center">
                Danh sách Gia sư
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {currentTutors.map((tutor) => (
                    <div
                        key={tutor.id}
                        className="bg-white p-6 rounded-lg shadow-lg text-center"
                    >
                        <h2 className="text-xl font-semibold">{tutor.name}</h2>
                        <p className="text-gray-600">Tuổi: {tutor.age}</p>
                        <p className="text-gray-600">{tutor.bio}</p>
                        <p className="text-[#000080] font-medium">
                            Chuyên môn: {tutor.specialty}
                        </p>
                    </div>
                ))}
            </div>

            {/* Phân trang */}
            <div className="flex justify-center mt-6">
                <button
                    className={`px-4 py-2 mx-2 rounded-lg ${
                        currentPage === 1
                            ? "bg-gray-300"
                            : "bg-[#000080] text-white hover:bg-[#000060] transition"
                    }`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Trước
                </button>
                <span className="px-4 py-2 bg-gray-200 rounded-lg">
                    {currentPage} / {totalPages}
                </span>
                <button
                    className={`px-4 py-2 mx-2 rounded-lg ${
                        currentPage === totalPages
                            ? "bg-gray-300"
                            : "bg-[#000080] text-white hover:bg-[#000060] transition"
                    }`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Sau
                </button>
            </div>
        </div>
    );
};

export default TutorList;
