import useFetch from "../hooks/useFetchData";
import { useState, useEffect } from "react";
import SpinLoader from "../components/ui/SpinLoader";
import DataCarousel from "../components/ui/DataCarousel";
import { Link } from "react-router-dom";

function Home() {
  const [toFetchData, setToFetchData] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const [movieFetchData, movieLoading] = useFetch({
    url: "https://api.themoviedb.org/3/discover/movie",
  });

  const [tvFetchData, tvLoading] = useFetch(
    toFetchData
      ? {
          url: "https://api.themoviedb.org/3/discover/tv",
        }
      : { url: null },
  );

  const [searchData] = useFetch(
    debouncedSearchText
      ? {
          url: "https://api.themoviedb.org/3/search/multi",
          query: debouncedSearchText,
        }
      : { url: null },
  );

  useEffect(() => {
    const trimmedSearchText = searchText.trim();
    if (!trimmedSearchText) {
      setDebouncedSearchText("");
      return;
    }

    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(trimmedSearchText);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  useEffect(() => {
    if (toFetchData) return;

    // Fetch TV list once after the user scrolls down.
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setToFetchData(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toFetchData]);

  function handleChange(searchText) {
    setSearchText(searchText);
  }

  return (
    <>
      <section>
        <div className="w-full h-120 relative">
          <picture>
            <source
              media="(max-width: 1280px)"
              srcSet="/background-1280.webp"
            />
            <source
              media="(min-width: 1281px)"
              srcSet="/background-1920.webp"
            />
            <img
              src="/background-1920.webp"
              alt="Home page banner image with search bar"
              title="MovieMate"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-bottom"
            />
          </picture>

          <form
            className="absolute w-full h-full inset-0 flex justify-center items-center flex-col"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="bg-black/70 backdrop-blur-sm border border-white/20 rounded-xl p-8 md:py-12 md:px-15 text-left w-[90%] sm:w-[80%] lg:w-[70%] shadow-2xl shadow-black/40">
              <label
                htmlFor="searchBar"
                className="text-xl md:text-2xl mb-5 text-white block"
              >
                Find your favourite movie or tv shows
              </label>
              <div className="w-full flex justify-start items-center">
                <input
                  type="search"
                  name="searchBar"
                  id="searchBar"
                  className="bg-white/95 rounded-md p-4 w-full block shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4"
                  value={searchText}
                  placeholder="Search..."
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
      </section>

      {searchText ? (
        <section className="p-6 md:p-12">
          {searchData?.results?.length > 0 ? (
            <ul>
              {searchData.results.map((item) => {
                if (item.media_type === "movie" || item.media_type === "tv") {
                  return (
                    <li
                      className="group p-4 bg-gray-100 mb-4 pr-10 relative border border-gray-200 transition-all duration-200 ease-out hover:shadow-md hover:translate-x-1"
                      key={item.id}
                    >
                      <Link
                        to={
                          (item.media_type === "movie"
                            ? "movies/"
                            : "tv-shows/") + item.id
                        }
                        className="flex flex-row gap-4"
                      >
                        {item.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`}
                            alt={item.title ?? item.name}
                            title={item.title ?? item.name}
                            width="90"
                            height="90"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <span className="flex w-22.5 h-33.75 bg-gray-900 text-sm text-white justify-center items-center">
                            No Image
                          </span>
                        )}
                        <div className="flex-1">
                          <h4 className="text-lg font-bold mb-2">
                            {item.title ?? item.name}
                          </h4>
                          <p className="line-clamp-2 overflow-hidden">
                            {item.overview}
                          </p>
                          <span className="absolute top-0 right-5 flex items-center justify-center h-full text-orange-600 transition-transform duration-200 ease-out group-hover:translate-x-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={4}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 6l6 6-6 6"
                              />
                            </svg>
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                } else return null;
              })}
            </ul>
          ) : searchData?.results?.length === 0 ? (
            <p className="text-center text-lg p-6">No data found!!</p>
          ) : (
            <div className="flex justify-center py-6">
              <SpinLoader />
            </div>
          )}
        </section>
      ) : (
        <>
          {movieLoading && (
            <div className="flex justify-center py-6">
              <SpinLoader />
            </div>
          )}

          {movieFetchData?.results?.length > 0 && (
            <DataCarousel data={movieFetchData["results"]} category="Movie" />
          )}

          {tvLoading && (
            <div className="flex justify-center py-6">
              <SpinLoader />
            </div>
          )}
          {tvFetchData?.results?.length > 0 && (
            <DataCarousel data={tvFetchData["results"]} category="TV Shows" />
          )}
        </>
      )}
    </>
  );
}

export default Home;
