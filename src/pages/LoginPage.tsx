import { type FormEvent, useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/auth.hooks";

export default function LoginPage() {
  const [name, setName] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const from = (location.state as { from?: string } | null)?.from ?? "/saved";

  if (isLoggedIn) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;

    login(name);
    navigate(from, { replace: true });
  };

  return (
    <div className="mx-auto max-w-md pt-8">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-4">
          <h2 className="text-3xl font-bold">Sign in</h2>
          <p className="text-sm opacity-75">
            Your saved collection is private. Enter a display name to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="form-control">
              <span className="label-text">Display name</span>
              <input
                ref={nameRef}
                className="input input-bordered"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <button type="submit" className="btn btn-primary w-full" disabled={!name.trim()}>
              Continue
            </button>
          </form>

          <p className="text-xs opacity-70">
            No password, because there is no server. This is a demonstration of route guards, not a
            security boundary.
          </p>
        </div>
      </div>
    </div>
  );
}
