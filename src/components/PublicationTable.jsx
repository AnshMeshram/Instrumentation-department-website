import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
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
  Other: "secondary",
};

function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm leading-6 text-slate-800">{value || "-"}</p>
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

  useEffect(() => {
    setActivePublication(null);
  }, [page, publications]);

  if (!publications.length) {
    return (
      <section className="space-y-4">
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[#0f2f66]">
            No publications found
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Try clearing the filters or changing the search text.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-[#e5e7eb] bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-600" aria-live="polite">
            Showing 0 to 0 of {total} publications
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onPreviousPage}
              disabled
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 opacity-40"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <button
              type="button"
              disabled
              className="min-w-10 rounded-full bg-[#0f2f66] px-3 py-2 text-sm font-semibold text-white opacity-40"
            >
              1
            </button>

            <button
              type="button"
              onClick={onNextPage}
              disabled
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 opacity-40"
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

  return (
    <>
      <div className="space-y-4">
        <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-white text-xs uppercase tracking-[0.08em] text-slate-600">
                <tr>
                  <th scope="col" className="px-4 py-3.5 font-semibold">
                    No.
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">
                    Publication
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">
                    Authors
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">
                    Faculty
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">
                    Year
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5edf6]">
                {publications.map((publication, index) => {
                  const badgeVariant =
                    categoryStyles[publication.category] || "default";

                  return (
                    <tr
                      key={publication.id}
                      className="align-top transition hover:bg-[#f9fafb]"
                    >
                      <td className="px-4 py-4 text-slate-800">
                        {startIndex + index + 1}
                      </td>
                      <td className="max-w-xl px-4 py-4 font-medium leading-6 text-slate-900">
                        <div className="space-y-2">
                          <p>{publication.title}</p>
                          <p className="text-xs font-normal text-slate-500">
                            {publication.venue ||
                              publication.publishedOn ||
                              "From PDF extraction"}
                          </p>
                        </div>
                      </td>
                      <td className="max-w-xs px-4 py-4 leading-6 text-slate-700">
                        {publication.authors}
                      </td>
                      <td className="max-w-xs px-4 py-4 leading-6 text-slate-800">
                        {publication.faculty}
                      </td>
                      <td className="px-4 py-4 text-slate-800">
                        {publication.sessionYear}
                        {publication.publishedOn ? (
                          <div className="mt-1 text-xs text-slate-500">
                            {formatDate(publication.publishedOn)}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant={badgeVariant}>
                          {publication.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setActivePublication(publication)}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            View details
                          </button>
                          <a
                            href={publication.publicationUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-[#cfe0f4] bg-[#edf4fd] px-3 py-2 text-xs font-semibold text-[#1a3f70] transition hover:bg-[#e0ecfb]"
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

        <div className="flex flex-col gap-3 rounded-2xl border border-[#e5e7eb] bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-600" aria-live="polite">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, total)}{" "}
            of {total} publications
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onPreviousPage}
              disabled={page <= 1}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                    ? "bg-[#0f2f66] text-white shadow-sm"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              onClick={onNextPage}
              disabled={page >= totalPages}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
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
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(96vw,900px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl outline-none">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 md:px-6">
              <div>
                <Dialog.Title className="text-lg font-semibold text-[#0f2f66] md:text-xl">
                  Publication Details
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-slate-500">
                  Structured information extracted from the publication PDF.
                </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close publication details"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            {activePublication ? (
              <div className="max-h-[80vh] overflow-y-auto px-5 py-5 md:px-6">
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 lg:col-span-2">
                    <Badge
                      variant={
                        categoryStyles[activePublication.category] || "default"
                      }
                    >
                      {activePublication.category}
                    </Badge>
                    <h3 className="mt-3 text-2xl font-semibold leading-8 text-slate-900">
                      {activePublication.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
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

                  <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Record Reference
                      </p>
                      <p className="mt-2 text-sm text-slate-700">
                        Serial No. {activePublication.serialNumber}
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        Source page: {activePublication.sourcePage}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Publication Link
                      </p>
                      <a
                        href={activePublication.publicationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f2f66] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#12386f]"
                      >
                        <ExternalLink size={16} />
                        Open Link
                      </a>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        OCR Extract Preview
                      </p>
                      <div className="mt-2 max-h-56 overflow-auto rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600">
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
