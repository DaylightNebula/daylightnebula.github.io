# daylightnebula.github.io

Noah Shaw's portfolio: work history, projects with their own pages, screenshots, and a Gearbox engine demo compiled
to WebAssembly that runs in the browser. Built with React, React Router, TypeScript and Vite.

## Website

[daylightnebula.github.io](https://daylightnebula.github.io)

## Building

Needs Node 20.19 or newer (CI uses Node 22).

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check and build into dist/, with 404.html for deep links
npm run preview    # serve the built site
```

Pushing to `main` builds and deploys the site through `.github/workflows/on-push.yml`. In the repository's Pages
settings, the source must be set to GitHub Actions.

## Editing content

All content lives in `src/data`:

- `profile.ts`: name, title, tagline, contact links and skills
- `experience.ts`: jobs and education
- `projects.ts`: projects (each gets a page at `/projects/<slug>`) and experiments

Colors all live in `src/theme.css`. Its top block holds the four palette colors (blush, wine, steel and
ink), and every shade on the site is mixed from them, so changing one hex value re-themes the whole site. Below
that, the light and dark blocks map the palette to roles such as `--text`, `--accent` and `--surface`, and any role
can be overridden there on its own.

Images go in `public/images`, and web builds in `public/demos/<name>/`. A project lists its demos by folder URL,
such as `/demos/gearbox-shapes/`, because Gearbox resolves asset paths against the page URL.

```ts
{
  title: "Shapes",
  path: "/demos/gearbox-shapes/",
  description: "Every primitive from ShapeBuilder with one textured material",
  poster: "/images/gearbox-shapes.png"
}
```

To rebuild a Gearbox demo, build the example with Trunk from the Gearbox repository and copy the output's
`index.html`, `.js` and `.wasm` files, plus any assets the example loads:

```bash
trunk build --release --example shapes --public-url ./ -d /tmp/shapes
```

The resume's source is `docs/resume.html`. After editing it, render it to PDF with Chrome and copy it next to
the site:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --print-to-pdf=public/Resume.pdf "file://$PWD/docs/resume.html" && cp public/Resume.pdf docs/Resume.pdf
```

`docs/github-header.md` is a profile README for the `DaylightNebula/DaylightNebula` repository.
