import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./components/feedback/ErrorBoundary";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <ErrorBoundary>
        <main className="flex-1">
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
