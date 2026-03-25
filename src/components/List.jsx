import { useLoaderData, Link } from "react-router";
import TopBanner from "./TopBanner";
import { useState } from "react";
import useFetch from "../hooks/useFetchData";

const TOTAL_PAGES = 10;
function List({ from }) {
  const data = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <TopBanner heading={`${from}`} />
      <section className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-6 md:gap-8 p-6 md:p-12">
        {data.results.map((item) => {
          return (
            <Link to={`/${from}/${item.id}`} key={item.id}>
              <div className="break-inside-avoid mb-6">
                <img
                  src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                  alt={item.title}
                  width="300"
                  height="400"
                />
                <div className="p-4 bg-gray-100">
                  <h3 className="text-md md:text-xl mb-5 line-clamp-1 overflow-hidden md:line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-md line-clamp-2 overflow-hidden">
                    {item.overview}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
      {/* {data && (
        <section className="flex justify-center mb-12 gap-2">
          {Array(TOTAL_PAGES)
            .keys()
            .map((item, index) => {
              return (
                <button
                  key={`page_${index}`}
                  type="button"
                  onClick={() => setCurrentPage(index + 1)}
                  className="px-4 py-2 text-sm bg-orange-700 text-white"
                >
                  {index + 1}
                </button>
              );
            })}
        </section>
      )} */}
    </>
  );
}

export default List;
