import { Link, useNavigate, useParams } from "react-router-dom";
import { useMeal } from "@/features/meals/meals.hooks";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";

export default function RecipeDetailPage() {
  const { mealId } = useParams<{ mealId: string }>();
  const navigate = useNavigate();
  const { saved, savedMealIds, create, remove } = useSavedRecipes();
  const meal = useMeal(mealId);

  if (meal.isPending) {
    return <div className="alert">Loading recipe…</div>;
  }

  if (meal.isError) {
    return <div className="alert alert-error">Could not reach TheMealDB. Check your connection.</div>;
  }

  if (!meal.data) {
    return (
      <div className="mx-auto max-w-xl py-8">
        <div className="alert alert-info">
          <div>
            <h2 className="text-2xl font-bold">No such recipe</h2>
            <p className="mt-2">TheMealDB has no meal with id “{mealId}”.</p>
          </div>
        </div>
        <div className="mt-4">
          <button type="button" className="btn btn-primary" onClick={() => navigate(-1)}>
            Back to search
          </button>
        </div>
      </div>
    );
  }

  const recipe = meal.data;
  const isSaved = savedMealIds.has(recipe.mealId);
  const savedEntry = saved.find((item) => item.mealId === recipe.mealId) ?? null;

  return (
    <div className="mx-auto max-w-3xl space-y-4 py-4">
      <div className="flex items-center justify-between">
        <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
      </div>

      <article className="card bg-base-100 shadow-xl overflow-hidden">
        <img src={recipe.thumb} alt={recipe.title} className="h-64 w-full object-cover" />

        <div className="card-body space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold">{recipe.title}</h1>
              <p className="text-base-content/70">{recipe.category}</p>
            </div>

            <button
              type="button"
              className="btn btn-ghost text-2xl"
              onClick={() => {
                if (!isSaved) {
                  create.mutate({ ...recipe, favorite: true });
                }
              }}
            >
              {isSaved ? "★" : "☆"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="badge badge-primary">{recipe.time} min</span>
            <span className="badge badge-secondary">{recipe.ingredients.length} ingredients</span>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Ingredients</h2>
            <ul className="list-disc pl-6">
              {recipe.ingredients.map((ingredient) => (
                <li key={`${recipe.mealId}-${ingredient}`}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Notes</h2>
            <p>{recipe.notes || "No notes added yet."}</p>
          </div>

          <div className="card-actions justify-end">
            <button
              type="button"
              className="btn btn-primary"
              disabled={isSaved || create.isPending}
              onClick={() => create.mutate({ ...recipe, favorite: false })}
            >
              {isSaved ? "Saved" : create.isPending ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              className="btn btn-error"
              onClick={() => {
                if (savedEntry) {
                  remove.mutate(savedEntry.id);
                }
                navigate("/");
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
