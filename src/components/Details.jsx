import { useLoaderData } from "react-router";

function Details() {
  const { data, credits, from } = useLoaderData();

  const movieYear = new Date(data.release_date).getFullYear();
  const tvYears = `${new Date(data.first_air_date).getFullYear()}-${new Date(
    data.last_air_date
  ).getFullYear()}`;
  const movieTime = () => {
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
    >
      <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.87 1.402-8.168L.132 9.211l8.2-1.193z" />
    </svg>
  );

  const directorList = credits.crew.filter(
    (item) => item.department === "Directing"
  );

  const writerList = credits.crew.filter(
    (item) => item.department === "Writing"
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
        <img
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          alt=""
          className="block w-full h-150 object-cover object-top"
        />
      </section>
      <section className="m-12">
        <>
          <div className="flex justify-between">
            <h2 className="text-5xl mb-2 flex-1">{data.title}</h2>
            <div className="flex items-center gap-2 text-md text-gray-600">
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
          <p>{data.overview}</p>
        </>

        <ul className="my-5">
          {from === "movie" && (
            <>
              <li className="py-2 border-b-2 border-dashed border-gray-300 mb-2">
                <span className="text-md font-medium">Directors : </span>
                {directorList &&
                  directorList.map((director) => (
                    <span
                      key={director.id}
                      className="mx-2 text-gray-600 text-md"
                    >
                      {director.name}
                    </span>
                  ))}
              </li>
              <li className="py-2 border-b-2 border-dashed border-gray-300 mb-2">
                <span className="text-md font-medium">Writers : </span>
                {writerList &&
                  writerList.map((writer) => (
                    <span
                      key={writer.id}
                      className="mx-2 text-gray-600 text-md"
                    >
                      {writer.name}
                    </span>
                  ))}
              </li>
            </>
          )}
          <li className="py-2 border-b-2 border-dashed border-gray-300 mb-2">
            <span className="text-md font-medium">Stars</span>
            {actorsList &&
              actorsList.map((actor) => (
                <span key={actor.id} className="mx-2 text-gray-600 text-md">
                  {actor.name}{" "}
                  <span className="text-sm">({actor.character})</span>
                </span>
              ))}
          </li>
        </ul>
      </section>
    </>
  );
}

export default Details;
