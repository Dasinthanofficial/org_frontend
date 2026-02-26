import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import { api } from "../lib/api.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api.get(`/api/blog/${slug}`)
      .then(({ data }) => { if (!cancelled) setPost(data.post); })
      .catch((err) => {
        if (!cancelled) {
          setError(err.response?.status === 404 ? "Post not found." : "Failed to load post.");
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [slug]);

  if (loading) return <div className="pt-10 pb-16 bg-bg0 min-h-screen text-center text-muted py-20">Loading...</div>;
  if (error) return (
    <div className="pt-10 pb-16 bg-bg0 min-h-screen">
      <Container className="text-center py-20">
        <p className="text-red-400 mb-4">{error}</p>
        <Link to="/blog" className="text-sm text-primary hover:text-text">&larr; Back to blog</Link>
      </Container>
    </div>
  );
  if (!post) return null;

  return (
    <div className="pt-8 sm:pt-10 pb-16 bg-bg0 min-h-screen text-text transition-colors duration-300">
      <Container>
        <Link to="/blog" className="text-sm text-muted hover:text-text inline-flex items-center gap-1 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to blog
        </Link>

        <div className="mt-4 glass bg-panel border border-border rounded-2xl sm:rounded-3xl overflow-hidden">
          {post.coverImage?.url && (
            <div className="aspect-[16/7] bg-black/10 dark:bg-black/30">
              <img src={post.coverImage.url} alt={post.title} className="h-full w-full object-cover" />
            </div>
          )}

          <div className="p-5 sm:p-8">
            <div className="text-xs uppercase tracking-[0.22em] text-primary">
              {post.category}
              {post.publishedAt && (
                <> &bull; {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</>
              )}
            </div>
            <h1 className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-text">
              {post.title}
            </h1>
            {post.excerpt && <p className="mt-3 text-muted text-sm sm:text-base">{post.excerpt}</p>}

            <hr className="my-6 border-border" />

            {/* Typography Plugin: neutral for light mode, invert for dark mode */}
            <article className="prose prose-neutral dark:prose-invert max-w-none prose-p:text-muted prose-a:text-primary hover:prose-a:text-text prose-headings:text-text prose-img:rounded-xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content || ""}</ReactMarkdown>
            </article>
          </div>
        </div>
      </Container>
    </div>
  );
}