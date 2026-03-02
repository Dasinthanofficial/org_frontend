import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import Container from "./Container.jsx";
import { setAuthToken } from "../lib/api.js";
import logo from "../assets/logo.jpeg";
import ThemeToggle from "./ThemeToggle.jsx";

const navLinkClass = ({ isActive }) =>
  `block w-full lg:w-auto px-5 py-3.5 lg:inline-block lg:px-5 lg:py-2.5 
   rounded-xl lg:rounded-full 
   text-[14px] lg:text-[14px]
   font-bold tracking-[0.2em] transition-all duration-300 ${
     isActive
       ? "text-white bg-gradient-to-r from-primary to-purple-600 shadow-md"
       : "text-text hover:text-primary"
   }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("admin_token");
  const isHome = location.pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function logout() {
    localStorage.removeItem("admin_token");
    setAuthToken(null);
    navigate("/");
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-white/70 dark:bg-[#0B0713]/70 backdrop-blur-xl border-b border-border shadow-md"
            : "bg-transparent"
        }`}
      >
        <Container className="py-3 sm:py-4 flex items-center justify-between gap-4">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="ABL Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-2 bg-white/50 dark:bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-border">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About ABLe</NavLink>
            <NavLink to="/blog" className={navLinkClass}>What We Do</NavLink>
            <NavLink to="/join" className={navLinkClass}>Get Involved</NavLink>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-full bg-text text-bg0 text-[14px] font-bold tracking-widest uppercase hover:opacity-90 transition"
            >
              Contact
            </Link>

            {token && (
              <>
                <Link
                  to="/admin/posts"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white text-[10px] font-bold tracking-widest uppercase"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-xs font-bold uppercase text-muted hover:text-red-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setOpen(!open)} className="p-2">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </Container>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-bg0 border-t border-border px-6 py-6 flex flex-col gap-3">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
            <NavLink to="/join" className={navLinkClass}>Get Involved</NavLink>

            <Link
              to="/contact"
              className="mt-4 py-3 rounded-xl bg-text text-bg0 text-center text-[11px] font-bold tracking-[0.2em] uppercase"
            >
              Contact Us
            </Link>

            {token && (
              <>
                <button
                  onClick={() => navigate("/admin/posts")}
                  className="mt-3 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white text-[11px] font-bold uppercase"
                >
                  Admin Dashboard
                </button>
                <button
                  onClick={logout}
                  className="mt-2 py-3 rounded-xl border border-red-500/20 text-red-500 text-[11px] font-bold uppercase"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Spacer */}
      {!isHome && <div className="h-[76px] sm:h-[84px]" />}
    </>
  );
}