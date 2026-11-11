export default function RecipeCard({ recipe, onToggleFavorite, onDelete }) {
  const { id, title, category, time, favorite } = recipe;

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title">{title}</h2>

          <button
            type="button"
            className="text-2xl"
            onClick={() => onToggleFavorite(id)}
            aria-label={favorite ? "Remove favorite" : "Mark favorite"}
          >
            {favorite ? "★" : "☆"}
          </button>
        </div>

        <div className="flex gap-2 mt-1">
          <span className="badge badge-primary">{category}</span>
          <span className="badge badge-ghost">{time} min</span>
        </div>

        <div className="card-actions justify-end mt-3">
          <button
            type="button"
            className="btn btn-error btn-sm"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
