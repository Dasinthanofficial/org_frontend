import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container.jsx";

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg1 pt-16 sm:pt-20 pb-8 sm:pb-10 overflow-hidden mt-20 sm:mt-24 transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] md:w-[50%] h-[300px] bg-primary/10 blur-[120px] pointer-events-none z-0"></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-text flex items-center justify-center text-bg0 font-black text-lg shadow-md transition-colors duration-300 group-hover:scale-105">
                A
              </div>
              <div className="leading-tight">
                <span className="font-serif font-bold text-lg sm:text-xl tracking-wide text-text block transition-colors duration-300">
                  Action for{" "}
                  <span className="italic text-primary font-light">
                    Better Life
                  </span>
                </span>
              </div>
            </Link>
            <p className="mt-5 sm:mt-6 text-sm text-muted max-w-sm leading-relaxed">
              Empowering individuals with knowledge, resources, and networks to
              create sustainable change in communities across Sri Lanka since
              2008. Supported by Hope4Child Canada.
            </p>

            {/* Social */}
            <div className="mt-6 sm:mt-8 flex items-center gap-3">
              <a
                href="https://facebook.com/action4bl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-full bg-panel border border-border flex items-center justify-center text-muted hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-text uppercase mb-5 sm:mb-6 transition-colors duration-300">
              Explore
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Blog", path: "/blog" },
                { name: "Get Involved", path: "/join" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-text uppercase mb-5 sm:mb-6 transition-colors duration-300">
              Programs
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {[
                "Education",
                "Health",
                "Environment",
                "Livelihoods",
                "Parenting",
              ].map((prog) => (
                <li key={prog}>
                  <Link
                    to="/about"
                    className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors"></span>
                    {prog}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-text uppercase mb-5 sm:mb-6 transition-colors duration-300">
              Contact
            </h4>
            <ul className="space-y-4 sm:space-y-5">
              <li className="flex items-start gap-3 text-sm text-muted">
                <svg
                  className="w-5 h-5 text-primary shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@action4bl.com"
                  className="hover:text-text transition-colors break-all"
                >
                  info@action4bl.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <svg
                  className="w-5 h-5 text-primary shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href="tel:+94778866819" className="hover:text-text transition-colors">
                  +94 77 886 6819
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <svg
                  className="w-5 h-5 text-primary shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="leading-relaxed">
                  39, Vivekananthanagar West,
                  <br />
                  Kilinochchi, Sri Lanka
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Partners */}
        <div className="py-6 sm:py-8 border-t border-b border-border mb-6 sm:mb-8 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
            <span className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
              In Partnership With
            </span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                H
              </div>
              <span className="text-sm text-text font-semibold transition-colors duration-300">
                Hope4Child Canada
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
            &copy; {new Date().getFullYear()} Action for{" "}
            <span className="text-primary">Better Life</span>. All Rights
            Reserved.
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-[10px] font-bold tracking-[0.2em] text-muted uppercase flex-wrap justify-center">
            <Link
              to="/admin/login"
              className="hover:text-primary transition-colors"
            >
              Admin
            </Link>
            <a
              href="https://www.action4bl.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              action4bl.com
            </a>
            <a
              href="https://facebook.com/action4bl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Facebook
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}