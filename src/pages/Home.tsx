import { ArrowUpRight, ChevronDown } from "lucide-react";
import { GithubIcon } from "../components/GithubIcon";
import { Layout, type NavItem } from "../components/Layout";
import { ProjectFeature } from "../components/ProjectFeature";
import { education, jobs, type Job } from "../data/experience";
import { experiments, projects } from "../data/projects";
import { profile, skills } from "../data/profile";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const nav: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "experiments", label: "Experiments" },
  { id: "contact", label: "Contact" }
];

/** How many highlights a job shows before the rest fold away. */
const visibleHighlights = 3;

/**
 * The home page: a hero, then about, work history, projects, experiments and contact.
 *
 * @returns The page inside the shared layout.
 */
export function Home() {
  useDocumentTitle(`${profile.name} · Software engineer`);

  return (
    <Layout nav={nav}>
      <section className="hero" aria-label="Introduction">
        <div className="container">
          <div className="hero__inner enter">
            <div className="hero__kicker">
              <img className="hero__photo" src={profile.photo} alt={`Photo of ${profile.name}`} width={52} height={52} />
              <p>
                <strong>{profile.name}</strong>
                {profile.title} · {profile.location}
              </p>
            </div>
            <h1 className="hero__title">
              I build the servers for <em>millions of users</em>
            </h1>
            <p className="hero__lead">
              Five years of Java, Kotlin and TypeScript services, data-heavy APIs and React web features. In my own time
              I'm writing a game engine in Rust, which you can try in your browser on its project page.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#projects">
                See my work
              </a>
              <a className="button" href="#contact">
                Contact me
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="about-title">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title" id="about-title">About</h2>
          </div>
          <div className="about">
            <div className="prose">
              <p>
                I'm a full-stack software engineer with more than five years of experience, mostly working remotely
                on small teams of one to three engineers. On teams that size I've looked after everything from
                databases and backend services to the web pages people use, and I've learned to care about the whole
                product, not just my part of it.
              </p>
              <p>
                Much of my work has been for online game networks with large communities. Day to day, that means
                keeping long-running systems healthy, optimizing them, and adding awesome new features
                carefully. I document each change for other engineers, the business and the users, and I enjoy building
                tools that make working with my code easier for the people around me.
              </p>
              <p>
                Outside of work I keep learning by building new ideas for everything from fast backend systems to engines for simulation
                and games. I'm looking for a
                full-stack or backend role on a team where I can keep growing, help others and look after software
                people rely on.
              </p>
            </div>
            <div className="skills">
              {skills.map((group) => (
                <div key={group.label}>
                  <p className="skills__label">{group.label}</p>
                  <p className="skills__items">{group.items.join(", ")}</p>
                </div>
              ))}
              <p className="education">
                <strong>{education.school}</strong>
                {education.degree}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="experience" aria-labelledby="experience-title">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title" id="experience-title">Experience</h2>
          </div>
          <ol className="timeline">
            {jobs.map((job) => (
              <JobEntry key={job.company} job={job} />
            ))}
          </ol>
          <a className="resume-link" href={profile.resume} target="_blank" rel="noreferrer">
            Full resume (PDF)
            <ArrowUpRight className="icon" size={16} strokeWidth={1.5} />
          </a>
        </div>
      </section>

      <section className="section" id="projects" aria-labelledby="projects-title">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title" id="projects-title">Projects</h2>
            <p className="section__intro">
              Each project has its own page with screenshots, code and links to the source.
            </p>
          </div>
          <ul className="showcase">
            {projects.map((project) => (
              <ProjectFeature key={project.slug} project={project} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="experiments" aria-labelledby="experiments-title">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title" id="experiments-title">Experiments</h2>
            <p className="section__intro">
              Small prototypes for ideas I may grow into future projects. They are early, and their APIs will change.
            </p>
          </div>
          <ul className="lab">
            {experiments.map((experiment) => (
              <li className="lab__item" key={experiment.name}>
                <p className="meta">{experiment.language} · experiment</p>
                <h3 className="lab__name">{experiment.name}</h3>
                <p className="lab__summary">{experiment.summary}</p>
                <span className="lab__spacer" />
                <a className="button button--small" href={experiment.url} target="_blank" rel="noreferrer">
                  <GithubIcon />
                  Source
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" id="contact" aria-labelledby="contact-title">
        <div className="container">
          <h2 className="band__title" id="contact-title">Let's work together</h2>
          <p className="band__text">
            I'm looking for full-stack, backend or systems roles. Email is the fastest way to reach me, and my resume
            has the full details.
          </p>
          <div className="band__actions">
            <a className="button button--primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="button" href={profile.resume} target="_blank" rel="noreferrer">
              Download resume
            </a>
            <a className="button" href={profile.github} target="_blank" rel="noreferrer">
              <GithubIcon />
              GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__row meta">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with React and Vite, with the engine demo compiled from Rust to WebAssembly</span>
        </div>
      </footer>
    </Layout>
  );
}

/** One job on the timeline, showing its first few highlights and folding the rest away. */
function JobEntry({ job }: { job: Job }) {
  const shown = job.highlights.slice(0, visibleHighlights);
  const hidden = job.highlights.slice(visibleHighlights);

  return (
    <li className="job">
      <p className="meta job__dates">
        {job.start} – {job.end}
      </p>
      <div className="job__body">
        <h3 className="job__company">{job.company}</h3>
        <p className="job__role">{job.role}</p>
        <p className="job__context">{job.context}</p>
        <ul className="job__highlights">
          {shown.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        {hidden.length > 0 && (
          <details className="job__more">
            <summary>
              {hidden.length} more
              <ChevronDown className="icon" size={16} strokeWidth={1.5} />
            </summary>
            <ul className="job__highlights">
              {hidden.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </details>
        )}
        {job.tech.length > 0 && <p className="meta job__tech">{job.tech.join(" · ")}</p>}
      </div>
    </li>
  );
}
