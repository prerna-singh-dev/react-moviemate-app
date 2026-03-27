import TopBanner from "../layout/TopBanner";

function About() {
  return (
    <>
      <TopBanner heading="About" />
      <section className="flex justify-between p-6 md:p-12 relative text-gray-700">
        <img
          src="/about-movie-zone.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="hidden md:inline-flex w-100 h-100 lg:w-150 lg:h-150"
        />
        <div className="p-0 md:pt-0 md:p-8 text-sm md:text-base lg:text-lg">
          <h2 className="text-xl lg:text-3xl sm:mb-3 mb-6 font-bold">
            Welcome to MovieMate!<span aria-hidden="true"> 🎥🍿</span>
          </h2>
          <p className="mb-4">
            MovieMate is your go-to web app for discovering movies and TV shows.
            Whether you’re looking for the latest blockbusters, classic hits, or
            binge-worthy series, MovieMate makes it easy to explore, search, and
            dive into the details of your favorites.
          </p>
          <h3 className="font-bold mb-4">Key Features: </h3>
          <ul className="mb-4">
            <li className="mb-2">
              <span className="font-bold">Browse Movies & TV Shows</span> – View
              curated lists of popular titles.
            </li>
            <li className="mb-2">
              <span className="font-bold">Detailed Information</span> – Get all
              the essential info for any movie or show, from plot summaries to
              ratings.
            </li>
            <li className="mb-2">
              <span className="font-bold">Quick Search</span> – Find your
              favorite movies and shows right from the homepage.
            </li>
          </ul>
          <p className="mb-4 lg:mb-8">
            Our goal is simple: help movie lovers find and enjoy the content
            they love, all in one place. Whether you’re planning your next movie
            night or just exploring new shows, MovieMate makes it fun, fast, and
            easy!
          </p>

          <blockquote className="text-sm md:text-base lg:text-lg italic font-bold tracking-wider">
            “Powered by React.js and React Router, MovieMate uses the TMDB API
            to bring real-time movie and TV show data to your screen, all
            wrapped in a clean, responsive, and interactive interface.”
          </blockquote>
        </div>
      </section>
    </>
  );
}

export default About;
