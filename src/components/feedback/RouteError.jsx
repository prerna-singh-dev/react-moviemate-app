import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

function RouteError() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "We could not load this page. Please try again.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <section className="w-full flex flex-col justify-center items-center py-50 px-6 text-center">
      <h1 className="text-4xl md:text-5xl mb-3">{title}</h1>
      <p className="text-gray-700 mb-6">{message}</p>
      <Link
        to="/"
        className="bg-linear-to-r from-orange-700 to-orange-900 text-white px-4 py-2 rounded-md shadow-md shadow-orange-900/30 hover:from-orange-600 hover:to-orange-800 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4"
      >
        Go back home
      </Link>
    </section>
  );
}

export default RouteError;
