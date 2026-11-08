import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the right place after every route change.
 *
 * With a hash in the URL it scrolls that element into view once the new page has rendered,
 * otherwise it jumps to the top of the page, like a normal page load would.
 *
 * @returns Nothing, the component only has effects.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash === "") {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // wait a frame so the target section exists before scrolling to it
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target === null) {
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
      target.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
