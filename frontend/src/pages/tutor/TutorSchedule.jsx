import { FaCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useUserId } from "../../hooks/useUserId";
import { formatDate } from "../../utils/dateHelper";

const TutorSchedule = () => {
    const { id, loading, error } = useUserId();
    const [dashError, setDashError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [schedules, setSchedules] = useState([]);
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
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
                <p className="text-xl text-blue-800 font-semibold">Đang thống kê dữ liệu...</p>
            </div>
        );
    }

    if (dashError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-red-600 text-2xl font-bold">Có lỗi xảy ra:</div>
                <div className="mt-2 text-lg text-gray-700">{dashError}</div>
            </div>
        );
    }

    const totalPages = Math.ceil(schedules.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentSchedules = schedules.slice(indexOfFirst, indexOfLast);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };
    const handleBack = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="p-10 min-h-screen bg-gradient-to-br from-[#F3E8FF] to-[#E0EAFC]">
            <h1 className="text-5xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#7F53AC] to-[#647DEE] flex items-center justify-center gap-3 drop-shadow-lg">
                <FaCalendarAlt className="inline-block mr-2 text-5xl text-purple-400" />
                Lịch dạy của tôi
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {currentSchedules.map((slot) => (
                    <div
                        key={slot.id}
                        className="bg-white rounded-3xl shadow-xl p-8 relative flex flex-col gap-3 transition-transform hover:-translate-y-2 duration-200"
                    >
                        <span className="absolute -top-4 left-6 px-4 py-1 rounded-full text-white font-bold shadow-lg bg-gradient-to-r from-pink-400 to-purple-400 text-base select-none">
                            Khóa học {slot.courseTitle}
                        </span>
                        <div className="flex items-center gap-3 mb-2">
                            <FaCalendarAlt className="text-blue-400 text-3xl" />
                            <span className="font-semibold text-gray-700 text-lg">Ngày:</span>
                            <span className="font-bold text-blue-700 text-lg">{formatDate(slot.date)}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {slot.shifts &&
                                slot.shifts.map((shift, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-blue-100 px-4 py-2 rounded-xl font-semibold text-blue-700 shadow hover:bg-blue-200 transition text-base"
                                    >
                                        {shift}
                                    </span>
                                ))}
                        </div>
                        <div className="absolute bottom-4 right-6 text-gray-400 text-sm italic">
                            Mã slot: {slot.id}
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center mt-10 gap-2">
                <button
                    onClick={handleBack}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition
        ${currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:scale-110"
                        }`}
                >
                    &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-full font-bold transition
          ${currentPage === i + 1
                                ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg scale-110"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition
        ${currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:scale-110"
                        }`}
                >
                    &gt;
                </button>
            </div>
        </div>

    );
};

export default TutorSchedule;
