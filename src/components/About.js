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
  const { ref, isMatch } = useSectionSearch(`${ABOUT_SEARCH_TEXT} ${dynamicSearch}`);

  return (
    <section
      id="about"
      ref={ref}
      tabIndex={-1}
      className={`section${isMatch ? " search-match" : ""}`}
    >
      <h2>About me</h2>
      <p>
        I am pursuing a B.S. in Computer Science with a minor in Mathematics at
        Pace University (Seidenberg School of CSIS), graduating May 2027. I
        care about building tools that make technical work easier for users.
      </p>

      <h3 className="subheading">Highlights I am proud of</h3>
      <ul>
        <li>
          <strong>Sensor data pipeline:</strong> multi-station time-series
          processing with validation, TimescaleDB hypertables, and adapters for
          multiple database backends.
        </li>
        <li>
          <strong>UN Millennium Fellowship:</strong> participated in the
          Right-to-Know H₂O &apos;24 project (Fall 2024).
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
              @{user.login}
              {" · "}
              <a href={user.htmlUrl} target="_blank" rel="noopener noreferrer">
                View profile
              </a>
            </p>
            {user.bio ? <p>{user.bio}</p> : null}
            <ul className="github-stats-list">
              <li>
                <strong>Followers:</strong> {user.followers}
              </li>
              <li>
                <strong>Following:</strong> {user.following}
              </li>
              <li>
                <strong>Public repos:</strong> {user.publicRepos}
              </li>
              <li>
                <strong>Public gists:</strong> {user.publicGists}
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
