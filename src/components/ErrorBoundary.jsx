import React from "react";
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
    if (this.state.hasError) return <section>{this.state.error}</section>;
    else return this.props.children;
  }
}

export default ErrorBoundary;
