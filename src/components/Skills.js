import { useSectionSearch } from "../hooks/useSectionSearch";

const GROUPS = [
  {
    title: "Languages",
    items:
      "Python, Java, C, TypeScript, JavaScript, SQL, HTML/CSS",
  },
  {
    title: "Frameworks and libraries",
    items:
      "React, Next.js, Node.js, Django, FastAPI, PyTorch, Hugging Face, Pandas, NumPy",
  },
  {
    title: "Databases",
    items: "PostgreSQL; experience with MariaDB, TimescaleDB, InfluxDB",
  },
  {
    title: "Developer tools",
    items:
      "Git, Docker, Google Colab, Jupyter Notebook, VS Code, IntelliJ, ESLint",
  },
];

const SKILLS_SEARCH_TEXT = [
  "Skills",
  "Coursework",
  ...GROUPS.map((g) => `${g.title} ${g.items}`),
].join(" ");

export default function Skills() {
  const { ref, isMatch } = useSectionSearch(SKILLS_SEARCH_TEXT);

  return (
    <section
      id="skills"
      ref={ref}
      tabIndex={-1}
      className={`section${isMatch ? " search-match" : ""}`}
    >
      <h2>Skills</h2>
      <p>
        Coursework includes intro CS (Python), OOP (Java), data structures and
        algorithms, discrete math, computer organization (C), calculus,
        probability and statistics, and differential equations.
      </p>
      <ul className="skills-list">
        {GROUPS.map(({ title, items }) => (
          <li key={title}>
            <strong>{title}:</strong> {items}
          </li>
        ))}
      </ul>
    </section>
  );
}
