import HomeSectionCard from "../components/HomeSectionCard";
import { HOME_SECTIONS } from "../content/homeSections";

export default function Home() {
  return (
    <section className="section home-intro">
      <h2>Portfolio overview</h2>
      <p>
        Use the top navigation or jump into any section below. Each section is
        split into its own route so content stays modular and easy to maintain.
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
