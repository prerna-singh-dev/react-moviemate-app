import React from "react";
import { Link } from "react-router";

const DataCarousel = ({ data, category }) => {
  return (
    <>
      {data && data.length > 0 && (
        <section className="p-12 relative">
          <div className="flex justify-between  items-center mb-4">
            <h2 className="text-2xl mb-3 text-orange-800 font-semibold">
              {category}
            </h2>
            <Link to={category === "Movie" ? "/movies" : "/tv-shows"}>
              <button className="bg-orange-800 text-white px-3 text-xs py-2 cursor-pointer">
                View All
              </button>
            </Link>
          </div>

          <div className="flex gap-6">
            {data.slice(0, 8).map((item) => {
              return (
                <div key={item.id} className="w-38">
                  <img
                    className=""
                    src={`https://image.tmdb.org/t/p/w154/${item.poster_path}`}
                    alt={item.title ?? item.name}
                    title={item.title ?? item.name}
                  />
                  <h3 className="my-2 text-sm">{item.title ?? item.name}</h3>
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
