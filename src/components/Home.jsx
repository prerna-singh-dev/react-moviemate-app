import useFetch from "../hooks/useFetchData";
import { useState, useEffect, useRef, useMemo } from "react";
import SpinLoader from "./SpinLoader";
import DataCarousel from "./DataCarousel";
import { Link } from "react-router";

function Home() {
  const [toFetchData, setToFetchData] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [fetchSearchResult, setFetchSearchResult] = useState(false);
  const lastCall = useRef(0);

  const [movieFetchData, movieLoading, movieFetchError] = useFetch({
    url: "https://api.themoviedb.org/3/discover/movie",
  });

  const [tvFetchData, tvLoading, tvError] = useFetch(
    toFetchData
      ? {
          url: "https://api.themoviedb.org/3/discover/tv",
        }
      : { url: null }
  );

  const [searchData, searchLoading, searchError] = useFetch(
    fetchSearchResult
      ? {
          url: "https://api.themoviedb.org/3/search/multi",
          query: searchText,
        }
      : { url: null }
  );

  useEffect(() => {
    sessionStorage.removeItem("apiCalled");
    setFetchSearchResult(false);
    setToFetchData(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nowDate = Date.now();
      if (nowDate - lastCall.current >= 500) {
        lastCall.current = nowDate;
        if (window.scrollY >= 150 && !toFetchData) {
          setToFetchData(true);
          sessionStorage.setItem("apiCalled", true);
        }
      }
    };

    if (!sessionStorage.getItem("apiCalled"))
      window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const debounceFun = useMemo(
    () => debounceSearch(() => setFetchSearchResult(true), 600),
    []
  );

  function debounceSearch(runFun, delay) {
    let timer;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => runFun(...args), delay);
    };
  }

  function handleChange(searchText) {
    setSearchText(searchText);
    debounceFun();
  }

  return (
    <>
      <section>
        <div className="w-full h-120 relative">
          <img
            src="/background.jpg"
            alt="Home page banner image below search bar"
            title="MovieMate"
            className="w-full h-full object-cover object-bottom"
          />

          <form className="absolute w-full h-full inset-0 flex justify-center items-center flex-col">
            <div className="bg-black p-8 md:py-12 md:px-15  text-left w-[90%] sm:w-[80%] lg:w-[70%]">
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
                  className="bg-white p-4 w-full block"
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
                      className="py-4 border-b-2 border-dashed border-gray-300 mb-4"
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
                          />
                        ) : (
                          <span className="flex w-22.5 h-33.75 bg-gray-900 text-sm text-white justify-center items-center">
                            No Image
                          </span>
                        )}
                        <div className="flex-1">
                          <h4>{item.title ?? item.name}</h4>
                          <p className="line-clamp-2 overflow-hidden">
                            {item.overview}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                } else return;
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
          {movieLoading && <div className="flex justify-center py-6"></div>}

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
