import React, { useState } from "react";

const applications = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        experience: "3 năm dạy IELTS",
        status: "Chờ duyệt",
    },
    {
        id: 2,
        name: "Trần Thị B",
        email: "tranthib@example.com",
        experience: "2 năm dạy TOEIC",
        status: "Chờ duyệt",
    },
];

const ApproveTutors = () => {
    const [tutorRequests, setTutorRequests] = useState(applications);

    const approveTutor = (id) => {
        setTutorRequests(
            tutorRequests.map((req) =>
                req.id === id ? { ...req, status: "Đã duyệt" } : req
            )
        );
        alert("Đã duyệt đơn trở thành Gia sư!");
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-[#000080]">
                Duyệt đơn Gia sư
            </h1>
            <table className="w-full mt-6 border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#000080] text-white">
                        <th className="p-3 border">Tên</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Kinh nghiệm</th>
                        <th className="p-3 border">Trạng thái</th>
                        <th className="p-3 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {tutorRequests.map((req) => (
                        <tr key={req.id} className="bg-white hover:bg-gray-100">
                            <td className="p-3 border">{req.name}</td>
                            <td className="p-3 border">{req.email}</td>
                            <td className="p-3 border">{req.experience}</td>
                            <td className="p-3 border">{req.status}</td>
                            <td className="p-3 border">
                                {req.status === "Chờ duyệt" && (
                                    <button
                                        onClick={() => approveTutor(req.id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                                    >
                                        Duyệt
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApproveTutors;
