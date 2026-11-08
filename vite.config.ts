import { existsSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

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

// user site (daylightnebula.github.io) is served from the domain root
export default defineConfig({
  base: "/",
  plugins: [publicFolderIndex(), react()]
});
