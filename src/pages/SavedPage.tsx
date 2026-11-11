import { useState } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import EditRecipeForm from "@/components/EditRecipeForm";
import RecipeList from "@/components/RecipeList";
import SummaryBar from "@/components/SummaryBar";
import { useCategories } from "@/features/meals/meals.hooks";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";
import type { SavedRecipe } from "@/features/recipes/recipes.types";

export default function SavedPage() {
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState<SavedRecipe | null>(null);

  const categories = useCategories();
  const { query, saved, favoriteCount, toggleFavorite, update, remove } = useSavedRecipes();

  const visible = filter === "All" ? saved : saved.filter((recipe) => recipe.category === filter);

  return (
    <div className="space-y-4">
      {query.isPending ? <div className="alert">Loading saved recipes…</div> : null}

      {query.data ? <SummaryBar total={saved.length} favorites={favoriteCount} /> : null}

      <CategoryFilter
        categories={categories.data ?? []}
        activeFilter={filter}
        onChange={setFilter}
      />

      {editing ? (
        <EditRecipeForm
          recipe={editing}
          onCancel={() => setEditing(null)}
          onSave={(nextRecipe) => {
            update.mutate({ id: nextRecipe.id, time: nextRecipe.time, notes: nextRecipe.notes });
            setEditing(null);
          }}
        />
      ) : null}

      {visible.length > 0 ? (
        <RecipeList
          recipes={visible}
          onToggleFavorite={(recipe) => toggleFavorite(recipe)}
          onDelete={(id) => remove.mutate(id)}
          onEdit={(recipe) => setEditing(recipe)}
          onView={(recipe) => `/recipe/${recipe.mealId}`}
        />
      ) : (
        <div className="alert alert-info">
          <span>No saved recipes in this category yet.</span>
        </div>
      )}
    </div>
  );
}
