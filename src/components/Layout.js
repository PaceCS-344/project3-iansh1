import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });
  const [themeFeedback, setThemeFeedback] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light";
      setThemeFeedback(next === "dark" ? "Dark mode on" : "Light mode on");
      return next;
    });
  }

  useEffect(() => {
    if (!themeFeedback) return;
    const timer = window.setTimeout(() => setThemeFeedback(""), 1200);
    return () => window.clearTimeout(timer);
  }, [themeFeedback]);

  return (
    <>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        themeFeedback={themeFeedback}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
