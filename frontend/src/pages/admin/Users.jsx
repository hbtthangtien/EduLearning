import React from "react";

const users = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        role: "Học viên",
    },
    {
        id: 2,
        name: "Trần Thị B",
        email: "tranthib@example.com",
        role: "Giáo viên",
    },
    {
        id: 3,
        name: "Lê Văn C",
        email: "levanc@example.com",
        role: "Quản trị viên",
    },
];

const Users = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-[#000080]">
                Quản lý Người dùng
            </h1>
            <table className="w-full mt-6 border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-[#000080] text-white">
                        <th className="p-3 border">ID</th>
                        <th className="p-3 border">Tên</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Vai trò</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="bg-white hover:bg-gray-100"
                        >
                            <td className="p-3 border">{user.id}</td>
                            <td className="p-3 border">{user.name}</td>
                            <td className="p-3 border">{user.email}</td>
                            <td className="p-3 border">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
