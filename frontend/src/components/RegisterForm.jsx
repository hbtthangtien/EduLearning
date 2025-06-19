import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assest/9.jpg";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp");
            return;
        }

        try {
            const response = await fetch(
                "https://localhost:7211/api/Auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email, password }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setSuccess(
                    "✅ Đăng ký thành công! Chuyển hướng trong giây lát..."
                );
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                setError(data.message || "Đăng ký thất bại");
            }
        } catch (err) {
            setError("Lỗi kết nối server");
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-[#000080] text-center">
                    Đăng ký
                </h2>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600">
                            Tên người dùng
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            placeholder="Nhập tên người dùng"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            placeholder="Nhập email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            placeholder="Nhập mật khẩu"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">
                            Nhập lại mật khẩu
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            placeholder="Nhập lại mật khẩu"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm mb-4">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-600 text-sm mb-4">{success}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#000080] text-white py-3 rounded-lg hover:bg-[#000060] transition font-medium"
                    >
                        Đăng ký
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Đã có tài khoản?{" "}
                    <a href="/login" className="text-[#000080] hover:underline">
                        Đăng nhập ngay
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
