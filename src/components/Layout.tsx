import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/auth.hooks";
import { useSavedRecipes } from "@/features/recipes/recipes.hooks";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `btn btn-sm ${isActive ? "btn-primary" : "btn-ghost"}`;

export default function Layout() {
  const { user, isLoggedIn, logout } = useAuth();
  const { saved } = useSavedRecipes();
  const savedCount = saved.length;

  return (
    <div className="min-h-screen bg-base-200">
      <header className="bg-base-100 shadow">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold">Recipe Manager</h1>

          <nav className="flex flex-wrap items-center gap-2">
            <NavLink to="/" className={linkClass} end>
              Search
            </NavLink>
            <NavLink to="/saved" className={linkClass}>
              Saved
              {isLoggedIn && savedCount > 0 ? (
                <span className="badge badge-sm ml-1">{savedCount}</span>
              ) : null}
            </NavLink>

            {isLoggedIn ? (
              <>
                <span className="text-sm font-medium">{user}</span>
                <button type="button" className="btn btn-sm btn-outline" onClick={logout}>
                  Sign out
                </button>
              </>
            ) : (
              <NavLink to="/login" className={linkClass}>
                Sign in
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
