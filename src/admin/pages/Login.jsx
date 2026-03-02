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
      setErr(ex?.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg0 transition-colors duration-300">

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <Container className="flex justify-center">
        <div className="w-full max-w-md bg-panel border border-border rounded-3xl p-8 sm:p-10 shadow-2xl transition-colors duration-300">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-4">
              A
            </div>

            <h1 className="text-3xl font-serif font-bold text-text">
              Welcome{" "}
              <span className="text-primary italic font-light">Back</span>
            </h1>

            <p className="mt-2 text-xs tracking-widest uppercase text-muted">
              ABL Admin • Authorized Only
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-muted uppercase mb-2">
                Admin Email
              </label>
              <input
                type="email"
                className="w-full bg-panel border border-border rounded-xl px-4 py-3 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                placeholder="admin@action4bl.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold tracking-widest text-muted uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-panel border border-border rounded-xl px-4 py-3 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error */}
            {err && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {err}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold tracking-widest uppercase hover:brightness-110 transition disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In To Dashboard"}
            </button>

          </form>

          {/* Back */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-xs font-bold tracking-widest uppercase text-muted hover:text-primary transition"
            >
              ← Return to Website
            </Link>
          </div>

        </div>
      </Container>
    </div>
  );
}