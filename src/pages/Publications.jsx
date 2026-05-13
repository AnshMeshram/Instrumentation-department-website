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
    default: "border-[var(--color-border)] bg-white text-[var(--color-text)]",
    journal: "border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 text-[var(--color-heading)]",
    conference: "border-[var(--color-highlight)]/20 bg-[var(--color-highlight)]/5 text-[var(--color-heading)]",
    faculty: "border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-heading)]",
  };

  return (
    <div className={cn("rounded-2xl border px-4 py-5 shadow-sm transition-all duration-300 hover:shadow-md", tones[tone])}>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
        {title}
      </p>
      <p className="mt-3 text-3xl font-black font-[var(--font-serif)] tracking-tight">{value}</p>
      {helper ? <p className="mt-1 text-[10px] font-medium text-[var(--color-text-soft)] opacity-80">{helper}</p> : null}
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
    <Card className="overflow-hidden border-none bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant={badgeVariant} className="px-3 py-1">{publication.category}</Badge>
            <h3 className="mt-4 text-lg font-black leading-tight text-[var(--color-heading)] font-[var(--font-serif)]">
              {publication.title}
            </h3>
          </div>
          <Badge variant="type" className="bg-[var(--color-surface-soft)] text-[var(--color-text-soft)]">{publication.sessionYear}</Badge>
        </div>

        <div className="space-y-4 border-t border-[var(--color-border)] pt-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] mb-1">
              Authors
            </p>
            <p className="text-sm font-medium leading-relaxed text-[var(--color-text-soft)]">{publication.authors}</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)] mb-1">
              Faculty Contribution
            </p>
            <p className="text-sm font-bold text-[var(--color-heading)]">{publication.faculty}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-soft)]">
              Published on
            </p>
            <p className="text-sm font-bold text-[var(--color-heading)]">
              {publication.publishedOn || publication.sessionYear}
            </p>
          </div>

          <a
            href={publication.publicationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[var(--color-primary-strong)] hover:shadow-lg"
          >
            Open Resource
            <ArrowUpRight size={14} />
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
    <div className="space-y-12 pb-12">
      <section className="overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="grid gap-12 px-8 py-12 lg:grid-cols-[1.3fr,0.7fr] lg:px-12 lg:py-16 relative">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="type" className="bg-[var(--color-primary)] text-white px-4 py-1.5">Research Catalog</Badge>
              <Badge variant="default" className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border-[var(--color-border)] px-4 py-1.5">Extracted Repository</Badge>
            </div>

            <h1 className="mt-8 font-[var(--font-serif)] text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-6xl">
              Academic <br />Publications
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
              A curated repository of departmental research, organized with 
              searchable metadata, multi-year contribution insights, and 
              faculty productivity analytics.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-3 transition-all hover:bg-white hover:shadow-md group">
                <LibraryBig size={20} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-[var(--color-heading)]">{summary.total} indexed records</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-3 transition-all hover:bg-white hover:shadow-md group">
                <Microscope size={20} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-[var(--color-heading)]">{summary.facultyCount} faculty contributors</span>
              </div>
            </div>
          </div>

          <Card className="border-none bg-[var(--color-surface-soft)] shadow-inner">
            <CardContent className="p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-accent)]">
                Performance Metrics
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InsightCard
                  title="Total Records"
                  value={summary.total}
                  helper="Cumulative Repository"
                />
                <InsightCard
                  title="Journal Articles"
                  value={summary.journals}
                  tone="journal"
                  helper="Peer-reviewed Output"
                />
                <InsightCard
                  title="Conference"
                  value={summary.conferences}
                  tone="conference"
                  helper="Global Proceedings"
                />
                <InsightCard
                  title="Coverage"
                  value={latestAcademicYear}
                  tone="faculty"
                  helper={`${summary.yearCount} Years of Data`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
        <Card className="border-none bg-white shadow-sm overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-accent)]">
                  Data Distribution
                </p>
                <h2 className="mt-3 font-[var(--font-serif)] text-2xl font-black text-[var(--color-heading)]">
                  Category breakdown
                </h2>
              </div>
              <Badge variant="default" className="bg-[var(--color-primary-soft)] text-[var(--color-primary)] border-none">{summary.yearCount} Years indexed</Badge>
            </div>

            <div className="mt-10 space-y-6">
              {[
                {
                  label: "Journal Articles",
                  value: summary.journals,
                  color: "bg-[var(--color-accent)]",
                },
                {
                  label: "Conference Papers",
                  value: summary.conferences,
                  color: "bg-[var(--color-primary)]",
                },
                {
                  label: "Books / Chapters",
                  value: summary.books,
                  color: "bg-[var(--color-highlight)]",
                },
                {
                  label: "Other Records",
                  value: summary.other + summary.patents,
                  color: "bg-[var(--color-text-soft)]",
                },
              ].map((item) => (
                <div key={item.label} className="space-y-3">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-[var(--color-text)]">{item.label}</span>
                    <span className="text-[var(--color-primary)]">{item.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-soft)]">
                    <div
                      className={cn("h-full rounded-full transition-all duration-1000", item.color)}
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

        <Card className="border-none bg-black text-white shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
          <CardContent className="p-8 relative">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Productivity Leaderboard
            </p>
            <h2 className="mt-3 font-[var(--font-serif)] text-2xl font-black text-white">
              Primary contributors
            </h2>

            <div className="mt-8 space-y-3">
              {summary.topFaculties.map((faculty, index) => (
                <div
                  key={faculty.faculty}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:bg-white/10 hover:-translate-x-1"
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent)]/20 text-sm font-black text-[var(--color-accent)]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {faculty.faculty}
                      </p>
                      <p className="text-[10px] font-medium text-white/50 uppercase tracking-widest">
                        Extracted catalog entry
                      </p>
                    </div>
                  </div>

                  <Badge className="bg-[var(--color-accent)] text-black font-black border-none">{faculty.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 p-2">
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
      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-white px-8 py-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-bold text-[var(--color-heading)]">
            Displaying {filteredPublications.length} research records
          </p>
          <p className="mt-1 text-xs font-medium text-[var(--color-text-soft)]">
            Refined results from {summary.total} total extracted entries.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-none">Journals: {summary.journals}</Badge>
          <Badge className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-none">Conferences: {summary.conferences}</Badge>
          <Badge className="bg-[var(--color-highlight)]/10 text-[var(--color-highlight)] border-none">Books: {summary.books}</Badge>
        </div>
      </section>

      <div className="hidden lg:block overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-sm">
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

      <div className="grid grid-cols-1 gap-6 lg:hidden">
        {paginatedPublications.length ? (
          paginatedPublications.map((publication) => (
            <MobilePublicationCard
              key={`${publication.id}-${publication.serialNumber}`}
              publication={publication}
            />
          ))
        ) : (
          <Card className="border-dashed border-2 border-[var(--color-border)] bg-[var(--color-surface-soft)]">
            <CardContent className="p-12 text-center">
              <h2 className="text-xl font-bold text-[var(--color-heading)]">
                No publications found
              </h2>
              <p className="mt-2 text-sm text-[var(--color-text-soft)] font-medium">
                Try adjusting your filters or search terms.
              </p>
            </CardContent>
          </Card>
        )}

        {filteredPublications.length ? (
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="flex-1 rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm font-bold text-[var(--color-heading)] transition hover:bg-[var(--color-surface-soft)] disabled:opacity-30"
            >
              Previous
            </button>

            <span className="text-sm font-bold text-[var(--color-text-soft)]">
              {page} / {totalPages}
            </span>

            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={page === totalPages}
              className="flex-1 rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm font-bold text-[var(--color-heading)] transition hover:bg-[var(--color-surface-soft)] disabled:opacity-30"
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
