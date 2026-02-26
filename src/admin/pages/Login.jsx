import React, { useState } from "react";
import Container from "../../components/Container.jsx";
import { api, setAuthToken } from "../../lib/api.js";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="relative min-h-[85vh] flex items-center justify-center py-12 sm:py-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Container className="relative z-10 flex justify-center">
        <div className="glass rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 w-full max-w-lg border border-white/5 shadow-2xl bg-[#0B0713]/80 backdrop-blur-2xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-10">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-11 sm:w-14 h-11 sm:h-14 rounded-full bg-white flex items-center justify-center text-[#06030E] font-black text-xl sm:text-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                A
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Welcome{" "}
              <span className="text-violet-500 italic font-light pr-1">
                Back
              </span>
            </h1>
            <p className="mt-2 sm:mt-3 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-muted uppercase">
              ABL Admin &bull; Authorized Personnel Only
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-[9px] sm:text-[10px] font-bold tracking-widest text-muted uppercase mb-2 ml-1"
              >
                Admin Email
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-muted pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  id="admin-email"
                  className="w-full bg-[#140D20] border border-white/5 rounded-xl sm:rounded-2xl pl-10 sm:pl-12 pr-4 sm:pr-5 py-3 sm:py-4 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500/50 transition-colors"
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
                className="block text-[9px] sm:text-[10px] font-bold tracking-widest text-muted uppercase mb-2 ml-1"
              >
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-muted pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  id="admin-password"
                  className="w-full bg-[#140D20] border border-white/5 rounded-xl sm:rounded-2xl pl-10 sm:pl-12 pr-4 sm:pr-5 py-3 sm:py-4 text-sm text-white placeholder-white/20 outline-none focus:border-violet-500/50 transition-colors"
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
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase leading-snug">
                  {err}
                </span>
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full mt-3 sm:mt-4 py-3 sm:py-4 rounded-full bg-gradient-to-r from-violet-600 to-purple-800 text-[10px] font-bold tracking-[0.2em] text-white uppercase shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                "Sign In To Dashboard"
              )}
            </button>
          </form>

          <div className="mt-5 sm:mt-8 text-center">
            <Link
              to="/"
              className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-muted hover:text-violet-300 uppercase transition-colors inline-flex items-center gap-2"
            >
              <svg
                className="w-3 sm:w-3.5 h-3 sm:h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Return to Website
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}