import { useEffect, useRef } from "react";
import { useSearch } from "../context/SearchContext";

/**
 * Scrolls/focuses the section when the debounced portfolio search matches its text.
 * Visual match feedback is handled with <HighlightMatches>, not a full-section outline.
 */
export function useSectionSearch(searchableText) {
  const { debouncedQuery } = useSearch();
  const ref = useRef(null);

  const dq = debouncedQuery.trim().toLowerCase();
  const haystack = (searchableText || "").toLowerCase();

  useEffect(() => {
    if (!dq || !haystack.includes(dq) || !ref.current) return;
    ref.current.focus({ preventScroll: true });
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [dq, haystack]);

  return { ref };
}
