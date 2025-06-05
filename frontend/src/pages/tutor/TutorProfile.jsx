import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const TutorProfile = () => {
    const [profile, setProfile] = useState({
        name: "Nguyễn Văn A",
        specialty: "IELTS",
        bio: "Gia sư IELTS với 5 năm kinh nghiệm.",
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-10 min-h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-[#000080]">
                Cập nhật hồ sơ
            </h1>

            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full mt-6">
                <label className="block text-lg font-medium">Tên Gia sư</label>
                <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                />

                <label className="block text-lg font-medium mt-4">
                    Chuyên môn
                </label>
                <input
                    type="text"
                    name="specialty"
                    value={profile.specialty}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                />

                <label className="block text-lg font-medium mt-4">
                    Giới thiệu
                </label>
                <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                ></textarea>

                <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition">
                    Lưu thay đổi
                </button>
            </div>
        </div>
    );
};

export default TutorProfile;
