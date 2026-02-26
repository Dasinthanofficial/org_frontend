export default function SectionTitle({ kicker, title, subtitle }) {
  return (
    <div className="mb-8">
      {kicker && (
        <div className="text-xs uppercase tracking-[0.22em] text-violet-200/80">
          {kicker}
        </div>
      )}
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-sm sm:text-base text-muted">{subtitle}</p>
      )}
    </div>
  );
}