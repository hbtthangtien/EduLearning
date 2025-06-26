import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchWithAuth } from "../../services/api";

const TutorProfile = () => {
    const [profile, setProfile] = useState({
        fullName: "",
        specializations: "",
        introduces: "",
    });
    const [userId, setUserId] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // 🔐 Lấy userId từ token
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const id =
                    decoded[
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                    ] || decoded.sub; // fallback
                if (id) setUserId(id);
                else setMessage("❌ Không tìm thấy userId trong token.");
            } catch (error) {
                setMessage("❌ Token không hợp lệ.");
            }
        } else {
            setMessage("❌ Chưa đăng nhập.");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async () => {
        setMessage("");

        if (!userId) {
            setMessage("❌ Không tìm thấy userId.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setMessage("❌ Bạn cần đăng nhập.");
                return;
            }

            const response = await fetchWithAuth(`/api/tutors/${userId}/bio`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: Number(userId),
                    ...profile,
                }),
            });

            const result = await response.json();
            if (!response.ok) {
                const errMsg = result?.message || "Cập nhật thất bại.";
                setMessage("❌ " + errMsg);
            } else {
                setMessage("✅ Hồ sơ đã được cập nhật thành công.");
            }
        } catch (err) {
            console.error("❌ Lỗi cập nhật:", err);
            setMessage("❌ Lỗi kết nối đến máy chủ.");
        }
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
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                />

                <label className="block text-lg font-medium mt-4">
                    Chuyên môn
                </label>
                <input
                    type="text"
                    name="specializations"
                    value={profile.specializations}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                />

                <label className="block text-lg font-medium mt-4">
                    Giới thiệu
                </label>
                <textarea
                    name="introduces"
                    value={profile.introduces}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                ></textarea>

                {message && (
                    <p className="mt-4 text-center text-red-600 font-medium">
                        {message}
                    </p>
                )}

                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
                >
                    Lưu thay đổi
                </button>
            </div>
        </div>
    );
};

export default TutorProfile;
