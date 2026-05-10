import HighlightMatches from "./HighlightMatches";
import { CONTACT } from "../content/contact";
import { useGithubUser } from "../hooks/useGithubUser";
import { useSectionSearch } from "../hooks/useSectionSearch";

const ABOUT_SEARCH_TEXT = [
  "About me",
  "Computer Science",
  "Mathematics",
  "Pace University",
  "Seidenberg School of CSIS",
  "May 2027",
  "Highlights",
  "Sensor data pipeline",
  "time-series",
  "TimescaleDB",
  "database",
  "UN Millennium Fellowship",
  "Right-to-Know",
  "H2O",
  "2024",
].join(" ");

export default function About() {
  const { githubUsername } = CONTACT;
  const { user, loading: userLoading, error: userError } =
    useGithubUser(githubUsername);
  const dynamicSearch = [
    user?.login,
    user?.bio,
    String(user?.followers ?? ""),
    String(user?.publicRepos ?? ""),
    String(user?.publicGists ?? ""),
  ]
    .filter(Boolean)
    .join(" ");
  const { ref } = useSectionSearch(`${ABOUT_SEARCH_TEXT} ${dynamicSearch}`);

  return (
    <section
      id="about"
      ref={ref}
      tabIndex={-1}
      className="section search-scroll-root"
    >
      <h2>
        <HighlightMatches text="About me" />
      </h2>
      <p>
        <HighlightMatches text="I am pursuing a B.S. in Computer Science with a minor in Mathematics at Pace University (Seidenberg School of CSIS), graduating May 2027. I care about building tools that make technical work easier for users." />
      </p>

      <h3 className="subheading">
        <HighlightMatches text="Highlights I am proud of" />
      </h3>
      <ul>
        <li>
          <strong>Sensor data pipeline:</strong>{" "}
          <HighlightMatches text="multi-station time-series processing with validation, TimescaleDB hypertables, and adapters for multiple database backends." />
        </li>
        <li>
          <strong>UN Millennium Fellowship:</strong>{" "}
          <HighlightMatches text="participated in the Right-to-Know H₂O '24 project (Fall 2024)." />
        </li>
      </ul>

      <h3 className="subheading">GitHub profile</h3>
      {userLoading ? <p className="small">Loading GitHub profile...</p> : null}
      {userError ? (
        <p className="small" role="alert">
          Could not load GitHub profile: {userError}
        </p>
      ) : null}
      {user ? (
        <div className="github-about-card">
          <img
            src={user.avatarUrl}
            alt={`${user.login} GitHub avatar`}
            className="github-avatar"
            width="72"
            height="72"
            loading="lazy"
          />
          <div>
            <p className="meta">
              @<HighlightMatches text={user.login} />
              {" · "}
              <a href={user.htmlUrl} target="_blank" rel="noopener noreferrer">
                View profile
              </a>
            </p>
            {user.bio ? (
              <p>
                <HighlightMatches text={user.bio} />
              </p>
            ) : null}
            <ul className="github-stats-list">
              <li>
                <strong>Followers:</strong>{" "}
                <HighlightMatches text={String(user.followers)} />
              </li>
              <li>
                <strong>Following:</strong>{" "}
                <HighlightMatches text={String(user.following)} />
              </li>
              <li>
                <strong>Public repos:</strong>{" "}
                <HighlightMatches text={String(user.publicRepos)} />
              </li>
              <li>
                <strong>Public gists:</strong>{" "}
                <HighlightMatches text={String(user.publicGists)} />
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
