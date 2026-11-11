import { useQuery } from "@tanstack/react-query";
import { getCategories, getMealById, searchMeals } from "./meals.api";

export function useSearchMeals(searchTerm: string) {
  return useQuery({
    queryKey: ["meals", searchTerm],
    queryFn: () => searchMeals(searchTerm),
    enabled: searchTerm.trim().length > 0,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export function useMeal(mealId: string | undefined) {
  return useQuery({
    queryKey: ["meal", mealId],
    queryFn: () => getMealById(mealId!),
    enabled: Boolean(mealId),
    staleTime: Infinity,
  });
}
