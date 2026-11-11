import type { SavedRecipe } from "@/features/recipes/recipes.types";
import RecipeCard from "./RecipeCard";

type RecipeListProps = {
  recipes: SavedRecipe[];
  onToggleFavorite: (recipe: SavedRecipe) => void;
  onDelete: (id: string) => void;
  onEdit: (recipe: SavedRecipe) => void;
  onView: (recipe: SavedRecipe) => string;
};

export default function RecipeList({
  recipes,
  onToggleFavorite,
  onDelete,
  onEdit,
  onView,
}: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <div className="alert alert-info">
        <span>No recipes match this filter.</span>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          onEdit={onEdit}
          onView={onView}
        />
      ))}
    </div>
  );
}
