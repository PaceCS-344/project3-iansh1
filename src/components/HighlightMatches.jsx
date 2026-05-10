import { useMemo } from "react";
import { useSearch } from "../context/SearchContext";

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Wraps occurrences of the current portfolio search query in <mark>.
 * Plain text only (pass strings, not JSX).
 */
export default function HighlightMatches({ text }) {
  const { query } = useSearch();
  const q = (query || "").trim();

  return useMemo(() => {
    if (text == null || text === "") {
      return text ?? "";
    }
    if (!q) {
      return text;
    }

    const s = String(text);
    const re = new RegExp(escapeRegExp(q), "gi");
    const nodes = [];
    let last = 0;
    let m;
    let key = 0;

    while ((m = re.exec(s)) !== null) {
      if (m.index > last) {
        nodes.push(s.slice(last, m.index));
      }
      nodes.push(
        <mark key={`hl-${key++}`} className="search-mark">
          {m[0]}
        </mark>,
      );
      last = m.index + m[0].length;
      if (m[0].length === 0) {
        re.lastIndex += 1;
      }
    }

    if (last < s.length) {
      nodes.push(s.slice(last));
    }

    if (nodes.length === 0) {
      return text;
    }

    return <>{nodes}</>;
  }, [text, q]);
}
