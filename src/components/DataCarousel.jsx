import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const DataCarousel = ({ data, category }) => {
  const [slideToShow, setSlideToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlideToShow(8);
      } else if (window.innerWidth >= 768) {
        setSlideToShow(6);
      } else {
        setSlideToShow(4);
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
          <div className="flex justify-between  items-center mb-4">
            <h2 className="text-2xl md:text-3xl mb-3 text-orange-800 font-semibold">
              {category}
            </h2>
            <Link to={category === "Movie" ? "/movies" : "/tv-shows"}>
              <button className="bg-orange-800 text-white px-3 text-sm py-2 cursor-pointer">
                View All
              </button>
            </Link>
          </div>

          <div className="flex gap-2 sm:gap-6 ">
            {data.slice(0, slideToShow).map((item) => {
              return (
                <div key={item.id} className="flex-1 min-w-20 md:min-w-25">
                  <img
                    className="w-full h-auto object-cover"
                    src={`https://image.tmdb.org/t/p/w154/${item.poster_path}`}
                    alt={item.title ?? item.name}
                    title={item.title ?? item.name}
                  />
                  <h3 className="my-2 text-sm line-clamp-2 overflow-hidden">
                    {item.title ?? item.name}
                  </h3>
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
