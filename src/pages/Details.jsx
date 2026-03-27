import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";

function Details() {
  const { data, credits, from } = useLoaderData();

  const movieYear = data.release_date
    ? new Date(data.release_date).getFullYear()
    : "N/A";
  const firstAirYear = data.first_air_date
    ? new Date(data.first_air_date).getFullYear()
    : "N/A";
  const lastAirYear = data.last_air_date
    ? new Date(data.last_air_date).getFullYear()
    : "N/A";
  const tvYears = `${firstAirYear}-${lastAirYear}`;
  const movieTime = () => {
    if (!data.runtime) return "N/A";
    const hrs = Math.floor(data.runtime / 60);
    const mins = data.runtime % 60;
    return `${hrs}h ${mins}m`;
  };

  const Star = ({ size = 20 }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#facc15"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.87 1.402-8.168L.132 9.211l8.2-1.193z" />
    </svg>
  );

  const directorList = credits.crew.filter(
    (item) => item.department === "Directing",
  );

  const writerList = credits.crew.filter(
    (item) => item.department === "Writing",
  );

  const actorsList = credits.cast.slice(0, 5);

  function getPopularityLabel(score) {
    if (score > 100) return "🔥 Trending";
    if (score > 50) return "⭐ Popular";
    if (score > 20) return "👍 Decent";
    return "👀 Low";
  }
  return (
    <>
      <section className="relative">
        <div
          className={`w-full  ${
            !data.backdrop_path ? "h-100 md:h-120" : "h-150"
          } relative`}
        >
          <img
            src={`${
              !data.backdrop_path
                ? `/background.webp`
                : `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
            }`}
            alt={data.title ?? data.name}
            title={data.title ?? data.name}
            className={`block w-full h-full object-cover ${
              !data.backdrop_path ? "object-bottom" : "object-top"
            }`}
          />
        </div>
      </section>
      <section className="p-6 md:p-12">
        <>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
            <h2 className="text-3xl md:text-5xl mb-2 flex-1 wrap-break-word">
              {data.title ?? data.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm md:text-base text-gray-600">
              <Star />
              <span>{data.vote_average.toFixed(1)} / 10</span>
              <span>{getPopularityLabel(data.vote_count)}</span>
            </div>
          </div>

          <div>
            {from === "movie" ? (
              <span className="text-sm text-gray-600 mr-4">{movieYear}</span>
            ) : (
              <>
                <span className="text-sm text-gray-600 mr-4">Tv Series</span>
                <span className="text-sm text-gray-600 mr-4">{tvYears}</span>
              </>
            )}
            {from === "movie" && (
              <span className="text-sm text-gray-600 mr-4">{movieTime()}</span>
            )}
            {from === "tv" && (
              <>
                <span className="text-sm text-gray-600 mr-4">
                  Seasons {data.number_of_seasons}
                </span>
                <span className="text-sm text-gray-600 mr-4">
                  Episodes {data.number_of_episodes}
                </span>
              </>
            )}
            <span className="text-sm text-gray-600">{data.status}</span>
          </div>

          <ul className="list-none flex justify-start gap-3 my-4">
            {data.genres.map((genre) => (
              <li
                key={genre.id}
                className="px-2 py-1 bg-orange-500 text-white text-sm"
              >
                {genre.name}
              </li>
            ))}
          </ul>
          <p className="text-sm md:text-base lg:text-lg">{data.overview}</p>
        </>

        <ul className="my-5 text-sm md:text-base lg:text-lg">
          {from === "movie" && (
            <>
              {directorList && directorList.length > 0 && (
                <li className="py-2 border-b-2 border-dashed border-gray-300 mb-2 flex items-center">
                  <span className="text-base font-medium">Directors : </span>
                  {directorList &&
                    directorList.slice(0, 5).map((director, index, arr) => (
                      <Fragment key={director.id}>
                        <span className="mx-2 text-gray-600">
                          {director.name}
                        </span>
                        {index !== arr.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="w-1 h-1 bg-gray-400 rounded-full inline-block mx-1"
                          ></span>
                        )}
                      </Fragment>
                    ))}
                </li>
              )}
              {writerList && writerList.length > 0 && (
                <li className="py-2 border-b-2 border-dashed border-gray-300 mb-2">
                  <span className="text-base font-medium">Writers : </span>
                  {writerList &&
                    writerList.slice(0, 5).map((writer, index, arr) => (
                      <Fragment key={writer.id}>
                        <span className="mx-2 text-gray-600">
                          {writer.name}
                        </span>
                        {index !== arr.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="w-1 h-1 bg-gray-400 rounded-full inline-block mx-1"
                          ></span>
                        )}
                      </Fragment>
                    ))}
                </li>
              )}
            </>
          )}
          {actorsList && actorsList.length > 0 && (
            <li className="py-2 border-b-2 border-dashed border-gray-300 mb-2">
              <span className="text-base font-medium">Stars</span>
              {actorsList &&
                actorsList.map((actor, index, arr) => (
                  <Fragment key={actor.id}>
                    <span className="mx-2 text-gray-600">{actor.name}</span>
                    {index !== arr.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="w-1 h-1 bg-gray-400 rounded-full inline-block mx-1"
                      ></span>
                    )}
                  </Fragment>
                ))}
            </li>
          )}
        </ul>
      </section>
    </>
  );
}

export default Details;
