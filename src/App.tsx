import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import RequireAuth from "@/components/RequireAuth";
import { AuthProvider } from "@/features/auth/auth.hooks";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import RecipeDetailPage from "@/pages/RecipeDetailPage";
import SavedPage from "@/pages/SavedPage";
import SearchPage from "@/pages/SearchPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<SearchPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/recipe/:mealId" element={<RecipeDetailPage />} />

              <Route element={<RequireAuth />}>
                <Route path="/saved" element={<SavedPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
