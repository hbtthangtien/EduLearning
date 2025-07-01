import React, { useEffect, useState, useCallback } from "react";
import { fetchWithAuth, refreshAccessToken } from "../../services/api";

const Users = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const fetchUsers = useCallback(async (retry = false) => {
        try {
            let token = localStorage.getItem("token");
            if (!token) {
                setMessage("❌ Bạn chưa đăng nhập.");
                return;
            }

            const res = await fetchWithAuth("/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 401 && !retry) {
                try {
                    const newToken = await refreshAccessToken();
                    if (newToken) {
                        localStorage.setItem("token", newToken);
                        return fetchUsers(true);
                    }
                } catch {
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
            setAllUsers(data);
        } catch (err) {
            console.error("❌ Lỗi khi gọi API:", err);
            setMessage("❌ Không thể kết nối đến máy chủ.");
        }
    }, []);
    // search, filter, 
    useEffect(() => {
        const filtered = allUsers.filter(
            (user) =>
                user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const start = (currentPage - 1) * pageSize;
        const paginated = filtered.slice(start, start + pageSize);

        setUsers(paginated);
    }, [allUsers, searchTerm, currentPage, pageSize]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = async (userId, retry = false) => {
        if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;

        try {
            let token = localStorage.getItem("token");
            const res = await fetchWithAuth(`/api/admin/users/${userId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.status === 401 && !retry) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    localStorage.setItem("token", newToken);
                    return handleDelete(userId, true);
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
            setAllUsers((prev) => prev.filter((u) => u.id !== userId));
        } catch (err) {
            console.error("❌ Lỗi khi xóa:", err);
            setMessage("❌ Không thể kết nối để xóa.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-[#000080] mb-6 text-center">
                Quản lý Người dùng
            </h1>

            {message && (
                <p className="text-center text-red-600 font-medium mb-4">
                    {message}
                </p>
            )}
            <input
                type="text"
                placeholder="Nhập tên hoặc email..."
                className="p-2 border rounded-md w-80 mb-4"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // reset về trang 1
                }}
            />

            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-[#000080] text-white">
                        <tr>
                            <th className="px-6 py-3 font-medium">ID</th>
                            <th className="px-6 py-3 font-medium">Tên</th>
                            <th className="px-6 py-3 font-medium">Email</th>
                            <th className="px-6 py-3 font-medium">Vai Trò</th>
                            <th className="px-6 py-3 font-medium text-center">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-4">{user.id}</td>
                                <td className="px-6 py-4">
                                    {user.fullName || user.username}
                                </td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.roleName}</td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow-sm transition"
                                    >
                                        🗑 Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    Không có người dùng nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
                <button
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    ◀ Trước
                </button>
                <span className="px-4 py-1">
                    Trang {currentPage} / {Math.ceil(
                        allUsers.filter(
                            (user) =>
                                user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                user.email?.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length / pageSize
                    )}
                </span>
                <button
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={
                        currentPage >=
                        Math.ceil(
                            allUsers.filter(
                                (user) =>
                                    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
                            ).length / pageSize
                        )
                    }
                >
                    Sau ▶
                </button>
            </div>

        </div>
    );
};

export default Users;
