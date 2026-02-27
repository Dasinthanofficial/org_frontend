import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import Contact from "./pages/Contact.jsx";
import Join from "./pages/Join.jsx";

import AdminRoute from "./admin/AdminRoute.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminLogin from "./admin/pages/Login.jsx";
import AdminPosts from "./admin/pages/Posts.jsx";
import PostEditor from "./admin/pages/PostEditor.jsx";

import { setAuthToken } from "./lib/api.js";
import HeroManager from "./admin/pages/HeroManager.jsx";

import PartnerManager from "./admin/pages/PartnerManager.jsx";

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setAuthToken(token);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {!isAdmin && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/join" element={<Join />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="/admin/posts" replace />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="posts/new" element={<PostEditor mode="create" />} />
            <Route
              path="posts/:id/edit"
              element={<PostEditor mode="edit" />}
            />
             <Route path="hero" element={<HeroManager />} />

             <Route path="partners" element={<PartnerManager />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
         
        </Routes>
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}