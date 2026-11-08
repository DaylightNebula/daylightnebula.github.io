import { useEffect } from "react";

/**
 * Sets the browser tab title while the calling page is mounted.
 *
 * @param title - Title to show in the tab.
 * @returns Nothing.
 */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
