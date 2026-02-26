import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function HeroManager() {
  const [slides, setSlides] = useState([]);
  const [uploading, setUploading] = useState(false);

  async function load() {
    const { data } = await api.get("/api/admin/hero");
    setSlides(data.slides || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function upload(file) {
    try {
      setUploading(true);

      const fd = new FormData();
      fd.append("file", file);

      const { data } = await api.post("/api/admin/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await api.post("/api/admin/hero", { image: data.image });

      await load(); // ✅ important
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function remove(id) {
    await api.delete(`/api/admin/hero/${id}`);
    load();
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Hero Carousel Images</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          e.target.files?.[0] && upload(e.target.files[0])
        }
      />

      {uploading && <div className="mt-4">Uploading...</div>}

      <div className="grid grid-cols-3 gap-4 mt-6">
        {slides.map((s) => (
          <div key={s._id}>
            <img
              src={s.image.url}
              alt=""
              className="rounded-xl object-cover aspect-[16/9]"
              loading="lazy"
            />
            <button
              onClick={() => remove(s._id)}
              className="text-red-500 text-sm mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}