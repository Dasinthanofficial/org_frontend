import React, { useEffect, useState } from "react";
import { api } from "../../lib/api.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import GradientButton from "../../components/GradientButton.jsx";

export default function PostEditor({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    category: "General",
    tagsText: "",
    content: "",
    status: "draft",
    coverImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode !== "edit" || !id) return;

    api.get("/api/admin/posts")
      .then(({ data }) => {
        const post = data.posts.find((p) => p._id === id);
        if (!post) return;

        setForm({
          title: post.title || "",
          excerpt: post.excerpt || "",
          category: post.category || "General",
          tagsText: (post.tags || []).join(", "),
          content: post.content || "",
          status: post.status || "draft",
          coverImage: post.coverImage || null,
        });
      })
      .catch(() => setError("Failed to load post."));
  }, [mode, id]);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadCover(file) {
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const { data } = await api.post("/api/admin/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setField("coverImage", data.image);
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function save(nextStatus) {
    setLoading(true);
    setError("");

    try {
      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        category: form.category,
        tags: form.tagsText.split(",").map((s) => s.trim()).filter(Boolean),
        content: form.content,
        coverImage: form.coverImage,
        status: nextStatus || form.status,
      };

      if (mode === "create") {
        await api.post("/api/admin/posts", payload);
      } else {
        await api.put(`/api/admin/posts/${id}`, payload);
      }

      navigate("/admin/posts");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save post.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-serif font-bold text-text">
            {mode === "create" ? "Create Post" : "Edit Post"}
          </h2>
          <p className="text-muted text-sm mt-2">
            Write your story using Markdown.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          <Link
            to="/admin/posts"
            className="px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-text hover:bg-bg1 transition"
          >
            Cancel
          </Link>

          <button
            onClick={() => save("draft")}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-panel border border-border text-sm font-semibold text-text hover:bg-bg1 transition disabled:opacity-50"
          >
            Save Draft
          </button>

          <GradientButton disabled={loading} onClick={() => save("published")}>
            Publish Post
          </GradientButton>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* ================= GRID LAYOUT ================= */}
      <div className="grid gap-8 lg:grid-cols-3">

        {/* ================= MAIN CONTENT ================= */}
        <div className="lg:col-span-2 bg-panel border border-border rounded-3xl p-8 space-y-8 shadow-sm">

          {/* TITLE */}
          <div>
            <label className="block text-xs font-bold tracking-widest text-muted uppercase mb-3">
              Post Title
            </label>
            <input
              className="w-full rounded-xl bg-panel border border-border px-5 py-3 text-text focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              placeholder="e.g. The Impact of Education..."
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
            />
          </div>

          {/* EXCERPT */}
          <div>
            <label className="block text-xs font-bold tracking-widest text-muted uppercase mb-3">
              Short Excerpt
            </label>
            <textarea
              className="w-full rounded-xl bg-panel border border-border px-5 py-3 text-text min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              placeholder="A short summary..."
              value={form.excerpt}
              onChange={(e) => setField("excerpt", e.target.value)}
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="block text-xs font-bold tracking-widest text-muted uppercase mb-3">
              Body Content (Markdown)
            </label>
            <textarea
              className="w-full rounded-xl bg-panel border border-border px-5 py-3 text-text min-h-[350px] font-mono resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              placeholder="Write your content here..."
              value={form.content}
              onChange={(e) => setField("content", e.target.value)}
            />
          </div>

        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="space-y-8">

          {/* COVER IMAGE */}
          <div className="bg-panel border border-border rounded-3xl p-6 shadow-sm">
            <div className="text-xs font-bold tracking-widest text-muted uppercase mb-4">
              Cover Image
            </div>

            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-panel border border-border flex items-center justify-center">
              {form.coverImage?.url ? (
                <img
                  src={form.coverImage.url}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-muted text-sm">
                  No Image Selected
                </span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              className="mt-4 text-sm"
              onChange={(e) =>
                e.target.files?.[0] && uploadCover(e.target.files[0])
              }
            />

            {uploading && (
              <div className="mt-3 text-xs text-primary">
                Uploading...
              </div>
            )}
          </div>

          {/* META */}
          <div className="bg-panel border border-border rounded-3xl p-6 shadow-sm space-y-5">
            <div className="text-xs font-bold tracking-widest text-muted uppercase">
              Post Meta
            </div>

            <input
              className="w-full rounded-xl bg-panel border border-border px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
            />

            <input
              className="w-full rounded-xl bg-panel border border-border px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              placeholder="Tags (comma separated)"
              value={form.tagsText}
              onChange={(e) => setField("tagsText", e.target.value)}
            />

            <div className="text-sm text-muted">
              Current Status:{" "}
              <span className="font-semibold text-text capitalize">
                {form.status}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}