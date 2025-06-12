import React from "react";
import backgroundImage from "../assest/9.jpg"; // 📂 Đảm bảo đường dẫn đúng

const RegisterForm = () => {
    return (
        <div
            className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }} // ✅ Đặt ảnh nền
        >
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-[#000080] text-center">
                    Đăng ký
                </h2>
                <form className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-600">
                            Tên người dùng
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            placeholder="Nhập tên người dùng"
                        />
                    </div>
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
                    <div className="mb-4">
                        <label className="block text-gray-600">
                            Nhập Lại Mật Khẩu
                        </label>
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
