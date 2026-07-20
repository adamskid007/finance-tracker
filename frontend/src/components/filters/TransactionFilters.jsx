import Card from "../common/Card";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

function TransactionFilters({
  filters,
  setFilters,
  setPage,
}) {
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      type: "",
      startDate: "",
      endDate: "",
      sort: "date",
      order: "desc",
    });
  };

  return (
    <Card className="mb-8">
      <h2 className="text-xl font-semibold mb-6">
        Filters
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Input
          label="Search"
          name="search"
          placeholder="Search title..."
          value={filters.search}
          onChange={handleChange}
        />

        <Input
          label="Category"
          name="category"
          placeholder="Food"
          value={filters.category}
          onChange={handleChange}
        />

        <Select
          label="Type"
          name="type"
          value={filters.type}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </Select>

        <Input
          label="From"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
        />

        <Input
          label="To"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
        />

        <Select
          label="Sort By"
          name="sort"
          value={filters.sort}
          onChange={handleChange}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
          <option value="title">Title</option>
        </Select>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="secondary" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </Card>
  );
}

export default TransactionFilters;