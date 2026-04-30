import { useEffect, useState } from "react";

export function useGithubRepoSearch(username, query, language, perPage = 10) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setRepos([]);
      setLoading(false);
      setError(null);
      return;
    }

    const q = query.trim();
    const lang = language.trim();

    if (!q && !lang) {
      setRepos([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const terms = [`user:${username}`];
    if (q) terms.push(`${q} in:name,description`);
    if (lang) terms.push(`language:${lang}`);

    const url = new URL("https://api.github.com/search/repositories");
    url.searchParams.set("q", terms.join(" "));
    url.searchParams.set("sort", "updated");
    url.searchParams.set("order", "desc");
    url.searchParams.set("per_page", String(perPage));

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
        const items = Array.isArray(data?.items) ? data.items : [];
        setRepos(
          items.map((r) => ({
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
        setError(err.message || "Could not search repositories.");
        setRepos([]);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [username, query, language, perPage]);

  return { repos, loading, error };
}
