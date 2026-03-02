import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function HeroManager() {
  const [slides, setSlides] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const { data } = await api.get("/api/admin/hero");
      setSlides(data.slides || []);
    } catch (error) {
      console.error("Failed to load slides", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function upload(file) {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Max 5MB.");
      return;
    }

    try {
      setUploading(true);
      const fd = new FormData();
      fd.append("file", file);

      const { data } = await api.post("/api/admin/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await api.post("/api/admin/hero", { image: data.image });
      await load();
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function remove(id) {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;

    setSlides((prev) => prev.filter((s) => s._id !== id));

    try {
      await api.delete(`/api/admin/hero/${id}`);
    } catch (error) {
      alert("Failed to delete.");
      load();
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-panel border border-border rounded-2xl shadow-sm transition-colors duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text">Hero Carousel</h2>
          <p className="text-muted mt-1">
            Manage the images on your home page slider.
          </p>
        </div>

        <span className="bg-bg1 text-muted px-3 py-1 rounded-full text-xs font-medium border border-border">
          {slides.length} {slides.length === 1 ? "Slide" : "Slides"}
        </span>
      </div>

      {/* Upload Zone */}
      <div className="mb-10">
        <label
          className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 
            ${
              uploading
                ? "border-border bg-bg1 opacity-70 cursor-not-allowed"
                : "border-primary/40 bg-bg1/40 hover:bg-primary/5 hover:border-primary"
            }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            {uploading ? (
              <>
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-3"></div>
                <p className="text-sm font-semibold text-primary">
                  Uploading...
                </p>
              </>
            ) : (
              <>
                <svg
                  className="w-10 h-10 mb-3 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>

                <p className="mb-2 text-sm text-muted">
                  <span className="font-semibold text-primary">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-muted-2">
                  JPG, PNG, WebP (Recommended 16:9)
                </p>
              </>
            )}
          </div>

          <input
            type="file"
            className="hidden"
            accept="image/*"
            disabled={uploading}
            onChange={(e) =>
              e.target.files?.[0] && upload(e.target.files[0])
            }
          />
        </label>
      </div>

      {/* Slides Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-video bg-bg1 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : slides.length === 0 ? (
        <div className="text-center py-10 text-muted">
          No slides uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((s) => (
            <div
              key={s._id}
              className="group relative rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-video w-full bg-bg1">
                <img
                  src={s.image.url}
                  alt="Slide"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => remove(s._id)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/40 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
                >
                  Delete
                </button>
              </div>

              {/* Mobile delete */}
              <button
                onClick={() => remove(s._id)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg sm:hidden"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}