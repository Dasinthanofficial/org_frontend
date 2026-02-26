export default function SectionTitle({ kicker, title, subtitle }) {
  return (
    <div className="mb-8 sm:mb-12">
      {kicker && (
        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
          {kicker}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text transition-colors duration-300">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted max-w-2xl leading-relaxed transition-colors duration-300">
          {subtitle}
        </p>
      )}
    </div>
  );
}