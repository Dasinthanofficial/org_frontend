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
      console.error("Failed to load partners", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function uploadLogo(file) {
    if (!file) return;
    
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const { data } = await api.post("/api/admin/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLogo(data.image);
    } catch (error) {
      alert("Failed to upload logo.");
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
    } catch (error) {
      alert("Failed to add partner.");
    }
  }

  async function remove(id) {
    if (!window.confirm("Are you sure you want to remove this partner?")) return;
    
    try {
      await api.delete(`/api/admin/partners/${id}`);
      load();
    } catch (error) {
      alert("Failed to remove partner.");
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-panel border border-border rounded-2xl sm:rounded-3xl shadow-sm transition-colors duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-text">Partner Companies</h2>
          <p className="text-muted text-sm mt-1">
            Manage the organizations displayed in your partner carousel.
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-primary/20">
          {partners.length} {partners.length === 1 ? "Partner" : "Partners"}
        </div>
      </div>

      {/* Add Partner Form */}
      <div className="bg-bg1 border border-border rounded-2xl p-5 sm:p-6 mb-10 transition-colors duration-300">
        <h3 className="text-[10px] sm:text-xs font-bold tracking-widest text-muted uppercase mb-5">
          Add New Partner
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
          
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-muted mb-2 ml-1">Company Name *</label>
            <input
              className="w-full bg-panel border border-border rounded-xl px-4 py-3 text-sm text-text placeholder-muted/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="e.g. Hope4Child Canada"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-muted mb-2 ml-1">Website URL</label>
            <input
              className="w-full bg-panel border border-border rounded-xl px-4 py-3 text-sm text-text placeholder-muted/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="https://..."
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {/* Custom File Upload */}
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-muted mb-2 ml-1">Company Logo *</label>
            <label
              className={`relative flex items-center justify-center w-full h-[46px] border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 overflow-hidden
                ${uploading ? "border-border bg-panel opacity-70 cursor-not-allowed" 
                : logo ? "border-primary bg-primary/5 hover:bg-primary/10" 
                : "border-border bg-panel hover:border-primary hover:bg-primary/5"}`}
            >
              {uploading ? (
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                  <div className="w-3.5 h-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  Uploading...
                </div>
              ) : logo ? (
                <div className="flex items-center justify-between w-full px-3">
                  <div className="flex items-center gap-2">
                    <img src={logo.url} alt="Preview" className="h-6 w-auto object-contain" />
                    <span className="text-xs font-medium text-text truncate max-w-[100px]">Logo Ready</span>
                  </div>
                  <span className="text-[10px] text-primary hover:text-red-500 transition-colors uppercase font-bold tracking-wider">Change</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-muted group-hover:text-primary transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span className="text-xs font-medium">Upload Image</span>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                disabled={uploading}
                onChange={(e) => e.target.files?.[0] && uploadLogo(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={createPartner}
            disabled={!name || !logo || uploading}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-lg hover:shadow-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Partner
          </button>
        </div>
      </div>

      {/* List Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-48 bg-bg1 rounded-2xl animate-pulse border border-border"></div>
          ))}
        </div>
      ) : partners.length === 0 ? (
        <div className="text-center py-16 text-muted border-2 border-dashed border-border rounded-2xl">
          <p className="text-sm">No partners added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {partners.map((p) => (
            <div
              key={p._id}
              className="group bg-panel border border-border/50 rounded-2xl overflow-hidden text-center relative hover:border-primary/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Flawless Edge-to-Edge Image Block - Using Absolute Inset */}
              <div className="w-full h-28 sm:h-32 bg-transparent relative overflow-hidden">
                <img
                  src={`${p.logo.url}?f_auto,q_auto,w_400`}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out border-none outline-none"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/5 transition-colors duration-500 pointer-events-none"></div>
              </div>
              
              {/* Text Info Block */}
              <div className="p-4 flex flex-col items-center justify-center flex-1 bg-panel relative z-10 border-t border-border/30">
                <div className="text-xs sm:text-sm font-bold text-text truncate w-full">
                  {p.name}
                </div>
                {p.website && (
                  <a 
                    href={p.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[9px] text-primary hover:underline truncate w-full mt-1 block"
                  >
                    {p.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>

              {/* Delete Button */}
              <button
                onClick={() => remove(p._id)}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500/90 backdrop-blur-md hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shadow-sm z-20"
                aria-label="Remove Partner"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}