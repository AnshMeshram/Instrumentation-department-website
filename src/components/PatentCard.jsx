import { Badge } from "./ui/badge";
import { Search } from "lucide-react";
import PatentQuickViewDialog from "./PatentQuickViewDialog";

const statusStyles = {
  Applied: "applied",
  Published: "published",
  Granted: "granted",
};

export default function PatentCard({ patent }) {
  const badgeStyle = statusStyles[patent.status] || "default";

  return (
    <PatentQuickViewDialog
      patent={patent}
      trigger={
        <button
          type="button"
          className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white text-left shadow-[0_20px_60px_-24px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--color-primary-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
        >
          <div className="h-full p-6">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-[var(--color-accent)]/5 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[var(--color-primary)]/10" />

            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <h3 className="line-clamp-2 font-[var(--font-serif)] text-lg font-bold leading-tight text-[var(--color-heading)] group-hover:text-[var(--color-primary)]">
                  {patent.title}
                </h3>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <Badge variant={badgeStyle} className="shadow-sm">
                    {patent.status}
                  </Badge>
                  <Badge className="border-[var(--color-border)] bg-[var(--color-surface-soft)] text-xs text-[var(--color-text)]">
                    {patent.type}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 grow">
                <dt className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-soft)]">
                  Inventors
                </dt>
                <dd className="mt-1 line-clamp-2 text-sm font-medium text-[var(--color-text)]">
                  {patent.facultyStudents.join(", ")}
                </dd>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--color-border)] pt-4 text-sm font-semibold text-[var(--color-text-soft)]">
                <div>
                  <span className="opacity-70">App No. </span>
                  <span className="text-[var(--color-heading)]">
                    {patent.applicationNumber || "N/A"}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 flex h-8 w-8 scale-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <Search size={14} strokeWidth={3} />
              </div>
            </div>
          </div>
        </button>
      }
    />
  );
}
