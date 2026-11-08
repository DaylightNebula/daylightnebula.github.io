import type { CodeSample } from "../data/projects";

/**
 * A titled block of source code.
 *
 * @param props.sample - Code to show, with its title and language.
 * @returns The code in a bordered panel that scrolls sideways on narrow screens.
 */
export function CodeBlock({ sample }: { sample: CodeSample }) {
  return (
    <figure className="code" style={{ margin: 0 }}>
      <figcaption className="code__head">
        <span>{sample.title}</span>
        <span className="meta">{sample.language}</span>
      </figcaption>
      <pre tabIndex={0}>
        <code>{sample.code}</code>
      </pre>
    </figure>
  );
}
