import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function ReportManager() {
  const [reports, setReports] = useState([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [flipbookUrl, setFlipbookUrl] = useState("");
  const [coverImage, setCoverImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function load() {
    try {
      const { data } = await api.get("/api/admin/reports");
      setReports(data.reports || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function uploadCover(file) {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Max 5MB allowed");
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const { data } = await api.post("/api/admin/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCoverImage(data.image);
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function createReport() {
    if (!title || !year || !flipbookUrl || !coverImage) {
      alert("All fields required");
      return;
    }

    try {
      await api.post("/api/admin/reports", {
        title,
        year,
        flipbookUrl,
        coverImage,
      });

      setTitle("");
      setYear("");
      setFlipbookUrl("");
      setCoverImage(null);
      load();
    } catch {
      alert("Failed to create report");
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete this report?")) return;

    try {
      await api.delete(`/api/admin/reports/${id}`);
      load();
    } catch {
      alert("Failed to delete");
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="bg-panel border border-border rounded-3xl p-6 sm:p-10 shadow-lg">

        <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-8 text-text">
          Annual Reports
        </h2>

        {/* ================= FORM CARD ================= */}
        <div className="rounded-3xl bg-bg1/40 backdrop-blur-md border border-border p-6 sm:p-10 space-y-6">

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="bg-panel border border-border rounded-xl px-4 py-3 text-sm text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Report Title (e.g. Annual Report 2023)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="bg-panel border border-border rounded-xl px-4 py-3 text-sm text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Year (e.g. 2023)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />

            <input
              className="bg-panel border border-border rounded-xl px-4 py-3 text-sm text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Heyzine Flipbook URL"
              value={flipbookUrl}
              onChange={(e) => setFlipbookUrl(e.target.value)}
            />
          </div>

          {/* Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-muted mb-3">
              Cover Image *
            </label>

            <label className="relative flex items-center justify-center h-40 sm:h-52 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:border-primary transition overflow-hidden bg-panel">

              {uploading ? (
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              ) : coverImage ? (
                <img
                  src={coverImage.url}
                  alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <span className="text-muted text-sm">
                  Click to upload cover
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) =>
                  e.target.files?.[0] && uploadCover(e.target.files[0])
                }
              />
            </label>
          </div>

          <button
            onClick={createReport}
            disabled={uploading}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-primary text-white text-xs font-bold tracking-widest uppercase hover:brightness-110 transition"
          >
            Add Report
          </button>
        </div>

        {/* ================= LIST ================= */}
        <div className="mt-12">
          {loading ? (
            <div className="text-center text-muted py-10">Loading...</div>
          ) : reports.length === 0 ? (
            <div className="text-center text-muted py-10">
              No reports added yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {reports.map((r) => (
                <div
                  key={r._id}
                  className="relative group bg-panel border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  <img
                    src={`${r.coverImage.url}?f_auto,q_auto,w_400`}
                    alt={r.title}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-3 text-xs font-semibold text-text text-center">
                    {r.year}
                  </div>

                  <button
                    onClick={() => remove(r._id)}
                    className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}