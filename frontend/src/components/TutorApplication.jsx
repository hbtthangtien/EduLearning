import React, { useState } from "react";
import backgroundImage from "../assest/background.jpg"; // 📂 Đảm bảo đường dẫn đúng

const TutorApplication = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        experience: "",
        message: "",
        certificate: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, certificate: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Đơn đăng ký trở thành Tutor đã được gửi! Chờ Admin duyệt.");
        console.log("Thông tin:", formData);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed p-10"
            style={{ backgroundImage: `url(${backgroundImage})` }} // ✅ Đặt ảnh nền
        >
            <div className="w-full max-w-lg bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-[#000080] text-center">
                    Đăng ký trở thành Gia sư
                </h2>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600">Họ tên</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">
                            Kinh nghiệm giảng dạy
                        </label>
                        <textarea
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">
                            Tải lên chứng chỉ giảng dạy
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".jpg,.png,.pdf"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#000080] text-white py-3 rounded-lg hover:bg-[#000060] transition font-medium"
                    >
                        Gửi đơn
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TutorApplication;
