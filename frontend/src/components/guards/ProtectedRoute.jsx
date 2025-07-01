import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {useAuth} from "../../context/AuthContext"
const ProtectedRoute = ({ redirectPath = '/login', allowedRoles }) => {
    const token = localStorage.getItem("token");
    const { logout } = useAuth();
    // Không có token → chưa đăng nhập
    if (!token) {
        return <Navigate to={redirectPath} replace />;
    }

    const decoded = jwtDecode(token);

    const role =
        decoded?.role ||
        decoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const userRole = role?.toLowerCase();

    // Nếu có danh sách allowedRoles, nhưng role hiện tại không nằm trong đó
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Redirect đến trang phù hợp
        if (userRole === "student") return <Navigate to="/home" replace />;
        if (userRole === "tutor") return <Navigate to="/tutor" replace />;
        if (userRole === "admin") return <Navigate to="/admin" replace />;
        logout();
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
