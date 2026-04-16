import { NavLink } from "react-router-dom";
import { navButtonClass } from "../navButtonClass";

export default function Home() {
  return (
    <section className="section home-intro">
      <h2>Home</h2>
      <p>
        This portfolio is organized into a few short pages. Use the navigation
        at the top, or jump directly:
      </p>
      <nav className="home-jumps" aria-label="Section pages">
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
      </nav>
    </section>
  );
}
