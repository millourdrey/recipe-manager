import { useState } from "react";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert"];

export default function RecipeForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle || !category) {
      return;
    }

    onAdd({ title: trimmedTitle, category, time: Number(time) || 0 });
    setTitle("");
    setCategory("");
    setTime("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow p-4 grid grid-cols-1 md:grid-cols-4 gap-3"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe title"
        className="input input-bordered md:col-span-2"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select select-bordered"
      >
        <option value="">Select category</option>
        {CATEGORIES.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Time (min)"
        min="0"
        className="input input-bordered"
      />

      <button type="submit" className="btn btn-primary md:col-span-4">
        Add Recipe
      </button>
    </form>
  );
}
