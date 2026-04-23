import { useMemo, useState } from "react";

const PROJECTS = [
  {
    title: "Campbell Scientific sensor data parser — BlueColab intern",
    period: "June 2025 – August 2025",
    stack: "Python, TimescaleDB, InfluxDB, SQLAlchemy",
    summary:
      "Multi-station time-series processing for environmental sensor JSON streams.",
    bullets: [
      "Built a tool that cleans and organizes sensor data from many stations.",
      "Set up the database so it can handle large streams of time-based data.",
      "Connected it to BlueColab services so teams could monitor data daily.",
    ],
    tags: ["Python", "TimescaleDB", "InfluxDB", "SQLAlchemy", "APIs"],
  },
  {
    title: "NBA Props Engine — personal project",
    period: "Last 2 months",
    stack:
      "Python, PostgreSQL, nba_api, SciPy, Docker, SQL, CLI automation",
    summary:
      "End-to-end NBA player props prediction and EV analysis system with daily automation, probability calibration, and reporting.",
    bullets: [
      "Built a daily system that pulls NBA stats and betting lines into one place.",
      "Created forecasts for player performance and turned them into simple win chances.",
      "Added daily reports to track results and show which picks performed best.",
    ],
    tags: ["Python", "PostgreSQL", "nba_api", "EV", "Modeling", "Automation"],
  },
];

export default function Projects() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const allTags = useMemo(() => {
    const tagSet = new Set(["All"]);
    PROJECTS.forEach((project) => {
      project.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, []);

  const filteredProjects = useMemo(() => {
    const term = query.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesText =
        term.length === 0 ||
        project.title.toLowerCase().includes(term) ||
        project.stack.toLowerCase().includes(term) ||
        project.summary.toLowerCase().includes(term) ||
        project.bullets.some((bullet) => bullet.toLowerCase().includes(term));
      const matchesTag =
        activeTag === "All" || project.tags.includes(activeTag);
      return matchesText && matchesTag;
    });
  }, [activeTag, query]);

  return (
    <section id="projects" className="section">
      <h2>Projects and experience</h2>
      <p>
        Selected work from my internship and personal projects.
      </p>
      <div className="project-tools">
        <label htmlFor="project-search">Search projects</label>
        <input
          id="project-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by tech or keywords"
        />
        <div className="tag-row" role="group" aria-label="Project tags">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`btn ${activeTag === tag ? "btn-active" : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <ul className="project-cards">
        {filteredProjects.map((p) => (
          <li key={p.title} className="project-card">
            <h3>{p.title}</h3>
            <p className="meta">
              {p.period} · {p.stack}
            </p>
            <p>{p.summary}</p>
            <p className="meta">Tags: {p.tags.join(", ")}</p>
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {filteredProjects.length === 0 ? (
        <p className="small">
          No projects match that search yet. Try another keyword or reset to
          All tags.
        </p>
      ) : null}
    </section>
  );
}
