import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
} from "lucide-react";
import { Badge } from "./ui/badge";

function formatDate(value) {
  if (!value) return "-";

  return value;
}

const categoryStyles = {
  Journal: "published",
  Conference: "applied",
  "Book/Chapter": "default",
  Patent: "type",
  Other: "default",
};

function buildPaginationRange(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  const normalizedStart = Math.max(1, end - 4);

  return Array.from(
    { length: end - normalizedStart + 1 },
    (_, index) => normalizedStart + index,
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">
        {label}
      </p>
      <p className="mt-1 text-sm leading-6 text-[var(--color-heading)]">{value || "-"}</p>
    </div>
  );
}

export default function PublicationTable({
  publications,
  startIndex = 0,
  total = 0,
  page = 1,
  totalPages = 1,
  pageSize = 10,
  onNextPage,
  onPreviousPage,
  onPageSelect,
}) {
  const [activePublication, setActivePublication] = useState(null);
  const [sortKey, setSortKey] = useState("year");
  const [sortDir, setSortDir] = useState("desc");

  const [prevPublications, setPrevPublications] = useState(publications);
  const [prevPage, setPrevPage] = useState(page);

  if (publications !== prevPublications || page !== prevPage) {
    setPrevPublications(publications);
    setPrevPage(page);
    setActivePublication(null);
  }

  if (!publications.length) {
    return (
      <section className="space-y-4">
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            No publications found
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-soft)]">
            Try clearing the filters or changing the search text.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-[2rem] border border-[var(--color-border)] bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <p
            className="text-sm text-[var(--color-text-soft)]"
            aria-live="polite"
          >
            Showing 0 to 0 of {total} publications
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onPreviousPage}
              disabled
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-text)] opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <button
              type="button"
              disabled
              className="min-w-10 rounded-full bg-[var(--color-primary)] px-3 py-2 text-sm font-semibold text-white opacity-40"
            >
              1
            </button>

            <button
              type="button"
              onClick={onNextPage}
              disabled
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-text)] opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    );
  }

  const closeDetails = () => setActivePublication(null);
  const sortedPublications = [...publications].sort((a, b) => {
    let delta = 0;
    if (sortKey === "title") delta = a.title.localeCompare(b.title);
    if (sortKey === "faculty") delta = a.faculty.localeCompare(b.faculty);
    if (sortKey === "authors") delta = a.authors.localeCompare(b.authors);
    if (sortKey === "year")
      delta =
        Number(String(a.sessionYear).match(/20\d{2}/)?.[0] || 0) -
        Number(String(b.sessionYear).match(/20\d{2}/)?.[0] || 0);
    return sortDir === "asc" ? delta : -delta;
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir(key === "year" ? "desc" : "asc");
  };

  return (
    <>
      <div className="space-y-4">
        <div className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_22px_50px_-28px_rgba(0,0,0,0.25)]">
          <div className="border-b border-[var(--color-border)] bg-[var(--color-primary)] px-4 py-4 text-white md:px-6">
            <p className="text-2xs font-bold uppercase tracking-[0.18em] text-white/60">
              Publication archive
            </p>
            <p className="mt-1 text-sm font-medium text-white/80">
              Structured list with details drawer and publication metadata.
            </p>
          </div>
          <div className="max-h-[72vh] w-full overflow-auto">
            <table className="min-w-[700px] w-full text-left text-xs sm:text-sm text-[var(--color-text)]">
              <thead className="sticky top-0 z-10 bg-[var(--color-surface-soft)]/95 text-[10px] sm:text-xs uppercase tracking-[0.08em] text-[var(--color-text-soft)] backdrop-blur">
                <tr>
                  <th scope="col" className="px-4 py-4 font-semibold">
                    No.
                  </th>
                  <th scope="col" className="px-4 py-4 font-semibold">
                    <button type="button" onClick={() => handleSort("title")} className="inline-flex items-center gap-1 hover:text-[var(--color-primary)]">
                      Publication <ArrowUpDown size={13} />
                    </button>
                  </th>
                  <th scope="col" className="px-4 py-4 font-semibold">
                    <button type="button" onClick={() => handleSort("authors")} className="inline-flex items-center gap-1 hover:text-[var(--color-primary)]">
                      Authors <ArrowUpDown size={13} />
                    </button>
                  </th>
                  <th scope="col" className="px-4 py-4 font-semibold">
                    <button type="button" onClick={() => handleSort("faculty")} className="inline-flex items-center gap-1 hover:text-[var(--color-primary)]">
                      Faculty <ArrowUpDown size={13} />
                    </button>
                  </th>
                  <th scope="col" className="px-4 py-4 font-semibold">
                    <button type="button" onClick={() => handleSort("year")} className="inline-flex items-center gap-1 hover:text-[var(--color-primary)]">
                      Year <ArrowUpDown size={13} />
                    </button>
                  </th>
                  <th scope="col" className="px-4 py-4 font-semibold">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {sortedPublications.map((publication, index) => {
                  const badgeVariant =
                    categoryStyles[publication.category] || "default";

                  return (
                    <tr
                      key={`${publication.id}-${publication.serialNumber}`}
                      className="align-top transition hover:bg-[var(--color-surface-soft)]/70"
                    >
                      <td className="px-4 py-5 text-[var(--color-text)]">
                        {startIndex + index + 1}
                      </td>
                      <td className="max-w-xl px-4 py-5 font-medium leading-6 text-[var(--color-heading)]">
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => setActivePublication(publication)}
                            className="text-left underline-offset-2 hover:text-[var(--color-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                          >
                            {publication.title}
                          </button>
                          <p className="text-xs font-normal text-[var(--color-text-soft)]">
                            {publication.venue ||
                              publication.publishedOn ||
                              "From PDF extraction"}
                          </p>
                        </div>
                      </td>
                      <td className="max-w-xs px-4 py-5 leading-6 text-[var(--color-text)]">
                        <button
                          type="button"
                          onClick={() => setActivePublication(publication)}
                          className="text-left underline-offset-2 hover:text-[var(--color-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                        >
                          {publication.authors}
                        </button>
                      </td>
                      <td className="max-w-xs px-4 py-5 leading-6 text-[var(--color-text)]">
                        <button
                          type="button"
                          onClick={() => setActivePublication(publication)}
                          className="text-left underline-offset-2 hover:text-[var(--color-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                        >
                          {publication.faculty}
                        </button>
                      </td>
                      <td className="px-4 py-5 text-[var(--color-text)]">
                        {publication.sessionYear}
                        {publication.publishedOn ? (
                          <div className="mt-1 text-xs text-[var(--color-text-soft)]">
                            {formatDate(publication.publishedOn)}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-4 py-5">
                        <Badge variant={badgeVariant}>
                          {publication.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setActivePublication(publication)}
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-surface-soft)]"
                          >
                            View details
                          </button>
                          <a
                            href={publication.publicationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-primary-soft)] px-3 py-2 text-xs font-semibold text-[var(--color-primary)] transition hover:bg-white"
                          >
                            <ExternalLink size={14} />
                            Open
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-[2rem] border border-[var(--color-border)] bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <p
            className="text-sm text-[var(--color-text-soft)]"
            aria-live="polite"
          >
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, total)}{" "}
            of {total} publications
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onPreviousPage}
              disabled={page <= 1}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-soft)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            {buildPaginationRange(page, totalPages).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => onPageSelect(pageNumber)}
                className={`min-w-10 rounded-full px-3 py-2 text-sm font-semibold transition ${
                  pageNumber === page
                    ? "bg-[var(--color-primary)] text-white shadow-sm"
                    : "border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-soft)]"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              onClick={onNextPage}
              disabled={page >= totalPages}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-text)] transition hover:bg-[var(--color-surface-soft)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <Dialog.Root
        open={Boolean(activePublication)}
        onOpenChange={(open) => !open && closeDetails()}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[6px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(96vw,900px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_40px_120px_-32px_rgba(0,0,0,0.35)] outline-none">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-primary)] px-5 py-4 text-white md:px-6">
              <div>
                <Dialog.Title className="text-lg font-semibold text-white md:text-xl">
                  Publication Details
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-white/70">
                  Structured information extracted from the publication PDF.
                </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-full border border-white/15 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close publication details"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            {activePublication ? (
              <div className="max-h-[80vh] overflow-y-auto bg-[var(--color-surface-soft)]/35 px-5 py-5 md:px-6">
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 lg:col-span-2">
                    <Badge
                      variant={
                        categoryStyles[activePublication.category] || "default"
                      }
                    >
                      {activePublication.category}
                    </Badge>
                    <h3 className="mt-3 text-2xl font-semibold leading-8 text-[var(--color-heading)]">
                      {activePublication.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                      {activePublication.venue ||
                        "Publication metadata captured from the PDF source."}
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <DetailItem
                        label="Authors"
                        value={activePublication.authors}
                      />
                      <DetailItem
                        label="Faculty"
                        value={activePublication.faculty}
                      />
                      <DetailItem
                        label="Academic Year"
                        value={activePublication.sessionYear}
                      />
                      <DetailItem
                        label="Published On"
                        value={formatDate(activePublication.publishedOn)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">
                        Record Reference
                      </p>
                      <p className="mt-2 text-sm text-[var(--color-text)]">
                        Serial No. {activePublication.serialNumber}
                      </p>
                      <p className="mt-1 text-sm text-[var(--color-text)]">
                        Source page: {activePublication.sourcePage}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">
                        Publication Link
                      </p>
                      <a
                        href={activePublication.publicationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-black"
                      >
                        <ExternalLink size={16} />
                        Open Link
                      </a>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">
                        OCR Extract Preview
                      </p>
                      <div className="mt-2 max-h-56 overflow-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-3 text-xs leading-6 text-[var(--color-text-soft)]">
                        {activePublication.rawText}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
