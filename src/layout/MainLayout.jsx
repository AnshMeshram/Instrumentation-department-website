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

      <main
        id="main-content"
        className="mx-auto w-full max-w-7xl flex-1 bg-[var(--color-bg)] px-2 py-4 sm:px-3 sm:py-6 lg:px-4"
      >
        <section className="min-h-[60vh]">{children}</section>
      </main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/95">
        <div className="mx-auto max-w-7xl px-2 py-8 text-center text-xs text-[var(--color-text-soft)] sm:px-4 sm:text-sm lg:px-6">
          <p className="font-bold text-[var(--color-heading)] mb-2">
            (c) {new Date().getFullYear()} COEP Technological University
          </p>
          <p>Department of Instrumentation and Control Engineering</p>
        </div>
      </footer>
    </div>
  );
}
