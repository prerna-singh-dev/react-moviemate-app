import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log("ErrorBoundary caught an error::", error, info);
  }

  render() {
    const errorMessage =
      this.state.error?.message || "Something went wrong. Please try again.";

    if (this.state.hasError)
      return (
        <section className="w-full flex flex-col justify-center items-center py-50 px-6 text-center">
          <h1 className="text-4xl md:text-5xl mb-3">Error occurred</h1>
          <p className="text-gray-700 mb-6">{errorMessage}</p>
          <Link
            to="/"
            className="bg-linear-to-r from-orange-700 to-orange-900 text-white px-4 py-2 rounded-md shadow-md shadow-orange-900/30 hover:from-orange-600 hover:to-orange-800 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4"
          >
            Go back home
          </Link>
        </section>
      );
    else return this.props.children;
  }
}

export default ErrorBoundary;
