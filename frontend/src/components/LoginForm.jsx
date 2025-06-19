import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assest/8.jpg";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(
                "https://localhost:7211/api/Auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();
            console.log("🧾 Phản hồi từ API:", data);

            if (!data.success) {
                throw new Error(data.message || "Đăng nhập thất bại");
            }

            const accessToken = data.data?.accessToken;
            const refreshToken = data.data?.refreshToken;

            if (!accessToken || !refreshToken) {
                throw new Error("Thiếu token từ phản hồi");
            }

            //  Lưu token vào localStorage
            localStorage.setItem("token", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            //  Giải mã để lấy thông tin user
            const decoded = jwtDecode(accessToken);
            const role =
                decoded.role ||
                decoded[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ];
            const name =
                decoded.name ||
                decoded[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                ];
            localStorage.setItem("name", name);

            if (!role) {
                throw new Error("Không tìm thấy vai trò trong token");
            }

            console.log("👤 Vai trò người dùng:", role);
            const normalizedRole = role.toLowerCase();

            if (normalizedRole === "admin") {
                navigate("/admin");
            } else if (normalizedRole === "tutor") {
                navigate("/tutor");
            } else if (normalizedRole === "student") {
                navigate("/");
            } else {
                setError("Không xác định được vai trò người dùng");
            }
        } catch (err) {
            console.error("❌ Lỗi đăng nhập:", err.message);
            setError(err.message || "Đăng nhập thất bại");
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-[#000080] text-center">
                    Đăng nhập
                </h2>
                <form className="mt-6" onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Mật khẩu</label>
                        <input
                            type="password"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-red-600 text-center mb-4">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-[#000080] text-white py-3 rounded-lg hover:bg-[#000060] transition font-medium"
                    >
                        Đăng nhập
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Chưa có tài khoản?{" "}
                    <a
                        href="/register"
                        className="text-[#000080] hover:underline"
                    >
                        Đăng ký ngay
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
