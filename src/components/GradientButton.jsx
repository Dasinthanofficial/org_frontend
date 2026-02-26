export default function GradientButton({
  as: Comp = "button",
  className = "",
  ...props
}) {
  return (
    <Comp
      className={
        `inline-flex items-center justify-center rounded-xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase ` +
        `bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25 ` +
        `hover:shadow-violet-500/40 hover:brightness-110 active:scale-[0.98] transition-all duration-200 ` +
        `disabled:opacity-50 disabled:cursor-not-allowed ` +
        className
      }
      {...props}
    />
  );
}