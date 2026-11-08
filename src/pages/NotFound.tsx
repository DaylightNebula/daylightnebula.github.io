import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

/**
 * Page shown for any route that doesn't exist.
 *
 * @returns A short message with a link back home, inside the shared layout.
 */
export function NotFound() {
  useDocumentTitle("Page not found · Noah Shaw");

  return (
    <Layout nav={[]} back={{ to: "/", label: "Home" }}>
      <section className="not-found">
        <div className="container">
          <div className="section__head">
            <h1 className="section__title">Page not found</h1>
            <p className="section__intro">This address doesn't match a page. Every project is listed on the home page.</p>
          </div>
          <Link className="button button--primary" to="/#projects">
            See all projects
          </Link>
        </div>
      </section>
    </Layout>
  );
}
