const FILTERS = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

export default function CategoryFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`btn ${activeFilter === filter ? "btn-primary" : "btn-outline"}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
