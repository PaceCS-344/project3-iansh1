import { useMemo, useState } from "react";
import { CONTACT } from "../content/contact";
import { useGithubRepoSearch } from "../hooks/useGithubRepoSearch";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { useSectionSearch } from "../hooks/useSectionSearch";
import Button from "./Button";

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

function flattenProjectText(project) {
  return [
    project.title,
    project.period,
    project.stack,
    project.summary,
    ...project.bullets,
    ...project.tags,
  ].join(" ");
}

export default function Projects() {
  const { githubUsername } = CONTACT;
  const { repos, loading, error } = useGithubRepos(githubUsername, 6);
  const [repoSearchTerm, setRepoSearchTerm] = useState("");
  const [repoLanguage, setRepoLanguage] = useState("");
  const {
    repos: searchedRepos,
    loading: searchLoading,
    error: searchError,
  } = useGithubRepoSearch(githubUsername, repoSearchTerm, repoLanguage, 10);
  const [projectFilter, setProjectFilter] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const sectionSearchText = useMemo(() => {
    const featured = PROJECTS.map(flattenProjectText).join(" ");
    const fromGithub = repos
      .map((r) => [r.name, r.description, r.language].filter(Boolean).join(" "))
      .join(" ");
    return `${featured} ${fromGithub} GitHub repositories`;
  }, [repos]);

  const { ref: sectionRef, isMatch: sectionMatch } =
    useSectionSearch(sectionSearchText);

  const allTags = useMemo(() => {
    const tagSet = new Set(["All"]);
    PROJECTS.forEach((project) => {
      project.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, []);

  const filteredProjects = useMemo(() => {
    const term = projectFilter.trim().toLowerCase();
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
  }, [activeTag, projectFilter]);

  const usingGithubSearch =
    repoSearchTerm.trim().length > 0 || repoLanguage.trim().length > 0;
  const githubList = usingGithubSearch ? searchedRepos : repos;

  return (
    <section
      id="projects"
      ref={sectionRef}
      tabIndex={-1}
      className={`section${sectionMatch ? " search-match" : ""}`}
    >
      <h2>Projects and experience</h2>
      <p>Selected work from my internship and personal projects.</p>

      <div className="project-tools">
        <label htmlFor="project-search">Filter featured projects</label>
        <input
          id="project-search"
          type="search"
          value={projectFilter}
          onChange={(event) => setProjectFilter(event.target.value)}
          placeholder="Match title, stack, or keywords"
        />
        <p className="small project-tools-hint">
          Tags apply only to featured project cards.
        </p>
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
          No featured projects match that filter. Try another keyword or choose
          All tags.
        </p>
      ) : null}

      <h3 className="subheading github-repos-heading">GitHub repositories</h3>
      <p className="small">
        Pulled live with the{" "}
        <a
          href="https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repos API
        </a>{" "}
        and{" "}
        <a
          href="https://docs.github.com/en/rest/search/search"
          target="_blank"
          rel="noopener noreferrer"
        >
          Search API
        </a>
        .
      </p>
      <div className="project-tools repo-search-tools">
        <label htmlFor="repo-search-name">Search GitHub repos (name or description)</label>
        <input
          id="repo-search-name"
          type="search"
          value={repoSearchTerm}
          onChange={(event) => setRepoSearchTerm(event.target.value)}
          placeholder="e.g., parser, react, analytics"
        />
        <label htmlFor="repo-search-language" className="repo-language-label">
          Filter by language
        </label>
        <input
          id="repo-search-language"
          type="text"
          value={repoLanguage}
          onChange={(event) => setRepoLanguage(event.target.value)}
          placeholder="e.g., Python, JavaScript"
        />
      </div>

      {!usingGithubSearch && loading ? (
        <p className="small">Loading repositories...</p>
      ) : null}
      {!usingGithubSearch && error ? (
        <p className="small" role="alert">
          Could not load GitHub repos: {error}
        </p>
      ) : null}
      {usingGithubSearch && searchLoading ? (
        <p className="small">Searching repositories...</p>
      ) : null}
      {usingGithubSearch && searchError ? (
        <p className="small" role="alert">
          Could not search repositories: {searchError}
        </p>
      ) : null}

      {!loading && !error && !searchLoading && !searchError && githubList.length === 0 ? (
        <p className="small">
          {usingGithubSearch
            ? "No repositories match that search."
            : "No recent repositories found."}
        </p>
      ) : null}

      <ul className="project-cards github-repo-list">
        {githubList.map((repo) => (
          <li key={repo.id} className="project-card github-repo-card">
            <h4 className="github-repo-name">{repo.name}</h4>
            <p className="meta">
              {repo.language ? `Language: ${repo.language}` : "Language: —"}
            </p>
            <p>{repo.description ?? "No description provided."}</p>
            <Button href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
