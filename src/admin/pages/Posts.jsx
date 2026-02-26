import React, { useEffect, useState } from "react";
import { api } from "../../lib/api.js";
import { Link } from "react-router-dom";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get("/api/admin/posts");
      setPosts(data.posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    try {
      await api.delete(`/api/admin/posts/${id}`);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete post.");
    }
  }

  return (
    <div className="space-y-5 sm:space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-serif font-bold">
          Manage Blog Posts
        </h2>
        <Link
          to="/admin/posts/new"
          className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-800 text-[10px] font-bold tracking-widest text-white uppercase"
        >
          + New Post
        </Link>
      </div>

      <div className="bg-[#0D0814] border border-white/5 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 shadow-2xl overflow-x-auto">
        {loading ? (
          <div className="text-center text-muted py-10">Loading...</div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[480px]">
            <thead>
              <tr className="border-b border-white/5 text-[9px] sm:text-[10px] font-bold tracking-widest text-muted uppercase">
                <th className="py-3 sm:py-4">Title</th>
                <th className="py-3 sm:py-4 hidden sm:table-cell">Category</th>
                <th className="py-3 sm:py-4 hidden md:table-cell">Date</th>
                <th className="py-3 sm:py-4">Status</th>
                <th className="py-3 sm:py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-white/5 hover:bg-white/[0.02] text-sm"
                >
                  <td className="py-3 sm:py-4 pr-3 max-w-[180px] sm:max-w-[250px] truncate">
                    {p.title}
                  </td>
                  <td className="py-3 sm:py-4 hidden sm:table-cell">
                    {p.category}
                  </td>
                  <td className="py-3 sm:py-4 hidden md:table-cell">
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 sm:py-4 capitalize">{p.status}</td>
                  <td className="py-3 sm:py-4 text-right space-x-2 sm:space-x-3 whitespace-nowrap">
                    <Link
                      to={`/admin/posts/${p._id}/edit`}
                      className="text-violet-400 hover:text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => remove(p._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {posts.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-10 text-center text-muted"
                  >
                    No posts yet. Create your first post!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}