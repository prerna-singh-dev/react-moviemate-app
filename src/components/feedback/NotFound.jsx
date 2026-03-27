import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="w-full flex flex-col justify-center items-center py-50">
      <h1 className="text-8xl mb-4">404</h1>
      <p className="mb-4">Page not found.</p>
      <Link
        to="/"
        className="bg-linear-to-r from-orange-700 to-orange-900 text-white px-4 py-2 rounded-md shadow-md shadow-orange-900/30 hover:from-orange-600 hover:to-orange-800 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4"
      >
        Go back home
      </Link>
    </section>
  );
}

export default NotFound;
