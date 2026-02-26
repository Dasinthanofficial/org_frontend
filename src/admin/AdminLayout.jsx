import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { setAuthToken } from "../lib/api.js";
import ThemeToggle from "../components/ThemeToggle.jsx";

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
    <div className="min-h-screen bg-bg0 text-text flex flex-col font-sans transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-bg1/90 backdrop-blur-xl border-b border-border px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between transition-colors duration-300">
        <Link to="/admin/posts" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-text flex items-center justify-center text-bg0 font-black text-base sm:text-lg transition-colors duration-300 group-hover:scale-105">
            A
          </div>
          <div className="leading-none">
            <div className="font-serif font-bold text-sm sm:text-lg text-text">
              ABL Admin
            </div>
            <div className="text-[7px] sm:text-[8px] font-bold tracking-[0.2em] sm:tracking-[0.3em] text-primary uppercase mt-0.5 hidden sm:block">
              Blog Manager
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/admin/posts"
            className={`px-3 sm:px-5 py-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all ${
              isActive("/posts")
                ? "bg-primary/10 text-primary"
                : "text-muted hover:text-text hover:bg-bg1"
            }`}
          >
            Posts
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <ThemeToggle />
          <div className="w-[1px] h-5 bg-border hidden sm:block"></div>
          <button
            onClick={logout}
            className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-muted hover:text-red-500 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}