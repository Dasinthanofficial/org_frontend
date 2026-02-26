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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-text">
          Manage Blog Posts
        </h2>
        <Link
          to="/admin/posts/new"
          className="px-5 py-2.5 rounded-full bg-primary text-[10px] font-bold tracking-widest text-white uppercase hover:brightness-110 transition shadow-lg w-full sm:w-auto text-center"
        >
          + New Post
        </Link>
      </div>

      <div className="bg-panel border border-border rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 shadow-xl overflow-x-auto transition-colors duration-300">
        {loading ? (
          <div className="text-center text-muted py-10">Loading...</div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-border text-[9px] sm:text-[10px] font-bold tracking-widest text-muted uppercase">
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
                  className="border-b border-border hover:bg-bg1 text-sm text-text transition-colors duration-200"
                >
                  <td className="py-3 sm:py-4 pr-3 max-w-[180px] sm:max-w-[250px] truncate font-medium">
                    {p.title}
                  </td>
                  <td className="py-3 sm:py-4 hidden sm:table-cell text-muted">
                    {p.category}
                  </td>
                  <td className="py-3 sm:py-4 hidden md:table-cell text-muted">
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 sm:py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${p.status === 'published' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 text-right space-x-3 sm:space-x-4 whitespace-nowrap">
                    <Link
                      to={`/admin/posts/${p._id}/edit`}
                      className="text-primary hover:text-text font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => remove(p._id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
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