import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("admin_token");

  if (!token) return <Navigate to="/admin/login" replace />;

  try {
    const decoded = jwtDecode(token);

    // ✅ Check expiration
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("admin_token");
      return <Navigate to="/admin/login" replace />;
    }
  } catch {
    localStorage.removeItem("admin_token");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}