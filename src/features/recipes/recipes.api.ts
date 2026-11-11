import type { NewRecipe, RecipePatch, SavedRecipe } from "./recipes.types";

const KEY = "saved-recipes";

const read = (): SavedRecipe[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as SavedRecipe[];
  } catch {
    return [];
  }
};

const write = (rows: SavedRecipe[]) => {
  localStorage.setItem(KEY, JSON.stringify(rows));
};

export async function getSavedRecipes(): Promise<SavedRecipe[]> {
  return read();
}

export async function createRecipe(recipe: NewRecipe): Promise<SavedRecipe> {
  const row: SavedRecipe = { ...recipe, id: crypto.randomUUID() };
  write([...read(), row]);
  return row;
}

export async function updateRecipe({ id, ...patch }: RecipePatch): Promise<SavedRecipe> {
  const rows = read().map((row) => (row.id === id ? { ...row, ...patch } : row));
  write(rows);

  const updated = rows.find((row) => row.id === id);
  if (!updated) {
    throw new Error("Recipe not found");
  }

  return updated;
}

export async function deleteRecipe(id: string): Promise<{ id: string }> {
  write(read().filter((row) => row.id !== id));
  return { id };
}
