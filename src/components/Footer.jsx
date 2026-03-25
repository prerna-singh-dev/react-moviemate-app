import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-orange-900 text-white m-0 ">
      <section className="flex  flex-col justify-between items-center p-6">
        <blockquote className="birthstone-regular text-2xl md:text-3xl my-6">
          <q>Between reality and imagination, every story finds a home.</q>
        </blockquote>
        <nav>
          <ul className="list-none flex gap-8">
            <li className="mb-2 p-2 pl-0 ">
              <Link to="/">Home</Link>
            </li>
            <li className="mb-2 p-2 pl-0 ">
              <Link to="/about">About</Link>
            </li>
            <li className="mb-2 p-2 pl-0 ">
              <Link to="/movies">Movie</Link>
            </li>
            <li className="mb-2 p-2 pl-0 ">
              <Link to="/tv-shows">Tv</Link>
            </li>
          </ul>
        </nav>
      </section>
      <section className="text-center bg-orange-950 text-[12px] py-4 px-4">
        <p>Movie Zone&copy;2026</p>
      </section>
    </footer>
  );
}

export default Footer;
