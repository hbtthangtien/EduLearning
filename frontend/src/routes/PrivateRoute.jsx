import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    //  Nếu chưa đăng nhập
    if (!token || !user) {
        return <Navigate to="/login" />;
    }

    //  Nếu không đúng role
    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    //  Truy cập được
    return children;
};

export default PrivateRoute;
