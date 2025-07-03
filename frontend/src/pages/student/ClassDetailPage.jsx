import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
    BookOpenIcon,
    UserIcon,
    ClockIcon,
    InformationCircleIcon,
    CalendarIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { format, parseISO } from "date-fns";

const ClassDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [classInfo, setClassInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClassDetail = async () => {
            try {
                const res = await axios.get(
                    `https://edusyncc-f8atbbd5ene8a3c9.canadacentral-01.azurewebsites.net/api/student/registered-courses/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user?.token}`,
                        },
                    }
                );
                setClassInfo(res.data);
            } catch (err) {
                console.error("Lỗi khi tải chi tiết lớp học:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClassDetail();
    }, [id, user]);

    const getDayName = (dayNumber) => {
        const days = [
            "Chủ Nhật",
            "Thứ Hai",
            "Thứ Ba",
            "Thứ Tư",
            "Thứ Năm",
            "Thứ Sáu",
            "Thứ Bảy",
        ];
        return days[dayNumber] || "Không xác định";
    };

    if (loading) return <p className="text-center pt-24">Đang tải...</p>;
    if (!classInfo)
        return <p className="text-center pt-24">Không tìm thấy lớp học.</p>;

    return (
        <div className="min-h-screen pt-24 px-6 md:px-20 bg-gradient-to-br from-blue-50 to-white">
            <button
                onClick={() => navigate("/my-classes")}
                className="mb-6 inline-flex items-center gap-2 text-blue-700 hover:underline font-medium"
            >
                <ArrowLeftIcon className="w-4 h-4" />
                Trở về lớp học của tôi
            </button>

            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                    <BookOpenIcon className="w-8 h-8 text-blue-600" />
                    <h2 className="text-3xl font-bold text-blue-800">
                        {classInfo.title}
                    </h2>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    <InformationCircleIcon className="w-5 h-5 inline mr-2 text-blue-500" />
                    <span>
                        <strong>Nội Dung:</strong> {classInfo.description}
                    </span>
                </p>

                <div className="space-y-4 text-gray-800 text-base mb-6">
                    <p className="flex items-center gap-2">
                        <UserIcon className="w-5 h-5 text-blue-500" />
                        <span>
                            <strong>Giáo viên:</strong> {classInfo.tutorName}
                        </span>
                    </p>
                    <p className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-blue-500" />
                        <span>
                            <strong>Ngày đăng ký:</strong>{" "}
                            {format(
                                parseISO(classInfo.enrolledDate),
                                "dd/MM/yyyy HH:mm"
                            )}
                        </span>
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                        <span>
                            <strong>Trạng thái:</strong> {classInfo.status}
                        </span>
                    </p>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
                        <ClockIcon className="w-5 h-5" />
                        Lịch học chi tiết:
                    </h3>

                    {classInfo.schedules?.length > 0 ? (
                        classInfo.schedules.map((schedule, idx) => (
                            <div
                                key={idx}
                                className="p-4 mb-3 rounded-xl bg-blue-50 border border-blue-100"
                            >
                                <p>
                                    <strong>Ngày học:</strong>{" "}
                                    {getDayName(schedule.dayOfWeek)}
                                </p>
                                <p>
                                    <strong>Thời gian:</strong>{" "}
                                    {format(
                                        parseISO(schedule.startTime),
                                        "HH:mm"
                                    )}{" "}
                                    -{" "}
                                    {format(
                                        parseISO(schedule.endTime),
                                        "HH:mm"
                                    )}
                                </p>
                                <p>
                                    <strong>Link Meet:</strong>{" "}
                                    {schedule.meetUrl ? (
                                        <a
                                            href={schedule.meetUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            {schedule.meetUrl}
                                        </a>
                                    ) : (
                                        "Chưa có"
                                    )}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">Chưa có lịch học nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassDetailPage;
