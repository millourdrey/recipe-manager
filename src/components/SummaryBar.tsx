type SummaryBarProps = {
  total: number;
  favorites: number;
};

export default function SummaryBar({ total, favorites }: SummaryBarProps) {
  return (
    <div className="stats shadow w-full">
      <div className="stat">
        <div className="stat-title">Total Recipes</div>
        <div className="stat-value">{total}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Favorites</div>
        <div className="stat-value">{favorites} ★</div>
      </div>
    </div>
  );
}
