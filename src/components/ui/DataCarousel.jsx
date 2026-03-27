import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const DataCarousel = ({ data, category }) => {
  const [slideToShow, setSlideToShow] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlideToShow(8);
      } else if (window.innerWidth >= 768) {
        setSlideToShow(6);
      } else if (window.innerWidth >= 640) {
        setSlideToShow(4);
      } else {
        setSlideToShow(2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {data && data.length > 0 && (
        <section className="p-6 md:p-12 relative">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <h2 className="text-2xl md:text-3xl text-orange-800 font-semibold">
              {category}
            </h2>
            <Link
              to={category === "Movie" ? "/movies" : "/tv-shows"}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4"
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="inline-block bg-linear-to-r from-orange-700 to-orange-900 text-white px-3 text-sm py-2 rounded-md shadow-md shadow-orange-900/30 cursor-pointer"
              >
                View All
              </motion.span>
            </Link>
          </div>

          <div className="flex gap-2 sm:gap-4 md:gap-6 overflow-x-auto pb-2">
            {data.slice(0, slideToShow).map((item) => {
              return (
                <div key={item.id} className="flex-1 min-w-24 md:min-w-25">
                  <Link
                    to={
                      (category === "Movie" ? "/movies/" : "/tv-shows/") +
                      item.id
                    }
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4"
                    aria-label={`View details for ${item.title ?? item.name}`}
                  >
                    {item.poster_path ? (
                      <img
                        className="w-full h-auto object-cover"
                        src={`https://image.tmdb.org/t/p/w154/${item.poster_path}`}
                        alt={item.title ?? item.name}
                        title={item.title ?? item.name}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full aspect-2/3 bg-gray-900 text-white flex items-center justify-center text-xs">
                        No Image
                      </div>
                    )}
                    <h3 className="my-2 text-sm line-clamp-2 overflow-hidden">
                      {item.title ?? item.name}
                    </h3>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default DataCarousel;
