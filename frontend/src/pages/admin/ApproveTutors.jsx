import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../services/api";

const ApproveTutors = () => {
    const [allRequests, setAllRequests] = useState([]);
    const [tutorRequests, setTutorRequests] = useState([]);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const pageSize = 5;

    useEffect(() => {
        fetchPendingTutors();
    }, []);

    const fetchPendingTutors = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("❌ Bạn chưa đăng nhập.");
            return;
        }

        try {
            const res = await fetchWithAuth(
                "/api/admin/users/activation/getall",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!res.ok) {
                setMessage("❌ Lỗi khi tải danh sách: " + res.status);
                return;
            }

            const data = await res.json();
            const pending = data.filter((item) => item.isActivated === false);
            setAllRequests(pending);
        } catch (err) {
            console.error("❌ Lỗi kết nối:", err);
            setMessage("❌ Không thể kết nối đến máy chủ.");
        } 
    };

    useEffect(() => {
        const filtered = allRequests.filter(
            (item) =>
                item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.specializations?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const start = (currentPage - 1) * pageSize;
        const paginated = filtered.slice(start, start + pageSize);

        setTutorRequests(paginated);
    }, [allRequests, searchTerm, currentPage]);

    const approveTutor = async (requestId) => {
        const token = localStorage.getItem("token");

        try {

            const res = await fetchWithAuth(
                "/api/admin/users/activation/approve",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ requestId }),
                }
            );

            if (!res.ok) {
                setMessage("❌ Duyệt thất bại: " + res.status);
                return;
            }

            setMessage("✅ Duyệt thành công!");

            const updated = allRequests.filter((item) => item.requestId !== requestId);
            setAllRequests(updated);

            // Điều chỉnh lại currentPage nếu cần
            const filtered = updated.filter(
                (item) =>
                    item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.specializations?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const maxPage = Math.max(1, Math.ceil(filtered.length / pageSize));
            if (currentPage > maxPage) {
                setCurrentPage(maxPage);
            }
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } catch (err) {
            console.error("❌ Lỗi khi duyệt:", err);
            setMessage("❌ Không thể kết nối máy chủ.");
        } 
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
                📑 Danh Sách Đơn Trở Thành Gia Sư
            </h1>

            {message && (
                <p className="text-center text-red-600 font-medium mb-6">
                    {message}
                </p>
            )}

            <div className="mb-4 flex justify-end">
                <input
                    type="text"
                    placeholder="Tìm theo tên hoặc chuyên môn..."
                    className="p-2 border rounded-md w-80"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
                    }}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-xl overflow-hidden border border-gray-200">
                    <thead>
                        <tr className="bg-indigo-700 text-white text-sm uppercase">
                            <th className="px-4 py-3 text-left">Họ Tên</th>
                            <th className="px-4 py-3 text-left">Chuyên Môn</th>
                            <th className="px-4 py-3 text-left">Giới Thiệu Bản Thân</th>
                            <th className="px-4 py-3 text-left">Chứng Chỉ Gia Sư</th>
                            <th className="px-4 py-3 text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutorRequests.length > 0 ? (
                            tutorRequests.map((req) => (
                                <tr
                                    key={req.requestId}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-800">
                                        {req.fullname}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {req.specializations}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {req.introduces}
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        <div className="flex gap-2">
                                            {req.certificateUrls?.map((url, index) => (
                                                <a
                                                    key={index}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={url}
                                                        alt={`Chứng chỉ ${index + 1}`}
                                                        className="w-24 h-auto rounded shadow hover:scale-105 transition-transform"
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => approveTutor(req.requestId)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                                        >
                                            ✅ Duyệt
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-6">
                                    Không có đơn nào chờ duyệt.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {allRequests.length > 0 && (
                <div className="flex justify-center mt-6 space-x-2">
                    <button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        ◀ Trước
                    </button>
                    <span className="px-4 py-1">
                        Trang {currentPage} /{" "}
                        {Math.max(
                            1,
                            Math.ceil(
                                allRequests.filter(
                                    (item) =>
                                        item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        item.specializations?.toLowerCase().includes(searchTerm.toLowerCase())
                                ).length / pageSize
                            )
                        )}
                    </span>
                    <button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={
                            currentPage >=
                            Math.ceil(
                                allRequests.filter(
                                    (item) =>
                                        item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        item.specializations?.toLowerCase().includes(searchTerm.toLowerCase())
                                ).length / pageSize
                            )
                        }
                    >
                        Sau ▶
                    </button>
                </div>
            )}

            {showPopup && (
                <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded shadow-lg z-50 animate-bounce-in">
                    🎉 Duyệt thành công!
                </div>
            )}
        </div>
    );
};

export default ApproveTutors;