import HomeSectionCard from "../components/HomeSectionCard";
import HighlightMatches from "../components/HighlightMatches";
import { HOME_SECTIONS } from "../content/homeSections";
import { useSectionSearch } from "../hooks/useSectionSearch";

const HOME_SEARCH_TEXT = [
  "Portfolio overview",
  ...HOME_SECTIONS.flatMap((s) => [s.title, s.description, s.cta]),
].join(" ");

export default function Home() {
  const { ref } = useSectionSearch(HOME_SEARCH_TEXT);

  return (
    <section
      ref={ref}
      tabIndex={-1}
      className="section home-intro search-scroll-root"
    >
      <h2>
        <HighlightMatches text="Portfolio overview" />
      </h2>
      <p>
        <HighlightMatches text="Use the top navigation or jump into any section below." />
      </p>
      <div className="home-grid">
        {HOME_SECTIONS.map((section) => (
          <HomeSectionCard
            key={section.title}
            title={section.title}
            description={section.description}
            to={section.to}
            cta={section.cta}
          />
        ))}
      </div>
    </section>
  );
}
