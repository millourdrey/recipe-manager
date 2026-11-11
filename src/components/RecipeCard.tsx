import type { SavedRecipe } from "@/features/recipes/recipes.types";

type RecipeCardProps = {
  recipe: SavedRecipe;
  onToggleFavorite: (recipe: SavedRecipe) => void;
  onDelete: (id: string) => void;
  onEdit: (recipe: SavedRecipe) => void;
  onView: (recipe: SavedRecipe) => string;
};

export default function RecipeCard({ recipe, onToggleFavorite, onDelete, onEdit, onView }: RecipeCardProps) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="card-title">{recipe.title}</h3>
          </div>
          <button
            type="button"
            className="btn btn-ghost text-xl"
            onClick={() => onToggleFavorite(recipe)}
            aria-label={recipe.favorite ? "Remove favorite" : "Mark favorite"}
          >
            {recipe.favorite ? "★" : "☆"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="badge badge-primary">{recipe.category}</span>
          <span className="badge badge-ghost">{recipe.time} min</span>
        </div>

        {recipe.notes ? <p className="text-sm opacity-70">{recipe.notes}</p> : null}

        <div className="card-actions justify-end gap-2">
          <a href={onView(recipe)} className="btn btn-accent btn-sm">
            View
          </a>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => onEdit(recipe)}>
            Edit
          </button>
          <button type="button" className="btn btn-error btn-sm" onClick={() => onDelete(recipe.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
