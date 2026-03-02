import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="glass bg-panel border border-border rounded-2xl overflow-hidden hover:bg-bg1 dark:hover:bg-white/5 transition group block"
    >
      <div className="aspect-[16/9] bg-black/10 dark:bg-black/30 overflow-hidden">
        {post.coverImage?.url ? (
          <img
            src={post.coverImage.url}
            alt={post.title}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-primary tracking-wide font-medium">
          {post.category || "General"}
        </div>
        <div className="mt-1 text-base font-semibold leading-snug text-text">
          {post.title}
        </div>
        {post.excerpt && (
          <p className="mt-2 text-sm text-muted line-clamp-2">{post.excerpt}</p>
        )}
        <div className="mt-3 text-xs text-muted-2">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : ""}
        </div>
      </div>
    </Link>
  );
}