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
            const res = await fetchWithAuth(
                "/api/admin/users/coursedetail/${}"
            );
            if (!res.ok) {
                setMessage("❌ Không thể tải danh sách lớp học.");
                return;
            }

            const data = await res.json();
            setClasses(data);
        } catch (err) {
            setMessage("❌ Lỗi kết nối máy chủ.");
        }
    };

    const approveClass = async (classId) => {
        try {
            const res = await fetchWithAuth(
                `/api/admin/users/courses/${classId}/approve`,
                {
                    method: "POST",
                }
            );

            if (!res.ok) {
                setMessage("❌ Duyệt lớp thất bại.");
                return;
            }

            setMessage("✅ Duyệt lớp thành công!");
            fetchPendingClasses();
        } catch (err) {
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
                            <th className="p-3 border">Tên Lớp</th>
                            <th className="p-3 border">Gia Sư</th>
                            <th className="p-3 border">Mô tả</th>
                            <th className="p-3 border">Ảnh Minh Chứng</th>
                            <th className="p-3 border">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.length > 0 ? (
                            classes.map((item) => (
                                <tr
                                    key={item.classId}
                                    className="hover:bg-gray-100 transition"
                                >
                                    <td className="p-3 border">{item.title}</td>
                                    <td className="p-3 border">
                                        {item.tutorName}
                                    </td>
                                    <td className="p-3 border">
                                        {item.description}
                                    </td>
                                    <td className="p-3 border text-center">
                                        <a
                                            href={item.proofImage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={item.proofImage}
                                                alt="Minh chứng"
                                                className="w-20 h-auto mx-auto rounded shadow-md hover:scale-105 transition-transform"
                                            />
                                        </a>
                                    </td>
                                    <td className="p-3 border text-center">
                                        <button
                                            onClick={() =>
                                                approveClass(item.classId)
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
