type CategoryFilterProps = {
  categories: string[];
  activeFilter: string;
  onChange: (nextFilter: string) => void;
};

export default function CategoryFilter({ categories, activeFilter, onChange }: CategoryFilterProps) {
  const filters = ["All", ...categories];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`btn ${activeFilter === filter ? "btn-primary" : "btn-outline"}`}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
