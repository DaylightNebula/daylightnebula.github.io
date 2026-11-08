import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Project } from "../data/projects";
import { GithubIcon } from "./GithubIcon";

/**
 * A project row in the home page showcase.
 *
 * Puts the picture on one side and the text on the other, and the showcase alternates the sides.
 * Projects without a cover show the start of their code instead.  The picture is not a link: the
 * "View project" button opens the project's page.
 *
 * @param props.project - Project to show.
 * @returns The row as a list item.
 */
export function ProjectFeature({ project }: { project: Project }) {
  const page = `/projects/${project.slug}`;
  const repo = project.repos[0];

  return (
    <li className="feature">
      <div className="feature__media">
        {project.cover !== undefined ? (
          <img src={project.cover.src} alt={project.cover.alt} loading="lazy" />
        ) : (
          <CodeThumb project={project} />
        )}
      </div>

      <div className="feature__body">
        <p className="meta meta-line">
          <span>{project.language}</span>
          {project.meta.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
          {project.demos.length > 0 && <span className="live">Runs in the browser</span>}
        </p>
        <h3 className="feature__title">
          <Link to={page}>{project.name}</Link>
        </h3>
        <p className="feature__summary">{project.summary}</p>
        <div className="feature__actions">
          <Link className="button" to={page}>
            View project
            <ArrowRight className="icon" size={16} strokeWidth={1.5} />
          </Link>
          {repo !== undefined && (
            <a className="button" href={repo.url} target="_blank" rel="noreferrer">
              <GithubIcon />
              Source
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

/** Shows the first lines of a project's code in place of a picture. */
function CodeThumb({ project }: { project: Project }) {
  const sample = project.compare?.[0] ?? project.code[0];
  if (sample === undefined) {
    return null;
  }

  // keep only the opening lines, which are enough to fill the frame
  const lines = sample.code
    .split("\n")
    .slice(0, 16)
    .join("\n");
  return <span className="feature__media--code" style={{ display: "block", height: "100%" }}>{lines}</span>;
}
