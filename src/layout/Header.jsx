import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pageLocation = useLocation();
  const navId = "primary-navigation";
  const navElements = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Movies", link: "/movies" },
    { name: "Tv Shows", link: "/tv-shows" },
  ];

  useEffect(() => {
    setIsNavOpen(false);
  }, [pageLocation.pathname]);

  return (
    <header className="m-0 py-3 px-5 bg-linear-to-r from-orange-950 via-orange-900 to-orange-950 text-white flex justify-between items-center relative shadow-lg shadow-orange-950/30">
      <h1 className="flex-1 text-2xl bitcount-single-500">
        <NavLink
          to="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 focus-visible:ring-offset-orange-950"
        >
          MovieMate
        </NavLink>
      </h1>
      <button
        type="button"
        aria-label={isNavOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-controls={navId}
        aria-expanded={isNavOpen}
        className="md:hidden p-1.5 bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-950 rounded"
        onClick={() => setIsNavOpen((prev) => !prev)}
      >
        {!isNavOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M6 18L18 6"
            />
          </svg>
        )}
      </button>
      <motion.nav
        id={navId}
        aria-label="Primary"
        className="md:hidden absolute top-14 z-10 left-0 right-0 bg-orange-950 border-t border-white overflow-hidden"
        initial={false}
        animate={{ height: isNavOpen ? "auto" : 0, opacity: isNavOpen ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <ul className="text-xs list-none flex flex-col gap-5 justify-center p-4">
          {navElements.map((element) => (
            <li className="p-1" key={element.name}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-300 border-b-2 border-orange-300 pb-1 hover:text-orange-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-950"
                    : "hover:text-orange-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-950"
                }
                to={element.link}
              >
                {element.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </motion.nav>

      <nav
        aria-label="Primary"
        className="hidden md:block md:relative md:top-0 md:bg-transparent md:p-0"
      >
        <ul className="text-sm list-none flex flex-row gap-5 justify-center">
          {navElements.map((element) => (
            <li className="p-0" key={element.name}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-300 border-b-2 border-orange-300 pb-1 hover:text-orange-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-950"
                    : "hover:text-orange-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-950"
                }
                to={element.link}
              >
                {element.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
