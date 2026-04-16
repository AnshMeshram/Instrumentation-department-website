import NavBar from "../components/NavBar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden bg-white text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to main content
      </a>

      <NavBar />

      <main
        id="main-content"
        className="mx-auto w-full max-w-7xl flex-1 bg-white px-2 py-4 sm:px-3 sm:py-6 lg:px-4"
      >
        <section className="min-h-[60vh]">{children}</section>
      </main>

      <footer className="border-t border-[#e5e7eb] bg-white/95">
        <div className="mx-auto max-w-7xl px-2 py-4 text-center text-xs text-slate-600 sm:px-4 sm:text-sm lg:px-6">
          (c) {new Date().getFullYear()} COEP Technological University -
          Department of Instrumentation and Control Engineering
        </div>
      </footer>
    </div>
  );
}
