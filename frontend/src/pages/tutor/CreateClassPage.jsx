import React, { useState } from "react";

const CreateClassPage = () => {
    const [formData, setFormData] = useState({
        className: "",
        description: "",
        subject: "",
        schedule: "",
        maxStudents: "",
        price: "",
        students: "", // danh sách email học sinh cách nhau bằng dấu ,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const studentEmails = formData.students
            .split(",")
            .map((email) => email.trim())
            .filter((email) => email !== "");

        const classData = {
            ...formData,
            students: studentEmails,
        };

        alert("Lớp học đã được tạo thành công!");
        console.log("Dữ liệu lớp:", classData);
        // TODO: Gửi classData lên server
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-[#000080] mb-6">
                    Tạo lớp học mới
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">
                            Tên lớp học
                        </label>
                        <input
                            type="text"
                            name="className"
                            value={formData.className}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">
                            Các Bài Học
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700">
                            Chuyên môn
                        </label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                        >
                            <option value="">-- Chọn chuyên môn --</option>
                            <option value="Ielts">Ielts</option>
                            <option value="Toeic">Toeic</option>
                            <option value="Giao Tiếp">Giao Tiếp</option>
                            <option value="Tiếng Anh Trung Học">
                                Tiếng Anh Trung Học
                            </option>
                            <option value="Tiếng Anh Phổ Thông">
                                Tiếng Anh Phổ Thông
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700">Lịch học</label>
                        <input
                            type="text"
                            name="schedule"
                            value={formData.schedule}
                            onChange={handleChange}
                            placeholder="Ví dụ: Thứ 2, 4, 6 - 18h30 đến 20h"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700">
                                Số lượng học viên tối đa
                            </label>
                            <input
                                type="number"
                                name="maxStudents"
                                value={formData.maxStudents}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">
                                Học phí (VNĐ)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700">
                            Thêm học sinh (email, cách nhau bằng dấu phẩy)
                        </label>
                        <textarea
                            name="students"
                            value={formData.students}
                            onChange={handleChange}
                            rows="2"
                            placeholder="ví dụ: hs1@gmail.com, hs2@gmail.com"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#000080]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#000080] text-white py-3 rounded-lg hover:bg-[#000060] transition font-medium"
                    >
                        Tạo lớp học
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateClassPage;
