import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { projects } from "./src/data/projects";

/**
 * Serves `index.html` for folder URLs under `public/`, such as `/demos/gearbox-shapes/`.
 *
 * GitHub Pages and `vite preview` already do this, but the dev server sends folder URLs to the
 * React app, which shows its not found page.  The request is rewritten on the server, so the
 * address the page sees keeps its trailing slash, which the Gearbox demos need to resolve
 * their asset paths.
 *
 * @returns A Vite plugin that only affects the dev server.
 */
function publicFolderIndex(): Plugin {
  return {
    name: "public-folder-index",
    configureServer(server) {
      const publicDir = server.config.publicDir;
      server.middlewares.use((req, _res, next) => {
        const url = req.url;
        if (url === undefined) {
          next();
          return;
        }

        // only rewrite folder URLs that have an index.html in public/
        const path = url.split("?")[0];
        if (path.endsWith("/") && path !== "/" && existsSync(join(publicDir, path, "index.html"))) {
          req.url = `${path}index.html${url.slice(path.length)}`;
        }
        next();
      });
    }
  };
}

/** Escapes text for use inside an HTML attribute or element. */
function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/**
 * Replaces the content of one tag in the built page, failing the build if the tag is missing.
 *
 * @param html - The built page.
 * @param pattern - Matches the whole tag, with the old content in its first group.
 * @param value - New content, already escaped.
 * @returns The page with the tag's content replaced.
 * @throws {Error} If `pattern` matches nothing, which means `index.html` changed shape.
 */
function replaceTag(html: string, pattern: RegExp, value: string): string {
  const match = pattern.exec(html);
  if (match === null || match[1] === undefined) {
    throw new Error(`writing project pages: index.html has no tag matching ${pattern}`);
  }
  return html.replace(match[0], match[0].replace(match[1], value));
}

/**
 * Writes a copy of the built page for every route, so GitHub Pages can serve each one directly.
 *
 * GitHub Pages only knows about files.  Without these copies a project link such as
 * `/projects/gearbox` falls through to `404.html`, which shows the right page but answers with
 * HTTP 404, so search engines and link previews treat it as missing.  Each project gets
 * `projects/<slug>/index.html` with its own title, description and preview image, and
 * `404.html` stays as the fallback for addresses that really don't exist.
 *
 * @returns A Vite plugin that only affects production builds.
 * @throws {Error} From the build if `dist/index.html` is missing or lacks the tags it rewrites.
 */
function routePages(): Plugin {
  let outDir = "dist";

  return {
    name: "route-pages",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const indexPath = join(outDir, "index.html");
      if (!existsSync(indexPath)) {
        throw new Error(`writing project pages: ${indexPath} was not built`);
      }
      const index = readFileSync(indexPath, "utf8");

      // the fallback for unknown addresses, which the app renders as its not found page
      writeFileSync(join(outDir, "404.html"), index);

      // one page per project, with tags that describe that project
      for (const project of projects) {
        const title = escapeHtml(`${project.name} · Noah Shaw`);
        const summary = escapeHtml(project.summary);
        let html = index;
        html = replaceTag(html, /<title>([^<]*)<\/title>/, title);
        html = replaceTag(html, /<meta name="description" content="([^"]*)"/, summary);
        html = replaceTag(html, /<meta property="og:title" content="([^"]*)"/, title);
        html = replaceTag(html, /<meta property="og:description" content="([^"]*)"/, summary);
        if (project.cover !== undefined) {
          html = replaceTag(html, /<meta property="og:image" content="([^"]*)"/, escapeHtml(project.cover.src));
        }

        const dir = join(outDir, "projects", project.slug);
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, "index.html"), html);
      }
    }
  };
}

// user site (daylightnebula.github.io) is served from the domain root
export default defineConfig({
  base: "/",
  plugins: [publicFolderIndex(), routePages(), react()]
});
