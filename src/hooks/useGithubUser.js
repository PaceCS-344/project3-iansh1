import { useEffect, useState } from "react";

export function useGithubUser(username) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(username));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setUser(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
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
        setUser({
          login: data.login,
          avatarUrl: data.avatar_url,
          htmlUrl: data.html_url,
          followers: data.followers,
          following: data.following,
          publicRepos: data.public_repos,
          publicGists: data.public_gists,
          bio: data.bio,
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Could not load GitHub profile.");
        setUser(null);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [username]);

  return { user, loading, error };
}
