import React, { useEffect, useState, useCallback } from "react";
import { refreshAccessToken } from "../../services/api";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    const fetchUsers = useCallback(async (retry = false) => {
        try {
            let token = localStorage.getItem("token");
            if (!token) {
                setMessage("❌ Bạn chưa đăng nhập.");
                return;
            }

            const res = await fetch("https://localhost:7211/api/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 401 && !retry) {
                try {
                    const newToken = await refreshAccessToken();
                    if (newToken) {
                        localStorage.setItem("token", newToken);
                        return fetchUsers(true); // Retry
                    }
                } catch (err) {
                    setMessage("❌ Token hết hạn. Vui lòng đăng nhập lại.");
                    return;
                }
            }

            if (res.status === 403) {
                setMessage("❌ Bạn không có quyền truy cập.");
                return;
            }

            if (!res.ok) {
                setMessage(`❌ Lỗi: ${res.status}`);
                return;
            }

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error("❌ Lỗi khi gọi API:", err);
            setMessage("❌ Không thể kết nối đến máy chủ.");
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = async (userId, retry = false) => {
        const confirm = window.confirm("Bạn có chắc muốn xóa người dùng này?");
        if (!confirm) return;

        try {
            let token = localStorage.getItem("token");

            const res = await fetch(
                `https://localhost:7211/api/admin/users/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 401 && !retry) {
                try {
                    const newToken = await refreshAccessToken();
                    if (newToken) {
                        localStorage.setItem("token", newToken);
                        return handleDelete(userId, true);
                    }
                } catch (err) {
                    setMessage("❌ Phiên đăng nhập đã hết hạn.");
                    return;
                }
            }

            if (res.status === 403) {
                setMessage("❌ Không có quyền xóa người dùng.");
                return;
            }

            if (!res.ok) {
                setMessage(`❌ Xóa thất bại: ${res.status}`);
                return;
            }

            setMessage("✅ Xóa người dùng thành công.");
            setUsers((prev) => prev.filter((u) => u.id !== userId));
        } catch (err) {
            console.error("❌ Lỗi khi xóa:", err);
            setMessage("❌ Không thể kết nối để xóa.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-[#000080]">
                Quản lý Người dùng
            </h1>

            {message && (
                <p className="text-red-600 font-medium my-4 text-center">
                    {message}
                </p>
            )}

            <table className="w-full mt-6 border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#000080] text-white">
                        <th className="p-3 border">ID</th>
                        <th className="p-3 border">Tên</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Vai trò</th>
                        <th className="p-3 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="bg-white hover:bg-gray-100"
                        >
                            <td className="p-3 border">{user.id}</td>
                            <td className="p-3 border">
                                {user.fullName || user.name}
                            </td>
                            <td className="p-3 border">{user.email}</td>
                            <td className="p-3 border">{user.role}</td>
                            <td className="p-3 border text-center">
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    🗑 Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
