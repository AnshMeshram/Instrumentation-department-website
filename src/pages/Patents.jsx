import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { ArrowRight, BadgeCheck, FileStack, Shield } from "lucide-react";
import PatentCard from "../components/PatentCard";
import PatentFilters from "../components/PatentFilters";
import PatentTable from "../components/PatentTable";
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
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[30px] border border-[var(--color-border)] bg-[linear-gradient(135deg,#f9fbfd_0%,#ffffff_46%,#edf3f8_100%)] shadow-[var(--shadow-soft)]">
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.15fr,0.85fr] lg:px-8 lg:py-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">
                <Shield size={14} />
                Research & Innovation
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e6d3a8] bg-[#fff9ec] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a6415]">
                IP Portfolio
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl font-[var(--font-serif)] text-4xl font-semibold leading-tight tracking-tight text-[var(--color-heading)] md:text-5xl">
              Patents and intellectual property outcomes
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-text-soft)]">
              Explore granted, published, and applied patents that reflect the
              department&apos;s work in instrumentation, control, embedded
              systems, automation, and applied engineering innovation.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white">
                <FileStack size={16} />
                {summary.total} patent records
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-primary)]">
                <BadgeCheck size={16} />
                {yearOptions.length} years indexed
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 self-start">
            <div className="rounded-[24px] border border-[var(--color-border)] bg-white px-4 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Total
              </p>
              <p className="mt-3 text-3xl font-semibold text-[var(--color-heading)]">
                {summary.total}
              </p>
              <p className="mt-2 text-sm text-slate-500">All patent records</p>
            </div>
            <div className="rounded-[24px] border border-emerald-100 bg-emerald-50 px-4 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Granted
              </p>
              <p className="mt-3 text-3xl font-semibold text-emerald-800">
                {summary.granted}
              </p>
              <p className="mt-2 text-sm text-emerald-700/80">Approved patents</p>
            </div>
            <div className="rounded-[24px] border border-sky-100 bg-sky-50 px-4 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
                Published
              </p>
              <p className="mt-3 text-3xl font-semibold text-sky-800">
                {summary.published}
              </p>
              <p className="mt-2 text-sm text-sky-700/80">Publicly disclosed</p>
            </div>
            <div className="rounded-[24px] border border-amber-100 bg-amber-50 px-4 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
                Applied
              </p>
              <p className="mt-3 text-3xl font-semibold text-amber-800">
                {summary.applied}
              </p>
              <p className="mt-2 text-sm text-amber-700/80">Filed applications</p>
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
