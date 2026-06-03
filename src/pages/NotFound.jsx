import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Home, Phone, Users, Map, FileSearch } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

export default function NotFound() {
  useDocumentMetadata({
    title: "404 - Page Not Found",
    description: "The requested page does not exist or has been relocated within the department portal.",
  });
  return (
    <div className="space-y-12 pb-12 flex flex-col justify-center min-h-[70vh]">
      <section className="overflow-hidden rounded-[var(--radius-container)] border border-[var(--color-border)] bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] relative max-w-4xl mx-auto w-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="px-8 py-12 lg:px-12 lg:py-16 relative text-center space-y-6">
          <div className="flex justify-center gap-3">
            <Badge variant="type" className="bg-red-600 text-white px-4 py-1.5 border-none">
              Error 404
            </Badge>
            <Badge variant="default" className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border-[var(--color-border)] px-4 py-1.5">
              Page Not Found
            </Badge>
          </div>

          <h1 className="mt-8 font-[var(--font-serif)] text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-7xl">
            Oops! Page Lost
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
            The requested page does not exist or has been relocated within the department portal. 
            Use the links below to find your way back.
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[var(--color-primary-strong)] hover:shadow-lg hover:-translate-y-0.5"
            >
              <Home size={16} />
              Return Home
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-bold text-[var(--color-heading)] transition-all hover:bg-[var(--color-surface-soft)]"
            >
              <Phone size={16} />
              Contact Office
            </Link>
          </div>
        </div>
      </section>

      <Card className="border-none bg-white shadow-[var(--shadow-soft)] max-w-4xl mx-auto w-full rounded-[var(--radius-container)]">
        <CardContent className="p-8 sm:p-12">
          <h2 className="text-xl font-bold text-[var(--color-heading)] mb-6 text-center">Suggested Sections</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <Link 
              to="/faculty" 
              className="flex flex-col items-center p-6 rounded-2xl bg-[var(--color-surface-soft)]/50 border border-[var(--color-border)] hover:bg-white hover:shadow-md transition-all text-center group"
            >
              <div className="h-10 w-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] mb-3 group-hover:scale-105 transition-transform">
                <Users size={20} />
              </div>
              <span className="text-sm font-bold text-[var(--color-heading)]">Faculty Directory</span>
              <span className="text-xs text-[var(--color-text-soft)] mt-1">Meet our professors & mentors</span>
            </Link>

            <Link 
              to="/publications" 
              className="flex flex-col items-center p-6 rounded-2xl bg-[var(--color-surface-soft)]/50 border border-[var(--color-border)] hover:bg-white hover:shadow-md transition-all text-center group"
            >
              <div className="h-10 w-10 rounded-xl bg-[var(--color-highlight)]/10 flex items-center justify-center text-[var(--color-highlight)] mb-3 group-hover:scale-105 transition-transform">
                <FileSearch size={20} />
              </div>
              <span className="text-sm font-bold text-[var(--color-heading)]">Research & Papers</span>
              <span className="text-xs text-[var(--color-text-soft)] mt-1">Browse indexing records</span>
            </Link>

            <Link 
              to="/time-table" 
              className="flex flex-col items-center p-6 rounded-2xl bg-[var(--color-surface-soft)]/50 border border-[var(--color-border)] hover:bg-white hover:shadow-md transition-all text-center group"
            >
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-3 group-hover:scale-105 transition-transform">
                <Map size={20} />
              </div>
              <span className="text-sm font-bold text-[var(--color-heading)]">Schedules</span>
              <span className="text-xs text-[var(--color-text-soft)] mt-1">Time tables & calendars</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
