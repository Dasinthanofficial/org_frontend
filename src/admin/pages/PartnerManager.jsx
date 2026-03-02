import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function PartnerManager() {
  const [partners, setPartners] = useState([]);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const { data } = await api.get("/api/admin/partners");
      setPartners(data.partners || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function uploadLogo(file) {
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

      setLogo(data.image);
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function createPartner() {
    if (!name || !logo) return;

    try {
      await api.post("/api/admin/partners", {
        name,
        website,
        logo,
      });

      setName("");
      setWebsite("");
      setLogo(null);
      load();
    } catch {
      alert("Failed to add partner.");
    }
  }

  async function remove(id) {
    if (!window.confirm("Remove this partner?")) return;
    await api.delete(`/api/admin/partners/${id}`);
    load();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

      <div className="bg-panel border border-border rounded-3xl p-6 sm:p-10 shadow-lg transition-colors duration-300">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text">
              Partner Companies
            </h2>
            <p className="text-muted text-sm mt-1">
              Manage the organizations displayed in your partner carousel.
            </p>
          </div>

          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">
            {partners.length} {partners.length === 1 ? "Partner" : "Partners"}
          </div>
        </div>

        {/* ================= ADD FORM ================= */}
        <div className="rounded-3xl bg-bg1/40 backdrop-blur-md border border-border p-6 sm:p-10 space-y-6 transition-colors duration-300">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <input
              className="bg-panel border border-border rounded-xl px-4 py-3 text-sm text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
              placeholder="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="bg-panel border border-border rounded-xl px-4 py-3 text-sm text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
              placeholder="Website URL"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />

            <label className="relative flex items-center justify-center h-12 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition overflow-hidden bg-panel">

              {uploading ? (
                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              ) : logo ? (
                <img
                  src={logo.url}
                  alt="Preview"
                  className="h-full object-contain px-3"
                />
              ) : (
                <span className="text-muted text-sm">
                  Upload Logo
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) =>
                  e.target.files?.[0] && uploadLogo(e.target.files[0])
                }
              />
            </label>
          </div>

          <div className="flex justify-center sm:justify-end">
            <button
              onClick={createPartner}
              disabled={!name || !logo || uploading}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-widest hover:brightness-110 transition disabled:opacity-50"
            >
              Add Partner
            </button>
          </div>
        </div>

        {/* ================= LIST ================= */}
        <div className="mt-12">

          {loading ? (
            <div className="text-center text-muted py-10">Loading...</div>
          ) : partners.length === 0 ? (
            <div className="text-center text-muted py-10">
              No partners added yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {partners.map((p) => (
                <div
                  key={p._id}
                  className="relative group bg-panel border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={`${p.logo.url}?f_auto,q_auto,w_400`}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-4 text-center">
                    <div className="text-sm font-bold text-text truncate">
                      {p.name}
                    </div>
                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline block mt-1 truncate"
                      >
                        {p.website.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => remove(p._id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
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