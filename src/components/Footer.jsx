import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Academic & Research",
    links: [
      { label: "About Department", to: "/about" },
      { label: "Faculty Directory", to: "/faculty" },
      { label: "Research Publications", to: "/publications" },
      { label: "Patents & IP", to: "/patents" },
      { label: "Laboratories", to: "/laboratories" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Academic Schedules", to: "/time-table" },
      { label: "Curriculum", to: "/curriculum" },
      { label: "Consultancy & Services", to: "/consultancy-and-training" },
      { label: "Department Committees", to: "/department-committees" },
      { label: "Circulars / Reports", to: "/circulars-reports" },
    ],
  },
];

function FooterLink({ link }) {
  if (link.href) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link
      to={link.to}
      className="transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
    >
      {link.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-10 text-[var(--color-text)]">
      <div className="page-shell">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_0.85fr]">
          <div className="space-y-4">
            <h2 className="font-sans text-sm font-black uppercase tracking-wider text-[var(--color-accent)]">
              Contact Department
            </h2>
            <p className="text-sm font-semibold text-[var(--color-heading)]">
              Department of Instrumentation and Control Engineering
            </p>
            <address className="space-y-1 text-sm leading-relaxed text-[var(--color-text-soft)] not-italic">
              <p>COEP Technological University</p>
              <p>Wellesley Road, Shivajinagar</p>
              <p>Pune - 411005, Maharashtra, India</p>
            </address>
            <div className="space-y-1 text-sm text-[var(--color-text-soft)]">
              <p>
                <span className="font-bold text-[var(--color-heading)]">
                  Phone:
                </span>{" "}
                <a
                  href="tel:+9102025507035"
                  className="transition-colors hover:text-[var(--color-accent)]"
                >
                  +91 (020) 2550 7035
                </a>
              </p>
              <p>
                <span className="font-bold text-[var(--color-heading)]">
                  Email:
                </span>{" "}
                <a
                  href="mailto:head.instrumentation@coeptech.ac.in"
                  className="break-words transition-colors hover:text-[var(--color-accent)]"
                >
                  head.instrumentation@coeptech.ac.in
                </a>
              </p>
            </div>
          </div>

          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h2 className="font-sans text-sm font-black uppercase tracking-wider text-[var(--color-accent)]">
                {section.title}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[var(--color-text-soft)]">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 border-t border-[var(--color-border)] pt-6 text-center text-xs text-[var(--color-text-soft)]">
          <p className="mb-1 font-bold text-[var(--color-heading)]">
            &copy; {new Date().getFullYear()} COEP Technological University.
            All rights reserved.
          </p>
          <p>Department of Instrumentation and Control Engineering</p>
        </div>
      </div>
    </footer>
  );
}
