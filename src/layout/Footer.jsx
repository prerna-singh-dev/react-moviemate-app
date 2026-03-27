import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-linear-to-r from-orange-950 via-orange-900 to-orange-950 text-white m-0 mt-6 shadow-lg shadow-orange-950/30 border-t border-orange-700/40">
      <section className="flex flex-col justify-between items-center p-6">
        <blockquote className="birthstone-regular text-2xl md:text-3xl my-6">
          <q>Between reality and imagination, every story finds a home.</q>
        </blockquote>
        <nav aria-label="Footer">
          <ul className="list-none flex flex-wrap justify-center gap-4 md:gap-8">
            <li className="mb-2">
              <Link
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 hover:text-orange-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-4 focus-visible:ring-offset-orange-900"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/about"
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 hover:text-orange-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-4 focus-visible:ring-offset-orange-900"
              >
                About
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/movies"
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 hover:text-orange-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-4 focus-visible:ring-offset-orange-900"
              >
                Movie
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/tv-shows"
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 hover:text-orange-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-4 focus-visible:ring-offset-orange-900"
              >
                Tv
              </Link>
            </li>
          </ul>
        </nav>
      </section>
      <section className="text-center bg-black/20 text-[12px] py-4 px-4 border-t border-orange-700/30">
        <p>MovieMate&copy;2026</p>
      </section>
    </footer>
  );
}

export default Footer;
