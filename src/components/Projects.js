const PROJECTS = [
  {
    title: "Campbell Scientific sensor data parser — BlueColab intern",
    period: "June 2025 – August 2025",
    stack: "Python, TimescaleDB, InfluxDB, SQLAlchemy",
    summary:
      "Multi-station time-series processing for environmental sensor JSON streams.",
    bullets: [
      "Parser with type validation, error handling, and schema management.",
      "TimescaleDB hypertables for time-series performance; adapter pattern for multiple DB backends.",
      "Structured logging and REST integration with BlueColab services.",
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2>Projects and experience</h2>
      <p>
        Selected work from my internship at BlueColab — what I built and what I
        learned.
      </p>
      <ul className="project-cards">
        {PROJECTS.map((p) => (
          <li key={p.title} className="project-card">
            <h3>{p.title}</h3>
            <p className="meta">
              {p.period} · {p.stack}
            </p>
            <p>{p.summary}</p>
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
