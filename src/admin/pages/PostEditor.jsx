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
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-text">
            {mode === "create" ? "Create Post" : "Edit Post"}
          </h2>
          <p className="text-sm text-muted mt-1">
            Write your story using Markdown.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Link
            className="px-4 py-2.5 rounded-xl border border-border text-text text-xs sm:text-sm font-semibold hover:bg-bg1 transition text-center flex-1 sm:flex-none"
            to="/admin/posts"
          >
            Cancel
          </Link>
          <button 
            disabled={loading} 
            onClick={() => save("draft")}
            className="px-4 py-2.5 rounded-xl bg-bg1 border border-border text-text text-xs sm:text-sm font-semibold hover:bg-border transition disabled:opacity-50 text-center flex-1 sm:flex-none"
          >
            Save Draft
          </button>
          <GradientButton disabled={loading} onClick={() => save("published")} className="flex-1 sm:flex-none py-2.5">
            Publish Post
          </GradientButton>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 items-start">
        {/* Editor Main Content */}
        <div className="lg:col-span-2 grid gap-4 bg-panel border border-border rounded-2xl p-4 sm:p-6 shadow-sm">
          <div>
            <label className="block text-[10px] sm:text-xs font-bold tracking-widest text-muted uppercase mb-2 ml-1">Post Title</label>
            <input
              className="w-full rounded-xl bg-bg1 border border-border px-4 py-3 text-base sm:text-sm text-text placeholder-muted/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="e.g. The Impact of Education..."
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-[10px] sm:text-xs font-bold tracking-widest text-muted uppercase mb-2 ml-1">Short Excerpt</label>
            <textarea
              className="w-full rounded-xl bg-bg1 border border-border px-4 py-3 text-base sm:text-sm text-text placeholder-muted/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all min-h-[90px] resize-y"
              placeholder="A brief summary for the blog card..."
              value={form.excerpt}
              onChange={(e) => setField("excerpt", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-bold tracking-widest text-muted uppercase mb-2 ml-1">Body Content (Markdown)</label>
            <textarea
              className="w-full rounded-xl bg-bg1 border border-border px-4 py-3 text-base sm:text-sm text-text placeholder-muted/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all min-h-[350px] font-mono resize-y leading-relaxed"
              placeholder="Write your content here using Markdown formatting..."
              value={form.content}
              onChange={(e) => setField("content", e.target.value)}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="grid gap-4 sm:gap-6">
          <div className="rounded-2xl bg-panel border border-border p-4 sm:p-6 shadow-sm">
            <div className="text-[10px] sm:text-xs font-bold tracking-widest text-muted uppercase mb-3">Cover Image</div>
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-bg1 border border-border">
              {form.coverImage?.url ? (
                <img
                  src={form.coverImage.url}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-xs text-muted">
                  No Image Selected
                </div>
              )}
            </div>
            <div className="mt-4 relative">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])}
                className="block w-full text-xs text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition cursor-pointer"
              />
              {uploading && (
                <div className="mt-3 text-xs font-medium text-primary animate-pulse">Uploading to Cloudinary...</div>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-panel border border-border p-4 sm:p-6 shadow-sm">
            <div className="text-[10px] sm:text-xs font-bold tracking-widest text-muted uppercase mb-3">Post Meta</div>
            <div className="grid gap-4">
              <div>
                <label className="block text-xs text-muted mb-1.5 ml-1">Category</label>
                <input
                  className="w-full rounded-xl bg-bg1 border border-border px-3.5 py-2.5 text-base sm:text-sm text-text placeholder-muted/50 outline-none focus:border-primary transition-all"
                  placeholder="e.g. Education"
                  value={form.category}
                  onChange={(e) => setField("category", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1.5 ml-1">Tags (Comma separated)</label>
                <input
                  className="w-full rounded-xl bg-bg1 border border-border px-3.5 py-2.5 text-base sm:text-sm text-text placeholder-muted/50 outline-none focus:border-primary transition-all"
                  placeholder="news, event, update"
                  value={form.tagsText}
                  onChange={(e) => setField("tagsText", e.target.value)}
                />
              </div>
              <div className="pt-2 mt-2 border-t border-border flex items-center justify-between text-sm">
                <span className="text-muted">Current Status:</span>
                <span className={`font-bold capitalize ${form.status === 'published' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {form.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}