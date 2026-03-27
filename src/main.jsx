import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import App from "./App";
import { loadData } from "./utils/loadData";
import LoadingUI from "./components/feedback/LoadingUI";
import RouteError from "./components/feedback/RouteError";

const List = lazy(() => import("./pages/List"));
const Details = lazy(() => import("./pages/Details"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./components/feedback/NotFound"));

async function movieDetailsloader({ params }, from) {
  const [data, credits] = await Promise.all([
    loadData(`https://api.themoviedb.org/3/${from}/${params.id}`),
    loadData(`https://api.themoviedb.org/3/${from}/${params.id}/credits`),
  ]);
  return { data, credits, from };
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<RouteError />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route
          path="movies"
          loader={() => loadData("https://api.themoviedb.org/3/discover/movie")}
          element={<List from="movies" />}
        />
        <Route
          path="movies/:id"
          loader={({ params }) => movieDetailsloader({ params }, "movie")}
          element={<Details />}
        />
        <Route
          path="tv-shows"
          loader={() => loadData("https://api.themoviedb.org/3/discover/tv")}
          element={<List from="tv-shows" />}
        />
        <Route
          path="tv-shows/:id"
          loader={({ params }) => movieDetailsloader({ params }, "tv")}
          element={<Details />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<LoadingUI />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
);
