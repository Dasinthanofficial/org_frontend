export default function GradientButton({
  as: Comp = "button",
  className = "",
  ...props
}) {
  return (
    <Comp
      className={
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold " +
        "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20 " +
        "hover:shadow-violet-500/35 hover:brightness-110 transition " +
        className
      }
      {...props}
    />
  );
}