import { NavLink } from "react-router-dom";
import HighlightMatches from "./HighlightMatches";

export default function HomeSectionCard({ title, description, to, cta }) {
  return (
    <article className="home-card">
      <h3>
        <HighlightMatches text={title} />
      </h3>
      <p>
        <HighlightMatches text={description} />
      </p>
      <NavLink to={to} className="btn">
        <HighlightMatches text={cta} />
      </NavLink>
    </article>
  );
}
