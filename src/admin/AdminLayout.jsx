import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { setAuthToken } from "../lib/api.js";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    localStorage.removeItem("admin_token");
    setAuthToken(null);
    navigate("/");
  }

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="min-h-screen bg-[#06030E] text-white flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-[#0B0715] border-b border-white/5 px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <Link to="/admin/posts" className="flex items-center gap-2 sm:gap-3">
          <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white flex items-center justify-center text-[#06030E] font-black text-base sm:text-lg">
            A
          </div>
          <div className="leading-none">
            <div className="font-serif font-bold text-sm sm:text-lg">
              ABL Admin
            </div>
            <div className="text-[7px] sm:text-[8px] font-bold tracking-[0.2em] sm:tracking-[0.3em] text-muted uppercase mt-0.5 hidden sm:block">
              Blog Manager
            </div>
          </div>
        </Link>

        <nav>
          <Link
            to="/admin/posts"
            className={`px-3 sm:px-5 py-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-wider uppercase transition ${
              isActive("/posts")
                ? "bg-white/10 text-white"
                : "text-muted hover:text-white hover:bg-white/5"
            }`}
          >
            Posts
          </Link>
        </nav>

        <button
          onClick={logout}
          className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-muted hover:text-white transition"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 p-3 sm:p-4 md:p-6 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}