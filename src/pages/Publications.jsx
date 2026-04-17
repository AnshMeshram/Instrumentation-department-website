import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, FileSearch, LibraryBig, Microscope } from "lucide-react";
import PublicationFilters from "../components/PublicationFilters";
import PublicationTable from "../components/PublicationTable";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import publicationsData from "../data/publications.json";
import {
  buildPublicationCatalog,
  getPublicationOptions,
} from "../lib/publicationCatalog";
import { cn } from "../lib/utils";

const PAGE_SIZE = 10;

function getAcademicYearValue(label) {
  const match = String(label || "").match(/20\d{2}/);
  return match ? Number(match[0]) : 0;
}

function getPublishedTimestamp(label) {
  if (!label) return 0;

  const parsed = Date.parse(`${label} 1`);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function summarizeCatalog(catalog) {
  const categoryCounts = catalog.reduce((acc, publication) => {
    acc[publication.category] = (acc[publication.category] || 0) + 1;
    return acc;
  }, {});

  const facultyCounts = catalog.reduce((acc, publication) => {
    acc[publication.faculty] = (acc[publication.faculty] || 0) + 1;
    return acc;
  }, {});

  const topFaculties = Object.entries(facultyCounts)
    .sort((first, second) => second[1] - first[1])
    .slice(0, 4)
    .map(([faculty, count]) => ({ faculty, count }));

  return {
    total: catalog.length,
    journals: categoryCounts.Journal || 0,
    conferences: categoryCounts.Conference || 0,
    books: categoryCounts["Book/Chapter"] || 0,
    other: categoryCounts.Other || 0,
    patents: categoryCounts.Patent || 0,
    facultyCount: Object.keys(facultyCounts).length,
    sourcePages: new Set(catalog.map((publication) => publication.sourcePage))
      .size,
    yearCount: new Set(catalog.map((publication) => publication.sessionYear)).size,
    topFaculties,
  };
}

function InsightCard({ title, value, tone = "default", helper }) {
  const tones = {
    default: "border-[#d9e3f0] bg-white text-slate-900",
    journal: "border-sky-100 bg-sky-50 text-sky-900",
    conference: "border-amber-100 bg-amber-50 text-amber-900",
    faculty: "border-[#dbe7f7] bg-[#f3f7fd] text-[#0f2f66]",
  };

  return (
    <div className={cn("rounded-2xl border px-4 py-4 shadow-sm", tones[tone])}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {title}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      {helper ? <p className="mt-1 text-sm text-slate-600">{helper}</p> : null}
    </div>
  );
}

function MobilePublicationCard({ publication }) {
  const badgeVariant =
    publication.category === "Journal"
      ? "published"
      : publication.category === "Conference"
        ? "applied"
        : publication.category === "Patent"
          ? "type"
          : "default";

  return (
    <Card className="overflow-hidden border-[#dde6f3] bg-white/95 shadow-sm">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant={badgeVariant}>{publication.category}</Badge>
            <h3 className="mt-3 text-lg font-semibold leading-7 text-[#0f2f66]">
              {publication.title}
            </h3>
          </div>
          <Badge variant="type">{publication.sessionYear}</Badge>
        </div>

        <dl className="grid gap-3 text-sm text-slate-700">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Authors
            </dt>
            <dd className="mt-1 leading-6">{publication.authors}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Faculty
            </dt>
            <dd className="mt-1 leading-6">{publication.faculty}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Venue
            </dt>
            <dd className="mt-1 leading-6">
              {publication.venue || "Derived from publication PDF metadata"}
            </dd>
          </div>
        </dl>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Published
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {publication.publishedOn || publication.sessionYear}
            </p>
          </div>

          <a
            href={publication.publicationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#d5e3f5] bg-[#eef5ff] px-4 py-2 text-sm font-semibold text-[#0f2f66] transition hover:bg-[#e4effd]"
          >
            Open
            <ArrowUpRight size={16} />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Publications() {
  const catalog = useMemo(() => buildPublicationCatalog(publicationsData), []);
  const options = useMemo(() => getPublicationOptions(catalog), [catalog]);
  const summary = useMemo(() => summarizeCatalog(catalog), [catalog]);

  const [search, setSearch] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedAuthor, setSelectedAuthor] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);

  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const activeFiltersCount =
    (search.trim() ? 1 : 0) +
    (selectedFaculty !== "All" ? 1 : 0) +
    (selectedYear !== "All" ? 1 : 0) +
    (selectedAuthor !== "All" ? 1 : 0) +
    (selectedCategory !== "All" ? 1 : 0);

  const filteredPublications = useMemo(() => {
    return catalog
      .filter((publication) => {
        const searchMatch =
          !deferredSearch ||
          [
            publication.title,
            publication.authors,
            publication.faculty,
            publication.venue,
            publication.rawText,
            publication.sessionYear,
          ]
            .join(" ")
            .toLowerCase()
            .includes(deferredSearch);

        const facultyMatch =
          selectedFaculty === "All" || publication.faculty === selectedFaculty;
        const yearMatch =
          selectedYear === "All" || publication.sessionYear === selectedYear;
        const authorMatch =
          selectedAuthor === "All" ||
          publication.authors.toLowerCase().includes(selectedAuthor.toLowerCase());
        const categoryMatch =
          selectedCategory === "All" ||
          publication.category === selectedCategory;

        return (
          searchMatch &&
          facultyMatch &&
          yearMatch &&
          authorMatch &&
          categoryMatch
        );
      })
      .sort((first, second) => {
        const yearDelta =
          getAcademicYearValue(second.sessionYear) -
          getAcademicYearValue(first.sessionYear);
        if (yearDelta !== 0) return yearDelta;

        const publicationDelta =
          getPublishedTimestamp(second.publishedOn) -
          getPublishedTimestamp(first.publishedOn);
        if (publicationDelta !== 0) return publicationDelta;

        return first.serialNumber - second.serialNumber;
      });
  }, [
    catalog,
    deferredSearch,
    selectedAuthor,
    selectedCategory,
    selectedFaculty,
    selectedYear,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPublications.length / PAGE_SIZE),
  );

  useEffect(() => {
    setPage(1);
  }, [deferredSearch, selectedAuthor, selectedCategory, selectedFaculty, selectedYear]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedPublications = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return filteredPublications.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredPublications, page]);

  function handleResetFilters() {
    setSearch("");
    setSelectedFaculty("All");
    setSelectedYear("All");
    setSelectedAuthor("All");
    setSelectedCategory("All");
    setPage(1);
  }

  const latestAcademicYear = options.yearOptions[0] || "N/A";

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] border border-[#d7e2ef] bg-[#fbfcfe] shadow-[0_14px_30px_rgba(15,47,102,0.06)]">
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.35fr,0.85fr] lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="type">Research & Publications</Badge>
              <Badge variant="default">Static analysis from publication PDF</Badge>
            </div>

            <h1 className="mt-5 max-w-4xl border-l-4 border-[#0f2f66] pl-4 font-['Georgia','Times_New_Roman',serif] text-4xl font-semibold tracking-tight text-[#0f2f66] md:text-5xl">
              Publications
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              A curated departmental publication record built from PDF
              extraction, organized with searchable metadata, publication type
              summaries, and faculty contribution insights in a cleaner academic
              interface.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dbe6f4] bg-white px-4 py-2">
                <LibraryBig size={16} className="text-[#0f2f66]" />
                {summary.total} indexed records
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dbe6f4] bg-white px-4 py-2">
                <Microscope size={16} className="text-[#0f2f66]" />
                {summary.facultyCount} faculty contributors
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dbe6f4] bg-white px-4 py-2">
                <FileSearch size={16} className="text-[#0f2f66]" />
                {summary.sourcePages} extracted source pages
              </span>
            </div>
          </div>

          <Card className="border-[#d8e4f2] bg-white shadow-sm">
            <CardContent className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a3f70]">
                Publication Snapshot
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <InsightCard
                  title="Total Records"
                  value={summary.total}
                  helper="Parsed from publication PDF"
                />
                <InsightCard
                  title="Journal Articles"
                  value={summary.journals}
                  tone="journal"
                  helper="Peer-reviewed and journal metadata"
                />
                <InsightCard
                  title="Conference Papers"
                  value={summary.conferences}
                  tone="conference"
                  helper="Conference proceedings and papers"
                />
                <InsightCard
                  title="Latest Academic Year"
                  value={latestAcademicYear}
                  tone="faculty"
                  helper={`${summary.yearCount} academic years covered`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr,0.85fr]">
        <Card className="border-[#dfe8f4] bg-white/95">
          <CardContent className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a3f70]">
                  Contribution Overview
                </p>
                <h2 className="mt-2 font-['Georgia','Times_New_Roman',serif] text-2xl font-semibold text-[#0f2f66]">
                  Category distribution
                </h2>
              </div>
              <Badge variant="default">{summary.yearCount} years indexed</Badge>
            </div>

            <div className="mt-5 space-y-4">
              {[
                {
                  label: "Journal Articles",
                  value: summary.journals,
                  color: "bg-sky-500",
                },
                {
                  label: "Conference Papers",
                  value: summary.conferences,
                  color: "bg-amber-500",
                },
                {
                  label: "Books / Chapters",
                  value: summary.books,
                  color: "bg-slate-600",
                },
                {
                  label: "Other Records",
                  value: summary.other + summary.patents,
                  color: "bg-[#0f2f66]",
                },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="font-semibold text-[#0f2f66]">{item.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={cn("h-full rounded-full", item.color)}
                      style={{
                        width: `${summary.total ? (item.value / summary.total) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#dfe8f4] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
          <CardContent className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a3f70]">
              Faculty Spotlight
            </p>
            <h2 className="mt-2 font-['Georgia','Times_New_Roman',serif] text-2xl font-semibold text-[#0f2f66]">
              Most represented contributors
            </h2>

            <div className="mt-5 space-y-3">
              {summary.topFaculties.map((faculty, index) => (
                <div
                  key={faculty.faculty}
                  className="flex items-center justify-between rounded-2xl border border-[#e5edf6] bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#edf4fd] text-sm font-semibold text-[#0f2f66]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {faculty.faculty}
                      </p>
                      <p className="text-xs text-slate-500">
                        Publication records in extracted catalog
                      </p>
                    </div>
                  </div>

                  <Badge variant="type">{faculty.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <PublicationFilters
        search={search}
        selectedFaculty={selectedFaculty}
        selectedYear={selectedYear}
        selectedAuthor={selectedAuthor}
        selectedCategory={selectedCategory}
        yearOptions={options.yearOptions}
        facultyOptions={options.facultyOptions}
        authorOptions={options.authorOptions}
        categoryOptions={options.categoryOptions}
        activeFiltersCount={activeFiltersCount}
        onSearchChange={setSearch}
        onFacultyChange={setSelectedFaculty}
        onYearChange={setSelectedYear}
        onAuthorChange={setSelectedAuthor}
        onCategoryChange={setSelectedCategory}
        onResetFilters={handleResetFilters}
      />

      <section className="flex flex-col gap-3 rounded-2xl border border-[#e1e9f5] bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#0f2f66]">
            Showing {filteredPublications.length} publication
            {filteredPublications.length === 1 ? "" : "s"}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Filtered from {summary.total} total records extracted from the
            departmental publication PDF.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="published">Journals {summary.journals}</Badge>
          <Badge variant="applied">Conferences {summary.conferences}</Badge>
          <Badge variant="default">Books {summary.books}</Badge>
          <Badge variant="type">Faculty {summary.facultyCount}</Badge>
        </div>
      </section>

      <div className="hidden lg:block">
        <PublicationTable
          publications={paginatedPublications}
          startIndex={(page - 1) * PAGE_SIZE}
          total={filteredPublications.length}
          page={page}
          totalPages={totalPages}
          pageSize={PAGE_SIZE}
          onNextPage={() => setPage((current) => Math.min(totalPages, current + 1))}
          onPreviousPage={() => setPage((current) => Math.max(1, current - 1))}
          onPageSelect={setPage}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {paginatedPublications.length ? (
          paginatedPublications.map((publication) => (
            <MobilePublicationCard
              key={`${publication.id}-${publication.serialNumber}`}
              publication={publication}
            />
          ))
        ) : (
          <Card className="border-[#e5e7eb] bg-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-lg font-semibold text-[#0f2f66]">
                No publications found
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Try changing the filters or clearing the search text.
              </p>
            </CardContent>
          </Card>
        )}

        {filteredPublications.length ? (
          <Card className="border-[#e1e9f5] bg-white">
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <p className="text-sm text-slate-600">
                Page {page} of {totalPages}
              </p>

              <button
                type="button"
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                disabled={page === totalPages}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
