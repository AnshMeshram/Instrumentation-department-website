import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--color-surface)] focus:px-3 focus:py-2 focus:text-[var(--color-primary)]"
      >
        Skip to main content
      </a>

      <NavBar />

      <main id="main-content" className="flex-1 bg-[var(--color-bg)]">
        <section className="page-shell min-h-[60vh] py-5 md:py-7 lg:py-9">
          {children}
        </section>
      </main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12 text-[var(--color-text)]">
        <div className="page-shell">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {/* Column 1: Address & Contact */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-[var(--color-accent)] font-sans">
                Contact Department
              </h3>
              <p className="text-sm font-semibold text-[var(--color-heading)]">
                Department of Instrumentation and Control Engineering
              </p>
              <address className="not-italic text-sm text-[var(--color-text-soft)] leading-relaxed space-y-2">
                <p>COEP Technological University</p>
                <p>Wellesley Road, Shivajinagar,</p>
                <p>Pune - 411005, Maharashtra, India</p>
              </address>
              <div className="text-sm text-[var(--color-text-soft)] space-y-1">
                <p>
                  <span className="font-bold text-[var(--color-heading)]">Phone:</span>{" "}
                  <a href="tel:+9102025507035" className="hover:text-[var(--color-accent)] transition-colors">
                    +91 (020) 2550 7035
                  </a>
                </p>
                <p>
                  <span className="font-bold text-[var(--color-heading)]">Email:</span>{" "}
                  <a href="mailto:head.instrumentation@coeptech.ac.in" className="hover:text-[var(--color-accent)] transition-colors">
                    head.instrumentation@coeptech.ac.in
                  </a>
                </p>
              </div>
            </div>

            {/* Column 2: Academics & Research */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-[var(--color-accent)] font-sans">
                Academic & Research
              </h3>
              <ul className="space-y-2.5 text-sm text-[var(--color-text-soft)]">
                <li>
                  <Link to="/about" className="hover:text-[var(--color-accent)] transition-colors">
                    About Department
                  </Link>
                </li>
                <li>
                  <Link to="/faculty" className="hover:text-[var(--color-accent)] transition-colors">
                    Faculty Directory
                  </Link>
                </li>
                <li>
                  <Link to="/publications" className="hover:text-[var(--color-accent)] transition-colors">
                    Research Publications
                  </Link>
                </li>
                <li>
                  <Link to="/patents" className="hover:text-[var(--color-accent)] transition-colors">
                    Patents & IP
                  </Link>
                </li>
                <li>
                  <Link to="/laboratories" className="hover:text-[var(--color-accent)] transition-colors">
                    Laboratories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-[var(--color-accent)] font-sans">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-sm text-[var(--color-text-soft)]">
                <li>
                  <a
                    href="https://www.coeptech.ac.in/academics/schools/school-of-engineering-and-technology/instrumentation-and-control-engineering/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-accent)] transition-colors"
                  >
                    COEP Tech University Portal
                  </a>
                </li>
                <li>
                  <Link to="/time-table" className="hover:text-[var(--color-accent)] transition-colors">
                    Academic Schedules
                  </Link>
                </li>
                <li>
                  <Link to="/consultancy-and-training" className="hover:text-[var(--color-accent)] transition-colors">
                    Consultancy & Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[var(--color-accent)] transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/department-committees" className="hover:text-[var(--color-accent)] transition-colors">
                    Department Committees
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-[var(--color-border)] pt-8 text-center text-xs text-[var(--color-text-soft)]">
            <p className="font-bold text-[var(--color-heading)] mb-1">
              &copy; {new Date().getFullYear()} COEP Technological University. All rights reserved.
            </p>
            <p>Department of Instrumentation and Control Engineering</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
