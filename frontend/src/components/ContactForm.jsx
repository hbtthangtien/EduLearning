import React, { useState } from "react";
import backgroundImage from "../assest/4.jpg";
import ChatboxWidget from "../components/ChatboxWidget";
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thông tin của bạn đã được gửi!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <>
            <div
                className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed p-10"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="flex flex-wrap w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg">
                    {/* Form Liên hệ */}
                    <div className="w-full md:w-1/2 p-6">
                        <h2 className="text-2xl font-bold text-[#000080] text-center">
                            Liên hệ với chúng tôi
                        </h2>
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-600">
                                    Họ tên
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000080]"
                                    placeholder="Nhập họ tên"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000080]"
                                    placeholder="Nhập email"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">
                                    Nội dung liên hệ
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000080]"
                                    placeholder="Nhập nội dung liên hệ"
                                    rows="4"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#000080] text-white py-3 rounded-lg hover:bg-[#000060] transition font-medium"
                            >
                                Gửi liên hệ
                            </button>
                        </form>
                    </div>

                    {/* Google Maps */}
                    <div className="w-full md:w-1/2 p-6">
                        <h3 className="text-xl font-bold text-[#000080] text-center">
                            Vị trí của chúng tôi
                        </h3>
                        <iframe
                            className="w-full h-64 rounded-lg shadow-lg mt-4"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.506216904016!2d105.52271427471398!3d21.012421688340616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1749011890259!5m2!1svi!2s"
                            width="100%"
                            height="300"
                            style={{ border: "0" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Unique Title for the iframe"
                        ></iframe>
                    </div>
                </div>
            </div>
            <ChatboxWidget />
        </>
    );
};

export default ContactForm;
