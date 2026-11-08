import { useCallback, useEffect, useState } from "react";

/**
 * Theme
 *
 * Variants:
 * * light: Blush paper with ink text
 * * dark: Ink background with blush text
 */
export type Theme = "light" | "dark";

const storageKey = "theme";
const darkQuery = "(prefers-color-scheme: dark)";

/** Reads the visitor's saved theme, or `null` when there is none or storage is blocked. */
function savedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch (err) {
    console.warn("reading the saved theme failed, following the system theme", err);
    return null;
  }
}

/** Reads the system's theme. */
function systemTheme(): Theme {
  return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

/** Reads the theme set on the page, falling back to the system's. */
function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  return set === "light" || set === "dark" ? set : systemTheme();
}

/** Applies a theme to the page, which switches every color token in `theme.css`. */
function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

/**
 * Tracks the color theme and lets the visitor switch it.
 *
 * Starts from the theme the script in `index.html` set before first paint: a choice saved on an
 * earlier visit, or else the system setting.  Follows system changes until the visitor picks a
 * theme, and saves a picked theme in `localStorage` when the browser allows it.
 *
 * @returns The theme in effect, and a function that switches to the other one.
 */
export function useTheme(): { theme: Theme; toggle: () => void } {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  // follow the system theme while the visitor hasn't picked one
  useEffect(() => {
    const query = window.matchMedia(darkQuery);
    const onChange = () => {
      if (savedTheme() !== null) {
        return;
      }
      const next = systemTheme();
      applyTheme(next);
      setTheme(next);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);

    // saving is a convenience, the page works the same when storage is blocked
    try {
      localStorage.setItem(storageKey, next);
    } catch (err) {
      console.warn("saving the theme failed, it will reset on the next visit", err);
    }
  }, []);

  return { theme, toggle };
}
