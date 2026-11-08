import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { CodeBlock } from "../components/CodeBlock";
import { DemoPlayer } from "../components/DemoPlayer";
import { Gallery } from "../components/Gallery";
import { GithubIcon } from "../components/GithubIcon";
import { Layout, type NavItem } from "../components/Layout";
import { findProject, projects, type Project } from "../data/projects";
import { profile } from "../data/profile";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { NotFound } from "./NotFound";

/**
 * A project's own page, picked by the `:slug` route parameter.
 *
 * Shows the overview, runnable demos, screenshots, code, the parts that make up the project and
 * links to its repositories.  Sections without content are left out, and so are their navigation
 * items.  Unknown slugs show the not found page.
 *
 * @returns The project page inside the shared layout.
 */
export function ProjectPage() {
  const { slug } = useParams();
  const project = slug === undefined ? undefined : findProject(slug);

  if (project === undefined) {
    return <NotFound />;
  }
  return <ProjectContent key={project.slug} project={project} />;
}

/** Builds the navigation for the sections this project has content for. */
function sectionsFor(project: Project): NavItem[] {
  const sections: NavItem[] = [{ id: "overview", label: "Overview" }];
  if (project.demos.length > 0) {
    sections.push({ id: "demos", label: project.demos.length > 1 ? "Live demos" : "Live demo" });
  }
  if (project.gallery.length > 0) {
    sections.push({ id: "screenshots", label: "Screenshots" });
  }
  if (project.code.length > 0 || project.compare !== undefined) {
    sections.push({ id: "code", label: "Code" });
  }
  if (project.parts.length > 0) {
    sections.push({ id: "structure", label: "Structure" });
  }
  sections.push({ id: "source", label: "Source" });
  return sections;
}

/** Renders one project's page. */
function ProjectContent({ project }: { project: Project }) {
  useDocumentTitle(`${project.name} · ${profile.name}`);
  const [runningDemo, setRunningDemo] = useState<string | null>(null);
  const repo = project.repos[0];

  // neighbours in the project list, for the pager at the bottom
  const index = projects.indexOf(project);
  const previous = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;

  return (
    <Layout nav={sectionsFor(project)} back={{ to: "/#projects", label: "Projects" }}>
      <header className="project-hero">
        <div className="container enter">
          <Link className="crumb" to="/#projects">
            <ArrowLeft className="icon" size={16} strokeWidth={1.5} />
            All projects
          </Link>
          <h1 className="project-hero__title">{project.name}</h1>
          <p className="project-hero__summary">{project.summary}</p>
          <p className="meta meta-line project-hero__meta">
            <span>{project.language}</span>
            {project.meta.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
            {project.demos.length > 0 && <span className="live">Runs in the browser</span>}
          </p>
          <div className="project-hero__actions">
            {repo !== undefined && (
              <a className="button button--primary" href={repo.url} target="_blank" rel="noreferrer">
                <GithubIcon />
                View on GitHub
              </a>
            )}
            {project.demos.length > 0 && (
              <a className="button" href="#demos">
                Try it in the browser
              </a>
            )}
          </div>
        </div>
      </header>

      {project.cover !== undefined && (
        <div className="container cover">
          <figure className="figure">
            <img src={project.cover.src} alt={project.cover.alt} />
            <figcaption>{project.cover.caption}</figcaption>
          </figure>
        </div>
      )}

      <section className="section" id="overview" aria-labelledby="overview-title">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title" id="overview-title">Overview</h2>
          </div>
          <div className="split">
            <div className="prose">
              <p>{project.problem}</p>
              {project.approach.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <aside>
              <h3 className="aside-title">Highlights</h3>
              <ul className="highlights">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>
                    <Check className="icon" size={16} strokeWidth={1.5} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <p className="tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </p>
            </aside>
          </div>
        </div>
      </section>

      {project.demos.length > 0 && (
        <section className="section" id="demos" aria-labelledby="demos-title">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title" id="demos-title">{project.demos.length > 1 ? "Live demos" : "Live demo"}</h2>
              <p className="section__intro">
                The engine's own example, compiled to WebAssembly and rendering through WebGL. It loads only when you
                start it.
              </p>
            </div>
            <div className="demos">
              {project.demos.map((demo) => (
                <DemoPlayer
                  key={demo.path}
                  demo={demo}
                  running={runningDemo === demo.path}
                  onToggle={() => setRunningDemo((current) => (current === demo.path ? null : demo.path))}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {project.gallery.length > 0 && (
        <section className="section" id="screenshots" aria-labelledby="screenshots-title">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title" id="screenshots-title">Screenshots</h2>
            </div>
            <Gallery shots={project.gallery} />
          </div>
        </section>
      )}

      {(project.code.length > 0 || project.compare !== undefined) && (
        <section className="section" id="code" aria-labelledby="code-title">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title" id="code-title">Code</h2>
              {project.compare !== undefined && (
                <p className="section__intro">
                  A compute shader written as a Rust function, next to the WGSL the macro generates from it. The
                  output is shown as generated, temporaries and all.
                </p>
              )}
            </div>
            {project.compare !== undefined && (
              <div className="compare">
                <CodeBlock sample={project.compare[0]} />
                <CodeBlock sample={project.compare[1]} />
              </div>
            )}
            {project.code.map((sample) => (
              <CodeBlock key={sample.title} sample={sample} />
            ))}
          </div>
        </section>
      )}

      {project.parts.length > 0 && (
        <section className="section" id="structure" aria-labelledby="structure-title">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title" id="structure-title">Structure</h2>
            </div>
            <ul className="parts">
              {project.parts.map((part) => (
                <li key={part.name}>
                  <span className="parts__name">
                    {part.url !== undefined ? (
                      <a href={part.url} target="_blank" rel="noreferrer">
                        {part.name}
                      </a>
                    ) : (
                      part.name
                    )}
                  </span>
                  <span className="parts__description">{part.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section" id="source" aria-labelledby="source-title">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title" id="source-title">Source</h2>
            <p className="section__intro">
              {project.repos.length > 1
                ? "The code is split across these repositories on GitHub."
                : "The full source, README and history are on GitHub."}
            </p>
          </div>
          <div className="repos">
            {project.repos.map((link) => (
              <a key={link.url} className="button" href={link.url} target="_blank" rel="noreferrer">
                <GithubIcon />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <nav className="pager" aria-label="Other projects">
          {previous !== undefined && (
            <Link to={`/projects/${previous.slug}`}>
              <span className="meta">Previous</span>
              <span className="pager__name">{previous.name}</span>
            </Link>
          )}
          {next !== undefined && (
            <Link className="pager__next" to={`/projects/${next.slug}`}>
              <span className="meta">Next</span>
              <span className="pager__name">{next.name}</span>
            </Link>
          )}
        </nav>
      </div>
    </Layout>
  );
}
