import TopBanner from "./TopBanner";
function About() {
  return (
    <>
      <TopBanner heading="About" />
      <section className="flex justify-between p-12 relative text-gray-700">
        <img
          src="/about-movie-zone.jpg"
          alt="About movie Zone"
          width="400"
          height="400"
        />
        <div className="pt-0 p-8 text-lg">
          <h2 className="text-3xl mb-6">Welcome to MovieZone! 🎥🍿</h2>
          <p className="mb-4">
            MovieZone is your go-to web app for discovering movies and TV shows.
            Whether you’re looking for the latest blockbusters, classic hits, or
            binge-worthy series, MovieZone makes it easy to explore, search, and
            dive into the details of your favorites.
          </p>
          <p className="font-bold mb-4">Key Features: </p>
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
          <p className="mb-8">
            Our goal is simple: help movie lovers find and enjoy the content
            they love, all in one place. Whether you’re planning your next movie
            night or just exploring new shows, MovieZone makes it fun, fast, and
            easy!
          </p>

          <blockquote className="text-lg italic font-bold tracking-wider">
            “Powered by React.js and React Router, MovieZone uses the TMDB API
            to bring real-time movie and TV show data to your screen, all
            wrapped in a clean, responsive, and interactive interface.”
          </blockquote>
        </div>
      </section>
    </>
  );
}

export default About;
