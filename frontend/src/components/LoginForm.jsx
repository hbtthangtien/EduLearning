import React from "react";
import backgroundImage from "../assest/8.jpg"; // 📂 Đảm bảo đường dẫn đúng

const LoginForm = () => {
    return (
        <div
            className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }} // ✅ Đặt ảnh nền
        >
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-[#000080] text-center">
                    Đăng nhập
                </h2>
                <form className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            placeholder="Nhập email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600">Mật khẩu</label>
                        <input
                            type="password"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
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
