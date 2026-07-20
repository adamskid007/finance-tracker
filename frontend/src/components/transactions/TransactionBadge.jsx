function TransactionBadge({ category }) {
  return (
    <span
      className="
        inline-block
        rounded-full
        bg-slate-100
        px-3
        py-1
        text-sm
        font-medium
        text-slate-700
      "
    >
      {category}
    </span>
  );
}

export default TransactionBadge;