import { Inbox } from "lucide-react";

function EmptyState({
  title,
  description,
}) {
  return (
    <div className="py-16 text-center">

      <Inbox
        size={48}
        className="mx-auto text-slate-400"
      />

      <h3 className="mt-4 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

    </div>
  );
}

export default EmptyState;