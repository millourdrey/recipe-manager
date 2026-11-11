import { useRef, useState } from "react";
import type { SavedRecipe } from "@/features/recipes/recipes.types";

type EditRecipeFormProps = {
  recipe: SavedRecipe;
  onCancel: () => void;
  onSave: (nextRecipe: Pick<SavedRecipe, "id" | "time" | "notes">) => void;
};

export default function EditRecipeForm({ recipe, onCancel, onSave }: EditRecipeFormProps) {
  const [time, setTime] = useState(String(recipe.time ?? 0));
  const [notes, setNotes] = useState(recipe.notes ?? "");
  const original = useRef({ time: recipe.time ?? 0, notes: recipe.notes ?? "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextTime = Number(time) || 0;
    const nextNotes = notes.trim();

    if (nextTime === original.current.time && nextNotes === original.current.notes) {
      onCancel();
      return;
    }

    onSave({ id: recipe.id, time: nextTime, notes: nextNotes });
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow p-4 space-y-3">
      <label className="form-control">
        <span className="label-text">Time (minutes)</span>
        <input
          type="number"
          min="0"
          className="input input-bordered"
          value={time}
          onChange={(event) => setTime(event.target.value)}
        />
      </label>

      <label className="form-control">
        <span className="label-text">Notes</span>
        <textarea
          className="textarea textarea-bordered"
          rows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </label>

      <div className="flex justify-end gap-2">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}
