import { jwtDecode } from "jwt-decode";


export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = jwtDecode(token);
    // 👉 Kiểm tra key bạn cần: nameid, sub, hay nameidentifier
    return (
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ||
      payload.nameid ||
      payload.sub ||
      null
    );
  } catch (err) {
    console.error("Lỗi decode token:", err);
    return null;
  }
};