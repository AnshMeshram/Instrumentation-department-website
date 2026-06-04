import { Toaster } from "sonner";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <Toaster position="top-right" richColors />
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

      <Footer />
    </div>
  );
}
