import React, { useEffect, useState, useMemo } from "react";
// import { Link } from "react-router-dom";
import { FaUserGraduate, FaStar, FaBookOpen } from "react-icons/fa";
import backgroundImage from "../assest/2.jpg";
import { Link } from "react-router-dom";

const TutorList = () => {
    const [tutors, setTutors] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const tutorsPerPage = 4;

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const res = await fetch("https://localhost:7211/api/tutors");
                if (!res.ok) throw new Error(`Lỗi: ${res.status}`);
                const data = await res.json();
                setTutors(data);
            } catch (err) {
                console.error("❌ Lỗi khi fetch tutors:", err.message);
            }
        };

        fetchTutors();
    }, []);

    // 🔍 Filtered tutors
    const filteredTutors = useMemo(() => {
        if (!selectedSpecialty) return tutors;
        return tutors.filter(
            (tutor) =>
                tutor.specializations &&
                tutor.specializations[0]?.toLowerCase() ===
                    selectedSpecialty.toLowerCase()
        );
    }, [tutors, selectedSpecialty]);

    const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);
    const lastIndex = currentPage * tutorsPerPage;
    const firstIndex = lastIndex - tutorsPerPage;
    const currentTutors = filteredTutors.slice(firstIndex, lastIndex);

    return (
        <div
            className="flex min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Sidebar */}
            <aside className="w-1/8 bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-[#000080]">
                    🔎 Lọc Gia Sư
                </h2>
                <div className="mt-4">
                    <h3 className="font-semibold">Theo chuyên ngành:</h3>
                    <select
                        className="w-full p-2 border rounded-lg mt-2"
                        onChange={(e) => {
                            setSelectedSpecialty(e.target.value);
                            setCurrentPage(1);
                        }}
                        value={selectedSpecialty}
                    >
                        <option value="">Tất cả</option>
                        <option value="IELTS">IELTS</option>
                        <option value="TOEIC">TOEIC</option>
                        <option value="Giao Tiếp">Giao Tiếp</option>
                    </select>
                </div>
            </aside>

            {/* Danh sách gia sư */}
            <div className="w-3/4 p-10 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-[#000080] text-center mb-6">
                    Danh sách Gia sư
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentTutors.map((tutor) => (
                        <div
                            key={tutor.id}
                            className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg flex flex-col items-center"
                        >
                            <FaUserGraduate className="text-[#000080] text-6xl mb-3" />
                            <h2 className="text-2xl font-semibold">
                                {tutor.fullName}
                            </h2>
                            <p className="text-gray-600">{tutor.introduces}</p>
                            <p className="text-[#000080] font-medium flex items-center gap-2">
                                <FaBookOpen /> {tutor.specializations?.[0]}
                            </p>
                            <p className="text-yellow-500 flex items-center gap-2">
                                <FaStar /> {tutor.rating} ★
                            </p>

                            <Link
                                to={`/tutor-detail/${tutor.id}`}
                                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition inline-block"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Phân trang */}
                <div className="flex justify-center mt-6 space-x-3">
                    <button
                        onClick={() => setCurrentPage((p) => p - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-lg ${
                            currentPage === 1
                                ? "bg-gray-300"
                                : "bg-[#000080] text-white hover:bg-[#000060] transition"
                        }`}
                    >
                        ◀
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded-lg ${
                                currentPage === index + 1
                                    ? "bg-[#000080] text-white"
                                    : "bg-gray-200 hover:bg-gray-300 transition"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-lg ${
                            currentPage === totalPages
                                ? "bg-gray-300"
                                : "bg-[#000080] text-white hover:bg-[#000060] transition"
                        }`}
                    >
                        ▶
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorList;
