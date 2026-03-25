import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
