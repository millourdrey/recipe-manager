import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes, onToggleFavorite, onDelete }) {
  if (recipes.length === 0) {
    return (
      <div className="alert alert-info">
        <span>No recipes match this filter.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
