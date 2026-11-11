import type { Recipe } from "@/features/meals/meals.types";

export interface SavedRecipe extends Recipe {
  id: string;
}

export type NewRecipe = Omit<SavedRecipe, "id">;

export type RecipePatch = { id: string } & Partial<
  Pick<SavedRecipe, "favorite" | "time" | "notes">
>;
