import { useEffect, useState } from "react";

export function useGithubRepos(username, perPage = 6) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(Boolean(username));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setRepos([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const url = new URL(`https://api.github.com/users/${encodeURIComponent(username)}/repos`);
    url.searchParams.set("sort", "updated");
    url.searchParams.set("direction", "desc");
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("type", "owner");

    fetch(url.toString(), {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.text();
          throw new Error(body || res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          setRepos([]);
          return;
        }
        setRepos(
          data
            .filter((r) => !r.private)
            .slice(0, perPage)
            .map((r) => ({
              id: r.id,
              name: r.name,
              description: r.description,
              language: r.language,
              htmlUrl: r.html_url,
            })),
        );
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Could not load repositories.");
        setRepos([]);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [username, perPage]);

  return { repos, loading, error };
}
