import React, { useEffect, useState } from "react";
import Container from "../components/Container.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import BlogCard from "../components/BlogCard.jsx";
import { api } from "../lib/api.js";

export default function Blog() {
  const [data, setData] = useState({ posts: [], page: 1, pages: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 9;

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    api
      .get(`/api/blog?page=${page}&limit=${limit}`, {
        signal: controller.signal,
      })
      .then(({ data }) => setData(data))
      .catch((err) => {
        if (err.name !== "CanceledError") {
          setError("Failed to load posts. Please try again.");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [page]);

  return (
    <div className="pt-8 sm:pt-10 pb-16">
      <Container>
        <SectionTitle
          kicker="Blog"
          title="All Blog Posts"
          subtitle="Stories, updates, and insights from our programs on the ground."
        />

        {loading ? (
          <div className="text-muted text-center py-10">Loading posts...</div>
        ) : error ? (
          <div className="text-red-400 text-center py-10">{error}</div>
        ) : data.posts.length === 0 ? (
          <div className="text-muted text-center py-10">No posts found.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.posts.map((p) => (
              <BlogCard key={p._id} post={p} />
            ))}
          </div>
        )}

        {!loading && data.pages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              className="glass rounded-xl px-4 py-2 text-sm disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>
            <div className="text-sm text-muted">
              Page {data.page} / {data.pages}
            </div>
            <button
              className="glass rounded-xl px-4 py-2 text-sm disabled:opacity-50"
              disabled={page >= data.pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}