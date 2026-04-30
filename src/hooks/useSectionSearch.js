import { useEffect, useRef } from "react";
import { useSearch } from "../context/SearchContext";


export function useSectionSearch(searchableText) {
  const { query, debouncedQuery } = useSearch();
  const ref = useRef(null);

  const q = query.trim().toLowerCase();
  const dq = debouncedQuery.toLowerCase();

  const haystack = (searchableText || "").toLowerCase();

  const isMatch = q.length > 0 && haystack.includes(q);

  useEffect(() => {
    if (!dq || !haystack.includes(dq) || !ref.current) return;
    ref.current.focus({ preventScroll: true });
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [dq, haystack]);

  return { ref, isMatch };
}
