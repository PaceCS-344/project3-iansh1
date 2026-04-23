import { NavLink } from "react-router-dom";

export default function HomeSectionCard({ title, description, to, cta }) {
  return (
    <article className="home-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <NavLink to={to} className="btn">
        {cta}
      </NavLink>
    </article>
  );
}
