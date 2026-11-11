import type { Recipe } from "@/features/meals/meals.types";

type MealCardProps = {
  meal: Recipe;
  isSaved: boolean;
  isSaving: boolean;
  onSave: (meal: Recipe) => void;
};

export default function MealCard({ meal, isSaved, isSaving, onSave }: MealCardProps) {
  return (
    <div className="card bg-base-100 shadow">
      <figure>
        <img src={meal.thumb} alt={meal.title} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{meal.title}</h3>
        <p className="text-sm opacity-70">{meal.category}</p>

        <div className="flex flex-wrap gap-2">
          {meal.ingredients.slice(0, 4).map((ingredient) => (
            <span key={`${meal.mealId}-${ingredient}`} className="badge badge-ghost">
              {ingredient}
            </span>
          ))}
        </div>

        <div className="card-actions justify-end">
          <button
            type="button"
            className="btn btn-primary"
            disabled={isSaved || isSaving}
            onClick={() => onSave(meal)}
          >
            {isSaved ? "Saved" : isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
