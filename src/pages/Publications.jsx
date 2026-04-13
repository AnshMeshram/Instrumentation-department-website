import { useMemo, useState } from "react";
import PdfInteractiveList from "../components/PdfInteractiveList";
import publicationsData from "../data/publications.json";

function getPageLabel(page) {
  const heading = (page.heading || "").trim();

  if (/^(Prof\.|Dr\.|Mrs\.|Mr\.|Ms\.)\s/.test(heading)) {
    return heading;
  }

  return "Continuation Entry";
}

function normalizeYearLabel(rawYear) {
  const match = String(rawYear || "").match(/(20\d{2})\s*-\s*(20\d{2}|\d{2})/);
  if (!match) return "Unknown Year";

  const start = Number(match[1]);
  const endRaw = match[2];
  const end =
    endRaw.length === 2
      ? Number(`${String(start).slice(0, 2)}${endRaw}`)
      : Number(endRaw);

  return `${start}-${end}`;
}

function extractYearLabel(page) {
  const lines = `${page.heading}\n${page.text}`
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 20);

  for (const line of lines) {
    const normalized = normalizeYearLabel(line);
    if (normalized !== "Unknown Year") return normalized;
  }

  return "Unknown Year";
}

function extractFacultyLabel(page) {
  const heading = (page.heading || "").trim();
  if (/^(Prof\.|Dr\.|Mrs\.|Mr\.|Ms\.)\s/.test(heading)) {
    return heading;
  }

  const lineMatch = page.text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => /(?:Prof\.|Dr\.|Mrs\.|Mr\.|Ms\.)\s/.test(line));

  if (!lineMatch) return "Unknown Faculty";

  const clean = lineMatch.replace(/^\d+\.?\s*/, "");
  const nameMatch = clean.match(
    /((?:Prof\.|Dr\.|Mrs\.|Mr\.|Ms\.)\s+[A-Za-z.\s]+)/,
  );
  return nameMatch ? nameMatch[1].trim() : "Unknown Faculty";
}

export default function Publications() {
  const [search, setSearch] = useState("");

  const preparedPages = useMemo(() => {
    let lastYear = "Unknown Year";
    let lastFaculty = "Unknown Faculty";

    return publicationsData.map((page) => {
      const parsedYear = extractYearLabel(page);
      const parsedFaculty = extractFacultyLabel(page);

      const resolvedYear =
        parsedYear === "Unknown Year" ? lastYear : parsedYear;
      const resolvedFaculty =
        parsedFaculty === "Unknown Faculty" ? lastFaculty : parsedFaculty;

      if (parsedYear !== "Unknown Year") lastYear = parsedYear;
      if (parsedFaculty !== "Unknown Faculty") lastFaculty = parsedFaculty;

      return {
        ...page,
        resolvedYear,
        resolvedFaculty,
      };
    });
  }, []);

  const summary = useMemo(() => {
    return { total: preparedPages.length };
  }, [preparedPages]);

  const filteredPages = useMemo(() => {
    const query = search.trim().toLowerCase();

    return preparedPages.filter((page) => {
      const text =
        `${page.heading}\n${page.text}\n${page.resolvedYear}\n${page.resolvedFaculty}`.toLowerCase();
      return query ? text.includes(query) : true;
    });
  }, [preparedPages, search]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-[#d6e2f1] bg-linear-to-r from-[#f4f8fe] via-white to-[#f6faff] p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a3f70]">
              Research & Innovation
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0f2f66] md:text-4xl">
              Publications
            </h1>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              Verbatim page-by-page transcription of the full 43-page PDF
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-[#d2dff0] bg-white px-3 py-2 text-center">
              <p className="text-xs text-slate-500">Total</p>
              <p className="text-lg font-semibold text-slate-900">
                {summary.total}
              </p>
            </div>
            <div className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2 text-center">
              <p className="text-xs text-sky-700">Records</p>
              <p className="text-lg font-semibold text-sky-800">43</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="rounded-2xl border border-[#e5e7eb] bg-white/95 p-4 shadow-sm backdrop-blur-sm md:p-5"
        aria-label="Publication search"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold tracking-wide text-[#0f2f66]">
              Search
            </p>
            <p className="text-xs text-slate-500">
              Search across all 43 pages by faculty, author, title, or venue.
            </p>
          </div>

          <label className="w-full max-w-md">
            <span className="sr-only">Search publications</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search the PDF text"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#1a3f70]"
            />
          </label>
        </div>
      </section>

      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-slate-600" aria-live="polite">
          Showing {filteredPages.length} record
          {filteredPages.length === 1 ? "" : "s"}
        </p>
        <p className="hidden text-xs font-medium uppercase tracking-wide text-slate-500 lg:block">
          Verbatim PDF text view
        </p>
      </div>

      <PdfInteractiveList
        items={filteredPages}
        itemTypeLabel="Sr. No."
        getTitle={(page) => getPageLabel(page)}
        getSubtitle={(page) => "Publication entry from extracted PDF"}
        getText={(page) => page.text}
        getYearLabel={(page) => page.resolvedYear}
        getFacultyLabel={(page) => page.resolvedFaculty}
        emptyTitle="No pages found"
        emptyDescription="Try changing the search keywords or filters."
      />
    </div>
  );
}
