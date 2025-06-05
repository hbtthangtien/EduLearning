import React from "react";

const tutors = [
    {
        id: 1,
        name: "Cô Giáo Thảo",
        subject: "Lớp Học Ielts",
        rating: 4.9,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 2,
        name: " Thầy Giáo Khánh",
        subject: "Lớp Học Toeic",
        rating: 4.8,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 3,
        name: "Thầy Giáo Huấn",
        subject: "Giao Tiếp Tiếng Anh",
        rating: 5.0,
        image: "",
    },
];

const TutorTypical = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
            {tutors.map((tutor) => (
                <div
                    key={tutor.id}
                    className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition"
                >
                    <img
                        src={tutor.image}
                        alt={tutor.name}
                        className="w-24 h-24 rounded-full mx-auto border-4 border-[#000080]"
                    />
                    <h2 className="text-xl font-semibold mt-4">{tutor.name}</h2>
                    <p className="text-gray-600">{tutor.subject}</p>
                    <p className="text-yellow-500">⭐ {tutor.rating}</p>
                    <button className="mt-4 bg-[#000080] text-white px-4 py-2 rounded-lg hover:bg-[#000060] transition">
                        Xem chi tiết
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TutorTypical;
