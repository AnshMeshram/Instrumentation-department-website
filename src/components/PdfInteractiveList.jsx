import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";

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

export default function PdfInteractiveList({
  items,
  getTitle,
  getSubtitle,
  getText,
  getYearLabel,
  getFacultyLabel,
  getTags,
  emptyTitle,
  emptyDescription,
}) {
  const [activeItem, setActiveItem] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const total = items.length;
  const totalPages = Math.ceil(total / pageSize) || 1;

  const [prevItems, setPrevItems] = useState(items);

  if (items !== prevItems) {
    setPrevItems(items);
    setPage(1);
  }

  const startIndex = (page - 1) * pageSize;
  const currentItems = items.slice(startIndex, startIndex + pageSize);

  const onNextPage = () => setPage((p) => Math.min(totalPages, p + 1));
  const onPreviousPage = () => setPage((p) => Math.max(1, p - 1));
  const onPageSelect = (p) => setPage(p);

  const closeDetails = () => setActiveItem(null);

  if (!items.length) {
    return (
      <section className="space-y-4">
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            {emptyTitle || "No records found"}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-soft)]">
            {emptyDescription ||
              "Try clearing the filters or changing the search text."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_22px_50px_-28px_rgba(0,0,0,0.25)]">
          <div className="border-b border-[var(--color-border)] bg-[var(--color-primary)] px-4 py-4 text-white md:px-6">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
              Document archive
            </p>
            <p className="mt-1 text-sm font-medium text-white/80">
              Extracted unstructured insights mapping and tracking.
            </p>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="min-w-[700px] w-full text-left text-xs sm:text-sm text-[var(--color-text)]">
              <thead className="bg-[var(--color-surface-soft)]/80 text-[10px] sm:text-xs uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
                <tr>
                  <th scope="col" className="px-4 py-4 font-semibold w-12">
                    No.
                  </th>
                  <th scope="col" className="px-4 py-4 font-semibold">
                    Document Title / Theme
                  </th>
                  <th scope="col" className="px-4 py-4 font-semibold">
                    Faculty
                  </th>
                  <th scope="col" className="px-4 py-4 font-semibold">
                    Year
                  </th>
                  <th scope="col" className="px-4 py-4 font-semibold">
                    Tags
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 font-semibold text-right"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {currentItems.map((item, index) => {
                  const title = getTitle ? getTitle(item) : "Untitled";
                  const subtitle = getSubtitle ? getSubtitle(item) : "";
                  const faculty = getFacultyLabel ? getFacultyLabel(item) : "";
                  const year = getYearLabel ? getYearLabel(item) : "";
                  const tags = getTags ? getTags(item) : [];

                  return (
                    <tr
                      key={item.id || index}
                      className="align-top transition hover:bg-[var(--color-surface-soft)]/70"
                    >
                      <td className="px-4 py-5 text-[var(--color-text)]">
                        {startIndex + index + 1}
                      </td>
                      <td className="max-w-xl px-4 py-5 font-medium leading-6 text-[var(--color-heading)]">
                        <div className="space-y-1">
                          <p>{title}</p>
                          {subtitle && (
                            <p className="text-xs font-normal text-[var(--color-text-soft)]">
                              {subtitle}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="max-w-xs px-4 py-5 leading-6 text-[var(--color-text)]">
                        {faculty || "—"}
                      </td>
                      <td className="px-4 py-5 text-[var(--color-text)]">
                        {year || "—"}
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex flex-wrap gap-1">
                          {tags.slice(0, 2).map((tag, i) => (
                            <Badge
                              key={i}
                              variant="default"
                              className="text-[9px] px-1.5 py-0.5"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {tags.length > 2 && (
                            <Badge
                              variant="type"
                              className="text-[9px] px-1.5 py-0.5 opacity-70"
                            >
                              +{tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-5 text-right">
                        <button
                          type="button"
                          onClick={() => setActiveItem(item)}
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-surface-soft)]"
                        >
                          View Details
                        </button>
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
            of {total} records
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
        open={Boolean(activeItem)}
        onOpenChange={(open) => !open && closeDetails()}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[6px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(96vw,800px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_40px_120px_-32px_rgba(0,0,0,0.35)] outline-none">
            <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-primary)] px-5 py-4 text-white md:px-6">
              <div>
                <Dialog.Title className="text-lg font-semibold text-white md:text-xl">
                  Document View
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-white/70">
                  Detailed preview from PDF extraction structure
                </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-full border border-white/15 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close document details"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            {activeItem && (
              <div className="bg-[var(--color-surface-soft)]/35 p-5 md:p-6 max-h-[80vh] overflow-y-auto">
                <div className="rounded-2xl border border-[var(--color-border)] bg-white p-5 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6 border-b border-slate-100">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)] mb-3">
                        Extracted Title
                      </p>
                      <h3 className="font-[var(--font-serif)] text-2xl font-black leading-tight text-[var(--color-heading)] max-w-xl">
                        {getTitle ? getTitle(activeItem) : "Untitled Document"}
                      </h3>
                    </div>

                    {getTags && getTags(activeItem).length > 0 && (
                      <div className="flex flex-wrap gap-2 md:max-w-xs shrink-0 self-start">
                        {getTags(activeItem).map((tag, i) => (
                          <Badge
                            key={i}
                            variant="default"
                            className="text-[10px]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-y-4 gap-x-12">
                    {getFacultyLabel && getFacultyLabel(activeItem) && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-soft)] mb-1">
                          Identified Faculty
                        </p>
                        <p className="text-sm font-semibold text-[var(--color-heading)]">
                          {getFacultyLabel(activeItem)}
                        </p>
                      </div>
                    )}
                    {getYearLabel && getYearLabel(activeItem) && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-soft)] mb-1">
                          Academic Year
                        </p>
                        <p className="text-sm font-semibold text-[var(--color-heading)]">
                          {getYearLabel(activeItem)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-6 md:p-8">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                      Full Text Content
                    </p>
                    <div className="font-medium whitespace-pre-wrap leading-relaxed text-sm md:text-[15px] text-slate-800 break-words">
                      {getText ? getText(activeItem) : "No text available."}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
