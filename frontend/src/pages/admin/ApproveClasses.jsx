import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../services/api";

const ApproveClasses = () => {
    const [classes, setClasses] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchPendingClasses();
    }, []);

    const fetchPendingClasses = async () => {
        try {
            const res = await fetchWithAuth("/api/admin/users/course/approve");
            if (!res.ok) {
                setMessage("❌ Không thể tải danh sách lớp học.");
                return;
            }

            const result = await res.json();
            console.log("💡 Danh sách lớp (gốc):", result.data);

            // 👉 Lọc những lớp có courseStatus === 1 (Pending)
            const filtered = result.data?.filter(
                (item) => item.courseStatus === 1
            );
            console.log("✅ Danh sách lớp (đang chờ duyệt):", filtered);

            setClasses(filtered || []);
        } catch (err) {
            setMessage("❌ Lỗi kết nối máy chủ.");
        }
    };

    const approveClass = async (courseId) => {
        if (!courseId) {
            setMessage("❌ Thiếu ID lớp học.");
            return;
        }

        try {
            const res = await fetchWithAuth(
                `/api/admin/users/courses/${courseId}/approve`,
                {
                    method: "PUT",
                }
            );

            if (!res.ok) {
                const text = await res.text();
                console.error("❌ Lỗi duyệt lớp:", text);
                setMessage("❌ Duyệt lớp thất bại.");
                return;
            }

            setMessage("✅ Duyệt lớp thành công!");
            fetchPendingClasses();
        } catch (err) {
            console.error("❌ Lỗi kết nối:", err.message);
            setMessage("❌ Không thể duyệt lớp.");
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-[#000080] mb-4 text-center">
                Duyệt Đơn Tạo Lớp Học
            </h1>

            {message && (
                <p className="text-center text-red-600 font-medium mb-4">
                    {message}
                </p>
            )}

            <div className="overflow-x-auto">
                <table className="w-full mt-4 border-collapse border border-gray-300 bg-white rounded shadow">
                    <thead>
                        <tr className="bg-[#000080] text-white">
                            <th className="p-3 border">Chuyên môn</th>
                            <th className="p-3 border">Gia Sư</th>
                            <th className="p-3 border">Giới thiệu</th>
                            <th className="p-3 border">Chứng Chỉ</th>
                            <th className="p-3 border">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.length > 0 ? (
                            classes.map((item) => (
                                <tr
                                    key={item.requestId}
                                    className="hover:bg-gray-100 transition"
                                >
                                    <td className="p-3 border">
                                        {item.specializations}
                                    </td>
                                    <td className="p-3 border">
                                        {item.fullname}
                                    </td>
                                    <td className="p-3 border">
                                        {item.introduces}
                                    </td>
                                    <td className="p-3 border text-center">
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {item.certificateUrls.map(
                                                (url, index) => (
                                                    <a
                                                        key={index}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img
                                                            src={url}
                                                            alt="Chứng chỉ"
                                                            className="w-20 h-auto rounded shadow-md hover:scale-105 transition-transform"
                                                        />
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-3 border text-center">
                                        <button
                                            onClick={() =>
                                                approveClass(item.courseId)
                                            }
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                                        >
                                            ✔️ Duyệt
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center text-gray-500 py-6"
                                >
                                    Không có lớp học nào đang chờ duyệt.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveClasses;
