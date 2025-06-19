import { FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useUserId } from "../../hooks/useUserId";
import { formatDate } from "../../utils/dateHelper";
const scheduleData = [
    {
        id: 1,
        date: "12/06/2025",
        time: "09:00 - 10:30",
        course: "IELTS Cấp tốc",
    },
    { id: 2, date: "13/06/2025", time: "14:00 - 15:30", course: "TOEIC 750+" },
];

const TutorSchedule = () => {
    const { id, loading, error } = useUserId();
    const [dashError, setDashError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [schedules, setSchedules] = useState(null);
    const [dashLoading, setDashLoading] = useState(true);
    const itemsPerPage = 4;
    useEffect(() => {
        if (!id) return;
        const fetchSchedules = async () => {
            try {
                const res = await fetch(
                    `https://localhost:7211/api/tutors/${id}/slots`
                );
                if (!res.ok) throw new Error(`Lỗi ${res.message}`);
                const { data } = await res.json();
                setSchedules(data);
            } catch (err) {
                setDashError(err.message);
            } finally {
                setDashLoading(false);
            }
        };
        fetchSchedules();
    }, [id]);
    if (dashLoading) {
        return (
            <div className="text-white text-center mt-20">
                Đang thống kê dữ liệu....
            </div>
        );
    }
    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handleBack = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentSchedules = schedules.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(schedules.length / itemsPerPage);
    if (dashError) {
        return (
            <div className="text-red-600 text-center mt-20">
                Có lỗi xảy ra: {dashError}
            </div>
        );
    }
    return (
        <div className="p-10 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-[#000080] text-center mb-6">
                Lịch dạy của tôi
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentSchedules.map((slot) => (
                    <div
                        key={slot.id}
                        className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4"
                    >
                        <FaCalendarAlt className="text-[#000080] text-4xl" />
                        <div>
                            <h2 className="text-xl font-semibold">
                                {slot.courseTitle}
                            </h2>
                            <p className="text-gray-600">Ngày: {formatDate(slot.date)}</p>
                            <p className="text-gray-600">Giờ: {slot.time}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center mt-8 gap-2">
                <button
                    onClick={handleBack}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${currentPage === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                >
                    Back
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded ${currentPage === i + 1
                            ? "bg-blue-700 text-white"
                            : "bg-gray-300 text-black"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};


export default TutorSchedule;
