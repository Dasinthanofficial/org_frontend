import React, { useState } from "react";
import Container from "../../components/Container.jsx";
import { api, setAuthToken } from "../../lib/api.js";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle.jsx";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/admin/auth/login", {
        email,
        password,
      });
      localStorage.setItem("admin_token", data.token);
      setAuthToken(data.token);
      navigate("/admin/posts");
    } catch (ex) {
      setErr(
        ex?.response?.data?.message || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-10 sm:py-20 px-4 sm:px-0 overflow-hidden bg-bg0 transition-colors duration-300">
      
      {/* Theme Toggle Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-primary/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Container className="relative z-10 flex justify-center w-full">
        <div className="glass rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 w-full max-w-[28rem] border border-border shadow-2xl bg-panel/90 backdrop-blur-2xl transition-colors duration-300">
          
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-text flex items-center justify-center text-bg0 font-black text-xl sm:text-2xl shadow-lg transition-colors duration-300">
                A
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-text tracking-tight transition-colors duration-300">
              Welcome{" "}
              <span className="text-primary italic font-light pr-1">
                Back
              </span>
            </h1>
            <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-muted uppercase transition-colors duration-300">
              ABL Admin &bull; Authorized Only
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-5 sm:space-y-6">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-[10px] sm:text-xs font-bold tracking-widest text-muted uppercase mb-2 ml-1"
              >
                Admin Email
              </label>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input
                  id="admin-email"
                  className="w-full bg-bg1 border border-border rounded-xl sm:rounded-2xl pl-11 sm:pl-12 pr-4 py-3.5 sm:py-4 text-base sm:text-sm text-text placeholder-muted/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  placeholder="admin@action4bl.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-[10px] sm:text-xs font-bold tracking-widest text-muted uppercase mb-2 ml-1"
              >
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  id="admin-password"
                  className="w-full bg-bg1 border border-border rounded-xl sm:rounded-2xl pl-11 sm:pl-12 pr-4 py-3.5 sm:py-4 text-base sm:text-sm text-text placeholder-muted/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {err && (
              <div className="flex items-start sm:items-center gap-3 p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400">
                <svg className="w-5 h-5 shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase leading-relaxed">
                  {err}
                </span>
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full mt-2 py-4 rounded-xl sm:rounded-full bg-primary text-[11px] sm:text-xs font-bold tracking-[0.2em] text-white uppercase shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                "Sign In To Dashboard"
              )}
            </button>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <Link
              to="/"
              className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-muted hover:text-primary uppercase transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Website
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}