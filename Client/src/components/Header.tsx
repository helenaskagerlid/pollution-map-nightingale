import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header>
        <Link to="/">
          {" "}
          <img
            className="header-logo"
            src="/nightingalelogo.svg"
            alt="nightingale logo"
          />
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/chart">Chart</NavLink>
            </li>
          </ul>
        </nav>
        <button>
          {" "}
          <NavLink to="/contact">Contact us</NavLink>
        </button>
      </header>
    </>
  );
};
