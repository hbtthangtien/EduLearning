import React, { useEffect, useState } from "react";

const TutorTypical = () => {
    const [tutors, setTutors] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const res = await fetch("https://localhost:7211/api/home");
                if (!res.ok) throw new Error(`Lỗi ${res.status}`);
                const data = await res.json();
                setTutors(data.tutors);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTutors();
    }, []);

    if (error) return <div className="text-center text-red-600">{error}</div>;

    if (tutors.length === 0)
        return (
            <div className="text-center text-gray-500">
                Đang tải danh sách gia sư…
            </div>
        );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
            {tutors.map((tutor) => (
                <div
                    key={tutor.tutorId}
                    className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition"
                >
                    <img
                        src={"https://www.pinterest.com/pin/1900024838434063/"}
                        alt={tutor.fullName}
                        className="w-24 h-24 rounded-full mx-auto border-4 border-[#000080]"
                    />
                    <h2 className="text-xl font-semibold mt-4">
                        {tutor.fullName}
                    </h2>
                    <p className="text-gray-600">{tutor.specializations}</p>
                </div>
            ))}
        </div>
    );
};

export default TutorTypical;
