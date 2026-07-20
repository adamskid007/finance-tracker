import Spinner from "./Spinner";
function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className= "",
  ...props
}) {
  const variants = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 text-white m-1 cursor-pointer",

    danger:
      "bg-red-600 hover:bg-red-700 text-white m-1 cursor-pointer",

    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-800 m-1 cursor-pointer",
  };

  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        px-4
        py-2
        rounded-lg
        font-medium
        transition-colors
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading && <Spinner size="sm" />}

      {children}
    </button>
  );
}

export default Button;