import React, { useState } from "react";
import backgroundImage from "../assest/background.jpg";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../services/api";

const TutorApplication = () => {
    const [formData, setFormData] = useState({
        Fullname: "",
        Introduces: "",
        Specializations: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = () => {
        return (
            formData.Fullname.trim() &&
            formData.Introduces.trim() &&
            formData.Specializations.trim()
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!isFormValid()) {
            setMessage("❌ Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("❌ Bạn cần đăng nhập để gửi đơn.");
            return;
        }

        const form = new FormData();
        form.append("Fullname", formData.Fullname.trim());
        form.append("Introduces", formData.Introduces.trim());
        form.append("Specializations", formData.Specializations.trim());

        try {
            const response = await fetch(
                "https://localhost:7211/api/student/register-tutor",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: form,
                }
            );

            const rawText = await response.text();
            const result = rawText ? JSON.parse(rawText) : {};

            if (!response.ok) {
                const errorDetails = result?.errors
                    ? Object.entries(result.errors)
                          .map(
                              ([field, msgs]) => `${field}: ${msgs.join(", ")}`
                          )
                          .join(" | ")
                    : result?.title || "Lỗi không xác định";
                setMessage(`❌ Lỗi từ server: ${errorDetails}`);
                return;
            }

            if (result.success) {
                setMessage("✅ Đăng ký thành công! Đang kiểm tra vai trò...");

                try {
                    const newAccessToken = await refreshAccessToken();
                    const decoded = jwtDecode(newAccessToken);
                    const role =
                        decoded.role ||
                        decoded[
                            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                        ];

                    if (role?.toLowerCase() === "tutor") {
                        navigate("/tutor");
                    } else {
                        setMessage(
                            "✅ Đăng ký thành công! Nhưng vai trò chưa thay đổi."
                        );
                    }
                } catch (err) {
                    console.error("❌ Không thể làm mới token:", err.message);
                    setMessage(
                        "✅ Đăng ký thành công! Nhưng không thể kiểm tra vai trò."
                    );
                }

                setFormData({
                    Fullname: "",
                    Introduces: "",
                    Specializations: "",
                });
            } else {
                setMessage(`❌ ${result?.title || "Đăng ký thất bại."}`);
            }
        } catch (err) {
            console.error("❌ Lỗi gửi đơn:", err);
            setMessage("❌ Không thể kết nối tới máy chủ.");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed p-10"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="w-full max-w-lg bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-[#000080] text-center">
                    Đăng ký trở thành Gia sư
                </h2>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600">
                            Họ và tên (Fullname)
                        </label>
                        <input
                            type="text"
                            name="Fullname"
                            value={formData.Fullname}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">
                            Giới thiệu bản thân (Introduces)
                        </label>
                        <textarea
                            name="Introduces"
                            value={formData.Introduces}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">
                            Chuyên môn (Specializations)
                        </label>
                        <select
                            name="Specializations"
                            value={formData.Specializations}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            required
                        >
                            <option value="">-- Chọn chuyên môn --</option>
                            <option value="Ielts">Ielts</option>
                            <option value="Toeic">Toeic</option>
                            <option value="Giao Tiếp">Giao Tiếp</option>
                            <option value="Tiếng Anh Trung Học">
                                Tiếng Anh Trung Học
                            </option>
                            <option value="Tiếng Anh Phổ Thông">
                                Tiếng Anh Phổ Thông
                            </option>
                        </select>
                    </div>

                    {message && (
                        <p className="text-center text-red-600 mb-4">
                            {message}
                        </p>
                    )}

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
