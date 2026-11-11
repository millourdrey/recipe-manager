import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRecipe, deleteRecipe, getSavedRecipes, updateRecipe } from "./recipes.api";
import type { RecipePatch, SavedRecipe } from "./recipes.types";

export const RECIPES_KEY = ["recipes"] as const;

export function useSavedRecipes() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: RECIPES_KEY,
    queryFn: getSavedRecipes,
  });

  const create = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_KEY });
    },
  });

  const update = useMutation({
    mutationFn: updateRecipe,
    onMutate: async (newPatch: RecipePatch) => {
      await queryClient.cancelQueries({ queryKey: RECIPES_KEY });
      const previous = queryClient.getQueryData<SavedRecipe[]>(RECIPES_KEY);

      queryClient.setQueryData<SavedRecipe[]>(RECIPES_KEY, (old = []) =>
        old.map((recipe) => (recipe.id === newPatch.id ? { ...recipe, ...newPatch } : recipe)),
      );

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(RECIPES_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_KEY });
    },
  });

  const remove = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_KEY });
    },
  });

  const saved = query.data ?? [];
  const favoriteCount = saved.filter((recipe) => recipe.favorite).length;
  const savedMealIds = new Set(saved.map((recipe) => recipe.mealId));

  const toggleFavorite = (recipe: SavedRecipe) => {
    update.mutate({ id: recipe.id, favorite: !recipe.favorite });
  };

  return {
    query,
    saved,
    favoriteCount,
    savedMealIds,
    create,
    update,
    remove,
    toggleFavorite,
  };
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_KEY });
    },
  });
}

export function useUpdateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRecipe,
    onMutate: async (newPatch: RecipePatch) => {
      await queryClient.cancelQueries({ queryKey: RECIPES_KEY });
      const previous = queryClient.getQueryData<SavedRecipe[]>(RECIPES_KEY);

      queryClient.setQueryData<SavedRecipe[]>(RECIPES_KEY, (old = []) =>
        old.map((recipe) => (recipe.id === newPatch.id ? { ...recipe, ...newPatch } : recipe)),
      );

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(RECIPES_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_KEY });
    },
  });
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPES_KEY });
    },
  });
}
