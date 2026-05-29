import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "./ui/badge";
import PatentQuickViewDialog from "./PatentQuickViewDialog";

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const statusStyles = {
  Applied: "applied",
  Published: "published",
  Granted: "granted",
};

function SortHeader({ label, keyName, sortKey, onSort }) {
  return (
    <th scope="col" className="px-4 py-4 font-semibold">
      <button
        type="button"
        onClick={() => onSort(keyName)}
        className="inline-flex items-center gap-1 text-inherit transition-colors hover:text-[var(--color-primary)]"
        aria-label={`Sort by ${label}`}
      >
        {label}
        <ArrowUpDown
          size={14}
          className={sortKey === keyName ? "text-[var(--color-primary)]" : ""}
          aria-hidden="true"
        />
      </button>
    </th>
  );
}

export default function PatentTable({ patents }) {
  const [sortKey, setSortKey] = useState("applicationDate");
  const [sortDir, setSortDir] = useState("desc");

  const sortedPatents = useMemo(() => {
    const items = [...patents];

    items.sort((a, b) => {
      if (sortKey === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortKey === "facultyStudents") {
        return a.facultyStudents
          .join(", ")
          .localeCompare(b.facultyStudents.join(", "));
      }
      if (sortKey === "applicationNumber") {
        return String(a.applicationNumber || "").localeCompare(
          String(b.applicationNumber || ""),
        );
      }

      const firstDate = new Date(a[sortKey]).getTime() || 0;
      const secondDate = new Date(b[sortKey]).getTime() || 0;
      return firstDate - secondDate;
    });

    return sortDir === "asc" ? items : items.reverse();
  }, [patents, sortDir, sortKey]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDir(key === "title" || key === "facultyStudents" ? "asc" : "desc");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_22px_50px_-28px_rgba(0,0,0,0.25)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-primary)] px-4 py-4 text-white md:px-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
          Patent archive
        </p>
        <p className="mt-1 text-sm font-medium text-white/80">
          Application status, grant records and invention classification.
        </p>
      </div>

      <div className="max-h-[72vh] overflow-auto">
        <table className="min-w-[980px] text-left text-sm text-[var(--color-text)]">
          <thead className="sticky top-0 z-10 bg-[var(--color-surface-soft)]/95 text-xs uppercase tracking-[0.08em] text-[var(--color-text-soft)] backdrop-blur">
            <tr>
              <SortHeader
                label="Title / Topic"
                keyName="title"
                sortKey={sortKey}
                onSort={handleSort}
              />
              <SortHeader
                label="Faculty / Students"
                keyName="facultyStudents"
                sortKey={sortKey}
                onSort={handleSort}
              />
              <SortHeader
                label="Application No."
                keyName="applicationNumber"
                sortKey={sortKey}
                onSort={handleSort}
              />
              <SortHeader
                label="Application Date"
                keyName="applicationDate"
                sortKey={sortKey}
                onSort={handleSort}
              />
              <SortHeader
                label="Granted Date"
                keyName="grantedDate"
                sortKey={sortKey}
                onSort={handleSort}
              />
              <th scope="col" className="px-4 py-4 font-semibold">
                Status
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Type
              </th>
              <th scope="col" className="px-4 py-4 text-right font-semibold">
                View
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--color-border)]">
            {sortedPatents.map((patent) => {
              const badgeStyle = statusStyles[patent.status] || "default";

              return (
                <tr
                  key={patent.id}
                  className="align-top transition hover:bg-[var(--color-surface-soft)]/70"
                >
                  <td className="max-w-xs px-4 py-5 font-medium leading-6 text-[var(--color-heading)]">
                    <PatentQuickViewDialog
                      patent={patent}
                      trigger={
                        <button
                          type="button"
                          className="text-left underline-offset-2 hover:text-[var(--color-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                          aria-label={`Open details for ${patent.title}`}
                        >
                          {patent.title}
                        </button>
                      }
                    />
                  </td>
                  <td className="max-w-sm px-4 py-5 leading-6 text-[var(--color-text)]">
                    <PatentQuickViewDialog
                      patent={patent}
                      trigger={
                        <button
                          type="button"
                          className="text-left underline-offset-2 hover:text-[var(--color-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                          aria-label={`Open inventors for ${patent.title}`}
                        >
                          {patent.facultyStudents.join(", ")}
                        </button>
                      }
                    />
                  </td>
                  <td className="px-4 py-5 text-[var(--color-text)]">
                    <PatentQuickViewDialog
                      patent={patent}
                      trigger={
                        <button
                          type="button"
                          className="text-left underline-offset-2 hover:text-[var(--color-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                          aria-label={`Open application details for ${patent.title}`}
                        >
                          {patent.applicationNumber || "Pending"}
                        </button>
                      }
                    />
                  </td>
                  <td className="px-4 py-5 text-[var(--color-text)]">
                    {formatDate(patent.applicationDate)}
                  </td>
                  <td className="px-4 py-5 text-[var(--color-text)]">
                    {formatDate(patent.grantedDate)}
                  </td>
                  <td className="px-4 py-5">
                    <Badge variant={badgeStyle}>{patent.status}</Badge>
                  </td>
                  <td className="px-4 py-5">
                    <Badge variant="type">{patent.type}</Badge>
                  </td>
                  <td className="px-4 py-5 text-right">
                    <PatentQuickViewDialog
                      patent={patent}
                      trigger={
                        <button
                          type="button"
                          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                          aria-label={`Quick view for ${patent.title}`}
                        >
                          View
                        </button>
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
