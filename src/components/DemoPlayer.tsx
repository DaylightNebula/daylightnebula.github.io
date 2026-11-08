import { Maximize2, Play, Square } from "lucide-react";
import type { Demo } from "../data/projects";

/**
 * A web build that loads only when asked.
 *
 * Shows the demo's screenshot with a start button.  Starting it swaps in an iframe running the
 * WebAssembly build, which downloads a few megabytes, so only one demo on a page runs at a time.
 *
 * @param props.demo - Demo to show.
 * @param props.running - Whether this demo's iframe is loaded.
 * @param props.onToggle - Called when the user starts or stops the demo.
 * @returns The demo frame with its title, description and controls.
 */
export function DemoPlayer({ demo, running, onToggle }: { demo: Demo; running: boolean; onToggle: () => void }) {
  return (
    <article>
      <div className="demo__frame">
        {running ? (
          <iframe src={demo.path} title={`${demo.title} demo`} allow="fullscreen" />
        ) : (
          <>
            <img src={demo.poster} alt="" loading="lazy" />
            <div className="demo__start">
              <button type="button" className="button" onClick={onToggle}>
                <Play className="icon" size={16} strokeWidth={1.5} />
                Run demo
              </button>
              <span className="demo__note">About 5 MB · needs WebGL2</span>
            </div>
          </>
        )}
      </div>
      <div className="demo__info">
        <div>
          <h3 className="demo__title">
            <span className="live">{demo.title}</span>
          </h3>
          <p className="demo__description">{demo.description}</p>
        </div>
        <div className="demo__actions">
          {running && (
            <button type="button" className="button button--small" onClick={onToggle}>
              <Square className="icon" size={14} strokeWidth={1.5} />
              Stop
            </button>
          )}
          <a className="button button--small" href={demo.path} target="_blank" rel="noreferrer">
            <Maximize2 className="icon" size={14} strokeWidth={1.5} />
            Full screen
          </a>
        </div>
      </div>
    </article>
  );
}
