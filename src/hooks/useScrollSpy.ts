import { useEffect, useState } from "react";

/**
 * Tracks which section of the page is currently being read.
 *
 * Watches the elements with the given ids and reports the last one whose top has scrolled past
 * a line a third of the way down the viewport.  Near the bottom of the page the last section wins,
 * so short final sections still get highlighted.  Above the first section nothing is active.
 *
 * @param ids - Element ids of the sections, in page order.
 * @returns The id of the active section, or an empty string above the first one.
 */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState("");
  const key = ids.join("|");

  useEffect(() => {
    const sectionIds = key === "" ? [] : key.split("|");

    /** Picks the section whose top is closest above the reading line. */
    const update = () => {
      const line = window.innerHeight / 3;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = "";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element !== null && element.getBoundingClientRect().top <= line) {
          current = id;
        }
      }
      if (atBottom && sectionIds.length > 0) {
        current = sectionIds[sectionIds.length - 1];
      }
      setActive(current);
    };

    // recompute on scroll and resize, throttled to one update per frame
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);

  return active;
}
