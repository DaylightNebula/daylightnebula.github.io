import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { Shot } from "../data/projects";

/**
 * A grid of screenshots that open larger in a dialog.
 *
 * @param props.shots - Screenshots to show, in order.
 * @returns The grid and its dialog.
 */
export function Gallery({ shots }: { shots: Shot[] }) {
  const [open, setOpen] = useState<Shot | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  // keep the native dialog in step with the selected shot
  useEffect(() => {
    const element = dialog.current;
    if (element === null) {
      return;
    }
    if (open !== null && !element.open) {
      element.showModal();
    } else if (open === null && element.open) {
      element.close();
    }
  }, [open]);

  return (
    <>
      <ul className="gallery">
        {shots.map((shot) => (
          <li key={shot.src}>
            <figure className="figure">
              <button type="button" onClick={() => setOpen(shot)} aria-label={`Enlarge: ${shot.caption}`}>
                <img src={shot.src} alt={shot.alt} loading="lazy" />
              </button>
              <figcaption>{shot.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="lightbox"
        onClose={() => setOpen(null)}
        onClick={(event) => {
          // a click on the backdrop lands on the dialog itself
          if (event.target === event.currentTarget) {
            setOpen(null);
          }
        }}
      >
        {open !== null && (
          <>
            <img src={open.src} alt={open.alt} />
            <div className="lightbox__bar">
              <span>{open.caption}</span>
              <button type="button" className="button button--small" onClick={() => setOpen(null)}>
                <X className="icon" size={14} strokeWidth={1.5} />
                Close
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
