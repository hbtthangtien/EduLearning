import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "https://localhost:7211";

const getAccessToken = () => localStorage.getItem("token");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("Không tìm thấy refresh token");

    const response = await fetch(`${API_BASE_URL}/api/Auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
        throw new Error("Làm mới token thất bại");
    }

    const data = await response.json();
    if (data.success && data.data?.accessToken) {
        saveTokens(data.data.accessToken, data.data.refreshToken);
        return data.data.accessToken;
    }

    throw new Error("Phản hồi không hợp lệ từ API refresh");
};

export const fetchWithAuth = async (url, options = {}) => {
    let token = getAccessToken();

    // Kiểm tra xem token còn hạn không
    if (token) {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
            try {
                token = await refreshAccessToken();
            } catch (error) {
                console.error("❌ Không thể refresh token:", error.message);
                throw error;
            }
        }
    }

    const finalOptions = {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };

    const res = await fetch(`${API_BASE_URL}${url}`, finalOptions);

    return res;
};
