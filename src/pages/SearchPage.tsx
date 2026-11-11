import { useState } from "react";
import MealCard from "@/components/MealCard";
import SearchBar from "@/components/SearchBar";
import { useSearchMeals } from "@/features/meals/meals.hooks";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const search = useSearchMeals(term);
  const { savedMealIds, create, saved } = useSavedRecipes();
  const results = search.data ?? [];

  return (
    <div className="space-y-4">
      <SearchBar value={term} onChange={setTerm} onSearch={() => undefined} />

      {search.isLoading ? <div className="alert">Loading meals…</div> : null}

      {search.isError ? (
        <div className="alert alert-error">
          <span>Could not reach TheMealDB. Check your connection.</span>
        </div>
      ) : null}

      {!search.isLoading && term && results.length === 0 ? (
        <div className="alert alert-info">
          <span>No meals found for “{term}”. Try another word.</span>
        </div>
      ) : null}

      {!term ? (
        <div className="alert alert-info">
          <span>Search TheMealDB above, then save what you like.</span>
        </div>
      ) : null}

      {results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((meal) => (
            <MealCard
              key={meal.mealId}
              meal={meal}
              isSaved={savedMealIds.has(meal.mealId)}
              isSaving={create.isPending && saved.some((recipe) => recipe.mealId === meal.mealId)}
              onSave={(nextMeal) => {
                if (savedMealIds.has(nextMeal.mealId)) return;
                create.mutate({ ...nextMeal, favorite: false });
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
