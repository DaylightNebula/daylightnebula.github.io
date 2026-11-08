import { Route, Routes } from "react-router-dom";
import { ScrollManager } from "./components/ScrollManager";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ProjectPage } from "./pages/ProjectPage";

/**
 * Root component with the site's routes.
 *
 * Renders the home page at `/`, a page per project at `/projects/:slug`, and a not found page for
 * anything else.  GitHub Pages serves `404.html` (a copy of `index.html`) for deep links, so every
 * route also works when opened directly.
 *
 * @returns The routed page.
 */
export function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
