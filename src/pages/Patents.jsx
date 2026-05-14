import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { BadgeCheck, FileStack } from "lucide-react";
import PatentCard from "../components/PatentCard";
import PatentFilters from "../components/PatentFilters";
import PatentTable from "../components/PatentTable";
import { Badge } from "../components/ui/badge";
import patentsData from "../data/patents.json";

function getDateValue(patent) {
  return patent.applicationDate || patent.grantedDate || "";
}

function getYear(patent) {
  const source = getDateValue(patent);
  if (!source) return "";

  const parsed = dayjs(source);
  if (!parsed.isValid()) return "";

  return String(parsed.year());
}

export default function Patents() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  function handleResetFilters() {
    setSearch("");
    setSelectedStatus("All");
    setSelectedYear("All");
    setSelectedType("All");
  }

  const yearOptions = useMemo(() => {
    const years = Array.from(
      new Set(patentsData.map((patent) => getYear(patent)).filter(Boolean)),
    );

    return years.sort((a, b) => Number(b) - Number(a));
  }, []);

  const summary = useMemo(() => {
    return patentsData.reduce(
      (acc, patent) => {
        acc.total += 1;
        if (patent.status === "Granted") acc.granted += 1;
        if (patent.status === "Published") acc.published += 1;
        if (patent.status === "Applied") acc.applied += 1;
        return acc;
      },
      { total: 0, granted: 0, published: 0, applied: 0 },
    );
  }, []);

  const activeFiltersCount =
    (search.trim() ? 1 : 0) +
    (selectedStatus !== "All" ? 1 : 0) +
    (selectedYear !== "All" ? 1 : 0) +
    (selectedType !== "All" ? 1 : 0);

  const filteredPatents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patentsData
      .filter((patent) => {
        const titleMatch = patent.title.toLowerCase().includes(query);
        const facultyMatch = patent.facultyStudents
          .join(" ")
          .toLowerCase()
          .includes(query);

        const statusMatch =
          selectedStatus === "All" || patent.status === selectedStatus;
        const yearMatch =
          selectedYear === "All" || getYear(patent) === selectedYear;
        const typeMatch =
          selectedType === "All" || patent.type === selectedType;

        return (
          (query ? titleMatch || facultyMatch : true) &&
          statusMatch &&
          yearMatch &&
          typeMatch
        );
      })
      .sort((first, second) => {
        const firstDate = new Date(getDateValue(first)).getTime() || 0;
        const secondDate = new Date(getDateValue(second)).getTime() || 0;

        return secondDate - firstDate;
      });
  }, [search, selectedStatus, selectedYear, selectedType]);

  return (
    <div className="space-y-12 pb-12">
      <section className="overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="grid gap-12 px-8 py-12 lg:grid-cols-[1.3fr,0.7fr] lg:px-12 lg:py-16 relative">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="type" className="bg-[var(--color-primary)] text-white px-4 py-1.5">Intellectual Property</Badge>
              <Badge variant="default" className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border-[var(--color-border)] px-4 py-1.5">IP Portfolio</Badge>
            </div>

            <h1 className="mt-8 font-[var(--font-serif)] text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-6xl">
              Patents and <br />Innovation
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
              A record of granted, published, and filed patents reflecting the
              department&apos;s commitment to pioneering instrumentation and 
              industrial automation outcomes.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-3 transition-all hover:bg-white hover:shadow-md group">
                <FileStack size={20} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-[var(--color-heading)]">{summary.total} records</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-3 transition-all hover:bg-white hover:shadow-md group">
                <BadgeCheck size={20} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-[var(--color-heading)]">{yearOptions.length} years indexed</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-8 shadow-inner transition-all hover:bg-white hover:shadow-md group">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                Cumulative
              </p>
              <p className="mt-4 text-4xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {summary.total}
              </p>
              <p className="mt-2 text-[10px] font-bold text-[var(--color-accent)] uppercase">Patent Records</p>
            </div>
            <div className="rounded-[2rem] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-6 py-8 shadow-inner transition-all hover:bg-white hover:shadow-md group">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Granted
              </p>
              <p className="mt-4 text-4xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {summary.granted}
              </p>
              <p className="mt-2 text-[10px] font-bold text-[var(--color-accent)]/70 uppercase tracking-widest">Global IP</p>
            </div>
            <div className="rounded-[2rem] border border-[var(--color-highlight)]/20 bg-[var(--color-highlight)]/5 px-6 py-8 shadow-inner transition-all hover:bg-white hover:shadow-md group">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-highlight)]">
                Published
              </p>
              <p className="mt-4 text-4xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {summary.published}
              </p>
              <p className="mt-2 text-[10px] font-bold text-[var(--color-highlight)]/70 uppercase tracking-widest">Public Discl.</p>
            </div>
            <div className="rounded-[2rem] border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-6 py-8 shadow-inner transition-all hover:bg-white hover:shadow-md group">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Applied
              </p>
              <p className="mt-4 text-4xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {summary.applied}
              </p>
              <p className="mt-2 text-[10px] font-bold text-[var(--color-primary)]/70 uppercase tracking-widest">Filed IP</p>
            </div>
          </div>
        </div>
      </section>

      <PatentFilters
        search={search}
        selectedStatus={selectedStatus}
        selectedYear={selectedYear}
        selectedType={selectedType}
        yearOptions={yearOptions}
        activeFiltersCount={activeFiltersCount}
        onSearchChange={setSearch}
        onStatusChange={setSelectedStatus}
        onYearChange={setSelectedYear}
        onTypeChange={setSelectedType}
        onResetFilters={handleResetFilters}
      />

      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-slate-600" aria-live="polite">
          Showing {filteredPatents.length} patent
          {filteredPatents.length === 1 ? "" : "s"}
        </p>
        <p className="hidden text-xs font-medium uppercase tracking-wide text-slate-500 lg:block">
          Desktop table view
        </p>
      </div>

      {filteredPatents.length === 0 ? (
        <section className="rounded-[26px] border border-[var(--color-border)] bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--color-heading)]">
            No patents found
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Try changing the search keywords or filters.
          </p>
        </section>
      ) : (
        <>
          <div className="hidden lg:block">
            <PatentTable patents={filteredPatents} />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {filteredPatents.map((patent) => (
              <PatentCard key={patent.id} patent={patent} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
