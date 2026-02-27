import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { setAuthToken } from "../lib/api.js";
import ThemeToggle from "../components/ThemeToggle.jsx";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  function logout() {
    localStorage.removeItem("admin_token");
    setAuthToken(null);
    navigate("/");
  }

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="min-h-screen bg-bg0 text-text flex flex-col transition-colors duration-300">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-bg1/95 backdrop-blur-xl border-b border-border">

        <div className="flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16">

          {/* Logo */}
          <Link to="/admin/posts" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-text flex items-center justify-center text-bg0 font-black">
              A
            </div>
            <div className="hidden sm:block">
              <div className="font-serif font-bold text-lg">ABL Admin</div>
              <div className="text-[8px] tracking-[0.3em] text-primary uppercase">
                Dashboard
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/admin/posts"
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${
                isActive("/posts")
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-text"
              }`}
            >
              Posts
            </Link>

            <Link
              to="/admin/hero"
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${
                isActive("/hero")
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-text"
              }`}
            >
              Hero
            </Link>

            <Link
              to="/admin/partners"
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${
                isActive("/partners")
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-text"
              }`}
            >
              Partners
            </Link>

            <ThemeToggle />

            <button
              onClick={logout}
              className="px-4 py-2 text-xs font-bold uppercase text-muted hover:text-red-500"
            >
              Logout
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-border px-4 pb-4 space-y-2">
            <Link
              to="/admin/posts"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-xl text-sm font-semibold hover:bg-bg1"
            >
              Posts
            </Link>

            <Link
              to="/admin/hero"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-xl text-sm font-semibold hover:bg-bg1"
            >
              Hero
            </Link>

            <Link
              to="/admin/partners"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-xl text-sm font-semibold hover:bg-bg1"
            >
              Partners
            </Link>

            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 rounded-xl text-sm font-semibold text-red-500 hover:bg-bg1"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}