import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl py-12 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-lg opacity-80">That page does not exist.</p>
      <Link to="/" className="btn btn-primary mt-6">
        Back to search
      </Link>
    </div>
  );
}
