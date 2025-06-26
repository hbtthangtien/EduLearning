import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../assest/7.jpg";
import qrImage from "../assest/QrImage.jpg";

const EnrollCourse = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showQR, setShowQR] = useState(false);
    const [selectedPayment, setSelectedPayment] =
        useState("Thanh toán khi học");

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(
                    `https://localhost:7211/api/courses/${id}`
                );
                if (!res.ok) throw new Error(`Lỗi ${res.status}`);
                const data = await res.json();
                setCourse(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    // 👉 CHỈ HIỆN QR, không gọi API
    const handleEnroll = () => {
        setMessage("✅ Vui lòng quét mã QR để thanh toán.");
        setShowQR(true);
    };

    if (loading)
        return (
            <p className="text-white text-center mt-20">Đang tải khóa học…</p>
        );

    if (error)
        return (
            <p className="text-red-600 text-center mt-20">Có lỗi: {error}</p>
        );

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center px-6 py-12 text-white"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-3xl w-full text-[#000080]">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Xác nhận Đăng ký Khóa học
                </h1>
                <h2 className="text-2xl font-semibold">{course.title}</h2>
                <p className="mt-2">Giảng viên: {course.tutorBio.fullName}</p>
                <p className="mt-1">Giá/buổi: ${course.pricePerSession}</p>
                <p className="mt-1">
                    Số buổi học: {course.totalSessions || 10}
                </p>
                <p className="mt-1">
                    Tổng cộng: $
                    {course.pricePerSession * (course.totalSessions || 10)}
                </p>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">
                        Phương thức thanh toán
                    </h3>
                    <select
                        className="w-full p-2 border rounded-lg"
                        value={selectedPayment}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                    >
                        <option>Thanh toán khi học</option>
                        <option>Chuyển khoản ngân hàng</option>
                        <option>Ví điện tử (Momo, ZaloPay,...)</option>
                    </select>
                </div>

                <div className="text-center mt-8">
                    <button
                        onClick={handleEnroll}
                        className="bg-[#000080] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#000060] transition"
                    >
                        ✅ Xác nhận Đăng ký
                    </button>

                    {message && (
                        <p className="mt-4 text-red-600 font-medium">
                            {message}
                        </p>
                    )}
                </div>

                {showQR && (
                    <div className="mt-6 text-center">
                        <p className="text-lg font-medium mb-2">
                            📷 Quét mã QR để thanh toán
                        </p>
                        <img
                            src={qrImage}
                            alt="QR Code"
                            className="mx-auto w-64 h-64 border rounded-lg shadow-lg"
                        />
                        <p className="mt-2 text-sm text-gray-600">
                            Sau khi thanh toán, bạn sẽ được xác nhận vào lớp
                            học.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnrollCourse;
