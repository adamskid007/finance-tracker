import Button from "./Button";

function Pagination({
  page,
  totalPages,
  onPageChange,
}) 
  {
    const pages = Array.from({length: totalPages}, (_, index) => index + 1);
  return (
    <div className="flex items-center justify-between mt-6">
      <Button
        variant="secondary"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {pages.map((pageNumber) => (
          <Button
            variant="secondary"
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`
              px-3
              py-2
              rounded-md
              transition-colors
              ${
                page === pageNumber
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }
            `}
          >
            {pageNumber}
          </Button>
        ))}
      </div>

      <Button
        variant="secondary"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;