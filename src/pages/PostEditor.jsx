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
    let cancelled = false;

    api
      .get("/api/admin/posts")
      .then(({ data }) => {
        if (cancelled) return;
        const post = (data.posts || []).find((p) => p._id === id);
        if (!post) {
          setError("Post not found.");
          return;
        }
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
      .catch(() => {
        if (!cancelled) setError("Failed to load post.");
      });

    return () => {
      cancelled = true;
    };
  }, [mode, id]);

  function setField(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  async function uploadCover(file) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/api/admin/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setField("coverImage", data.image);
    } catch {
      alert("Failed to upload image.");
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
        tags: form.tagsText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
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
    <div>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold">
            {mode === "create" ? "Create Post" : "Edit Post"}
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Cover image stored on Cloudinary.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            className="px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs sm:text-sm"
            to="/admin/posts"
          >
            Cancel
          </Link>
          <GradientButton disabled={loading} onClick={() => save("draft")}>
            Save Draft
          </GradientButton>
          <button
            disabled={loading}
            onClick={() => save("published")}
            className="rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold border border-violet-400/30 text-white hover:bg-white/5 transition"
          >
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-3">
          <input
            className="w-full rounded-xl bg-white/5 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none"
            placeholder="Title"
            aria-label="Post title"
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
          />
          <textarea
            className="w-full rounded-xl bg-white/5 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none min-h-[80px] sm:min-h-[90px]"
            placeholder="Excerpt (short summary)"
            aria-label="Post excerpt"
            value={form.excerpt}
            onChange={(e) => setField("excerpt", e.target.value)}
          />
          <textarea
            className="w-full rounded-xl bg-white/5 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none min-h-[220px] sm:min-h-[320px]"
            placeholder="Content (Markdown supported)"
            aria-label="Post content"
            value={form.content}
            onChange={(e) => setField("content", e.target.value)}
          />
        </div>

        <div className="grid gap-3">
          <div className="rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4">
            <div className="text-sm font-semibold">Cover Image</div>
            <div className="mt-3 aspect-[16/9] rounded-xl overflow-hidden bg-black/30 border border-white/10">
              {form.coverImage?.url ? (
                <img
                  src={form.coverImage.url}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-xs text-muted">
                  No cover image
                </div>
              )}
            </div>
            <div className="mt-3">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) =>
                  e.target.files?.[0] && uploadCover(e.target.files[0])
                }
                className="text-xs sm:text-sm"
                aria-label="Upload cover image"
              />
              {uploading && (
                <div className="mt-2 text-xs text-muted">Uploading...</div>
              )}
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4">
            <div className="text-sm font-semibold">Meta</div>
            <div className="mt-3 grid gap-3">
              <input
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none"
                placeholder="Category"
                aria-label="Post category"
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
              />
              <input
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 sm:px-4 py-2.5 sm:py-3 text-sm outline-none"
                placeholder="Tags (comma separated)"
                aria-label="Post tags"
                value={form.tagsText}
                onChange={(e) => setField("tagsText", e.target.value)}
              />
              <div className="text-xs text-muted">
                Status:{" "}
                <span className="text-white capitalize">{form.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}