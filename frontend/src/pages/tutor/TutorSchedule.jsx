import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

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
    return (
        <div className="p-10 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-[#000080] text-center mb-6">
                Lịch dạy của tôi
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scheduleData.map((slot) => (
                    <div
                        key={slot.id}
                        className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4"
                    >
                        <FaCalendarAlt className="text-[#000080] text-4xl" />
                        <div>
                            <h2 className="text-xl font-semibold">
                                {slot.course}
                            </h2>
                            <p className="text-gray-600">Ngày: {slot.date}</p>
                            <p className="text-gray-600">Giờ: {slot.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorSchedule;
