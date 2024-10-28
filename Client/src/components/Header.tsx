import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header>
        <img
          className="header-logo"
          src="../../public/nightingalelogo.svg"
          alt="nightingale logo"
        />
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
            <li>
              <NavLink to="/pollutionMapTest">Pollution Map TEST</NavLink>
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
