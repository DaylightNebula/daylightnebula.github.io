import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "../data/profile";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useTheme } from "../hooks/useTheme";

/**
 * NavItem
 *
 * Fields:
 * * id: Element id of the section the item jumps to
 * * label: Text shown in the navigation
 */
export interface NavItem {
  id: string;
  label: string;
}

/**
 * BackLink
 *
 * Fields:
 * * to: Route the link goes to, with an optional hash
 * * label: Text shown next to the arrow
 */
export interface BackLink {
  to: string;
  label: string;
}

/**
 * Page shell shared by every route.
 *
 * A sticky header holds the name, links to the current page's sections, the theme switch and a
 * resume button.  The link for the section being read is underlined.  Below 1024px the section
 * links move into a menu that opens under the header.  Pages lay out their own content inside
 * `main`, so sections can run full width.
 *
 * @param props.nav - Sections of the current page, in order.
 * @param props.back - Optional link shown before the sections, used to return to the home page.
 * @param props.children - Page content.
 * @returns The page wrapped in the shell.
 */
export function Layout({ nav, back, children }: { nav: NavItem[]; back?: BackLink; children: ReactNode }) {
  const active = useScrollSpy(nav.map((item) => item.id));
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // close the menu whenever the route or hash changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // show the header's bottom border only once the page has scrolled under it
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <header className="header" data-scrolled={scrolled || menuOpen}>
        <div className="container header__row">
          <Link className="wordmark" to="/">
            {profile.name}
          </Link>

          <nav className="header__nav" aria-label="Sections">
            {back !== undefined && (
              <Link className="header__link header__back" to={back.to}>
                <ArrowLeft className="icon" size={16} strokeWidth={1.5} />
                {back.label}
              </Link>
            )}
            {nav.map((item) => (
              <a key={item.id} className="header__link" href={`#${item.id}`} aria-current={active === item.id}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header__tools">
            <button
              type="button"
              className="button button--icon"
              onClick={toggle}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun className="icon" size={18} strokeWidth={1.5} /> : <Moon className="icon" size={18} strokeWidth={1.5} />}
            </button>
            <a className="button button--small header__resume" href={profile.resume} target="_blank" rel="noreferrer">
              Resume
            </a>
            <button
              type="button"
              className="button button--icon header__menu"
              aria-expanded={menuOpen}
              aria-controls="header-panel"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="icon" size={18} strokeWidth={1.5} /> : <Menu className="icon" size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <div className="header__panel" id="header-panel" data-open={menuOpen}>
          <nav className="container" aria-label="Sections">
            <ul>
              {back !== undefined && (
                <li>
                  <Link className="header__link header__back" to={back.to}>
                    <ArrowLeft className="icon" size={16} strokeWidth={1.5} />
                    {back.label}
                  </Link>
                </li>
              )}
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    className="header__link"
                    href={`#${item.id}`}
                    aria-current={active === item.id}
                    onClick={(event) => {
                      event.preventDefault();
                      setMenuOpen(false);
                      jumpTo(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="header__link" href={profile.resume} target="_blank" rel="noreferrer">
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="content">{children}</main>
    </>
  );
}

/**
 * Scrolls to a section once the menu has collapsed.
 *
 * Closing the menu shrinks the sticky header, so scrolling straight away would land too low.
 * Waiting two frames lets the layout settle first.
 */
function jumpTo(id: string) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target === null) {
        return;
      }
      target.scrollIntoView();
      history.replaceState(history.state, "", `#${id}`);
    });
  });
}
