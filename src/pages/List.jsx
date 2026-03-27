import { useLoaderData, Link } from "react-router-dom";
import TopBanner from "../layout/TopBanner";

function List({ from }) {
  const data = useLoaderData();

  return (
    <>
      <TopBanner heading={`${from}`} />
      <section className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-8 p-4 sm:p-6 md:p-12">
        {data.results.map((item) => {
          return (
            <Link
              to={`/${from}/${item.id}`}
              key={item.id}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4"
              aria-label={`View details for ${item.title ?? item.name}`}
            >
              <div className="break-inside-avoid mb-6">
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                    alt={item.title ?? item.name}
                    width="300"
                    height="400"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full aspect-3/4 bg-gray-900 text-white flex items-center justify-center text-xs">
                    No Image
                  </div>
                )}
                <div className="p-4 bg-gray-100">
                  <h3 className="text-base md:text-xl mb-5 line-clamp-1 overflow-hidden md:line-clamp-2">
                    {item.title ?? item.name}
                  </h3>
                  <p className="text-sm md:text-base line-clamp-2 overflow-hidden">
                    {item.overview}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}

export default List;
