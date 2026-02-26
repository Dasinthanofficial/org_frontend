import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import Container from "./Container.jsx";
import { setAuthToken } from "../lib/api.js";
import logo from "../assets/logo.jpeg";
import ThemeToggle from "./ThemeToggle.jsx";

const navLinkClass = ({ isActive }) =>
  `block md:inline-block px-4 py-2 md:py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
    isActive
      ? "text-white bg-primary shadow-md"
      : "text-muted hover:text-text hover:bg-bg1 dark:hover:bg-white/5"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("admin_token");

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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-bg0/80 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container className="py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4 relative z-10">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <img 
            src={logo} 
            alt="ABL Logo" 
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md rounded-full"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-1 bg-bg1/50 dark:bg-white/5 p-1 rounded-full border border-border shadow-inner backdrop-blur-md">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
          <NavLink to="/join" className={navLinkClass}>Get Involved</NavLink>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full border border-border text-[10px] font-bold tracking-widest text-text uppercase hover:bg-bg1 transition"
          >
            Contact
          </Link>
          {token && (
            <>
              <div className="w-[1px] h-6 bg-border mx-1"></div>
              <Link to="/admin/posts" className="px-5 py-2.5 rounded-full bg-primary text-[10px] font-bold tracking-widest text-white uppercase shadow-lg hover:shadow-xl transition">
                Dashboard
              </Link>
              <button onClick={logout} className="px-4 py-2.5 rounded-full text-[10px] font-bold tracking-widest text-muted uppercase hover:text-text hover:bg-bg1 transition">
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            className="p-2 text-text hover:text-primary transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* MOBILE DROPDOWN */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-bg0/95 backdrop-blur-2xl border-b border-border transition-all duration-300 overflow-hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <Container className="py-6 flex flex-col gap-2">
          <div className="flex flex-col gap-1 mb-4">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
            <NavLink to="/join" className={navLinkClass}>Get Involved</NavLink>
          </div>
          <div className="h-[1px] w-full bg-border my-2"></div>
          <Link
            to="/contact"
            className="w-full py-3.5 mt-2 rounded-full border border-border text-[10px] font-bold tracking-[0.2em] text-text uppercase text-center hover:bg-bg1 transition"
          >
            Contact Us
          </Link>
          {token && (
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
              <button onClick={() => navigate("/admin/posts")} className="w-full py-3.5 rounded-full bg-primary text-[10px] font-bold tracking-[0.2em] text-white uppercase text-center">
                Admin Dashboard
              </button>
              <button onClick={logout} className="w-full py-3.5 rounded-full border border-border text-[10px] font-bold tracking-[0.2em] text-muted uppercase hover:text-text hover:bg-bg1 transition text-center">
                Logout
              </button>
            </div>
          )}
        </Container>
      </div>
    </header>
  );
}