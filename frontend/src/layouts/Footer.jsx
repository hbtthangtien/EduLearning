import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#000080] text-white text-center py-6">
            <p>&copy; 2025 Edusync. Tất cả quyền được bảo lưu.</p>
            <div className="mt-4 space-x-6">
                <Link to="/privacy-policy" className="hover:underline">
                    Chính sách bảo mật
                </Link>
                <Link to="/terms-of-service" className="hover:underline">
                    Điều khoản dịch vụ
                </Link>
                <Link to="/contact" className="hover:underline">
                    Liên hệ
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
