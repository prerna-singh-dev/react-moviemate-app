import { NavLink } from "react-router";

function Header() {
  return (
    <header className="m-0 py-3 px-5 bg-orange-950 text-white flex justify-between items-center">
      <h1 className="flex-1 text-2xl bitcount-single-500">
        <NavLink>MovieMate</NavLink>
      </h1>
      <nav>
        <ul className="text-xs md:text-sm list-none flex flex-row gap-5 justify-center">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 border-b-2 border-orange-600 border-dashed pb-1"
                  : ""
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 border-b-2 border-orange-600 border-dashed pb-1"
                  : ""
              }
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 border-b-2 border-orange-600 border-dashed pb-1"
                  : ""
              }
              to="/movies"
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 border-b-2 border-orange-600 border-dashed pb-1"
                  : ""
              }
              to="/tv-shows"
            >
              Tv Shows
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
