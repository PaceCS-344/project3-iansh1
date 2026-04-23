import { Link, NavLink } from "react-router-dom";
import { navButtonClass } from "../navButtonClass";
import Button from "./Button";

export default function Header({ theme, onToggleTheme, themeFeedback }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div>
          <h1>
            <Link to="/" className="site-title">
              Ian Shimba
            </Link>
          </h1>
          <p className="tagline">
            Computer Science student (Pace University) — software and data
            projects.
          </p>
        </div>
        <nav className="header-nav" aria-label="Main">
          <NavLink to="/" end className={navButtonClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navButtonClass}>
            About
          </NavLink>
          <NavLink to="/skills" className={navButtonClass}>
            Skills
          </NavLink>
          <NavLink to="/projects" className={navButtonClass}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={navButtonClass}>
            Contact
          </NavLink>
          <Button onClick={onToggleTheme} aria-label="Toggle color theme">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </Button>
        </nav>
        <p className="theme-feedback" aria-live="polite">
          {themeFeedback}
        </p>
      </div>
    </header>
  );
}
