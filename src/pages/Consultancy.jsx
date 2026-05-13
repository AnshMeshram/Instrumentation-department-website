import { useMemo, useState } from "react";
import ConsultancyCard from "../components/ConsultancyCard";
import ConsultancyFilters from "../components/ConsultancyFilters";
import ConsultancyTable from "../components/ConsultancyTable";
import consultancyData from "../data/consultancy.json";

export default function Consultancy() {
  const [search, setSearch] = useState("");
  const [selectedLeader, setSelectedLeader] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  function handleResetFilters() {
    setSearch("");
    setSelectedLeader("All");
    setSelectedYear("All");
    setSelectedStatus("All");
  }

  const leaderOptions = useMemo(() => {
    const leaders = Array.from(
      new Set(
        consultancyData.map((item) => item.projectLeader).filter(Boolean),
      ),
    );

    return leaders.sort((a, b) => a.localeCompare(b));
  }, []);

  const yearOptions = useMemo(() => {
    const yearLabels = Array.from(
      new Set(consultancyData.map((item) => item.yearLabel).filter(Boolean)),
    );

    return yearLabels.sort((a, b) => {
      const first =
        consultancyData.find((item) => item.yearLabel === a)?.yearSort || 0;
      const second =
        consultancyData.find((item) => item.yearLabel === b)?.yearSort || 0;
      return second - first;
    });
  }, []);

  const summary = useMemo(() => {
    return consultancyData.reduce(
      (acc, item) => {
        acc.total += 1;
        if (item.status === "Completed") acc.completed += 1;
        if (item.status === "Ongoing") acc.ongoing += 1;
        return acc;
      },
      { total: 0, completed: 0, ongoing: 0 },
    );
  }, []);

  const activeFiltersCount =
    (search.trim() ? 1 : 0) +
    (selectedLeader !== "All" ? 1 : 0) +
    (selectedYear !== "All" ? 1 : 0) +
    (selectedStatus !== "All" ? 1 : 0);

  const filteredConsultancies = useMemo(() => {
    const query = search.trim().toLowerCase();

    return consultancyData
      .filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const leaderMatch = item.projectLeader.toLowerCase().includes(query);
        const agencyMatch = item.fundingAgency.toLowerCase().includes(query);

        const leaderFilterMatch =
          selectedLeader === "All" || item.projectLeader === selectedLeader;
        const yearFilterMatch =
          selectedYear === "All" || item.yearLabel === selectedYear;
        const statusFilterMatch =
          selectedStatus === "All" || item.status === selectedStatus;

        return (
          (query ? titleMatch || leaderMatch || agencyMatch : true) &&
          leaderFilterMatch &&
          yearFilterMatch &&
          statusFilterMatch
        );
      })
      .sort((first, second) => {
        if (first.yearSort === second.yearSort) {
          if (first.projectLeader === second.projectLeader) {
            return Number(first.srNo) - Number(second.srNo);
          }

          return first.projectLeader.localeCompare(second.projectLeader);
        }

        return second.yearSort - first.yearSort;
      });
  }, [search, selectedLeader, selectedYear, selectedStatus]);

  return (
    <div className="space-y-12 pb-12">
      <section className="overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="grid gap-12 px-8 py-12 lg:grid-cols-[1.3fr,0.7fr] lg:px-12 lg:py-16 relative">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="type" className="bg-[var(--color-primary)] text-white px-4 py-1.5">Industry Engagement</Badge>
              <Badge variant="default" className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border-[var(--color-border)] px-4 py-1.5">Consultancy & Training</Badge>
            </div>

            <h1 className="mt-8 font-[var(--font-serif)] text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-6xl">
              Consultancy <br />& Services
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
              A comprehensive record of industrial consultancy and training projects 
              reflecting our expertise in real-world instrumentation and automation 
              problem solving.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-3 transition-all hover:bg-white hover:shadow-md group">
                <BriefcaseBusiness size={20} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-[var(--color-heading)]">{summary.total} projects</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-3 transition-all hover:bg-white hover:shadow-md group">
                <Building2 size={20} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-[var(--color-heading)]">{leaderOptions.length} lead investigators</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-8 py-8 shadow-inner transition-all hover:bg-white hover:shadow-md group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                    Active Portfolio
                  </p>
                  <p className="mt-4 text-5xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                    {summary.total}
                  </p>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                   <Activity size={28} />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[2rem] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-6 py-6 shadow-inner transition-all hover:bg-white hover:shadow-md group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  Completed
                </p>
                <p className="mt-2 text-3xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                  {summary.completed}
                </p>
              </div>
              <div className="rounded-[2rem] border border-[var(--color-highlight)]/20 bg-[var(--color-highlight)]/5 px-6 py-6 shadow-inner transition-all hover:bg-white hover:shadow-md group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-highlight)]">
                  Ongoing
                </p>
                <p className="mt-2 text-3xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                  {summary.ongoing}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultancyFilters
        search={search}
        selectedLeader={selectedLeader}
        selectedYear={selectedYear}
        selectedStatus={selectedStatus}
        yearOptions={yearOptions}
        leaderOptions={leaderOptions}
        activeFiltersCount={activeFiltersCount}
        onSearchChange={setSearch}
        onLeaderChange={setSelectedLeader}
        onYearChange={setSelectedYear}
        onStatusChange={setSelectedStatus}
        onResetFilters={handleResetFilters}
      />

      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-slate-600" aria-live="polite">
          Showing {filteredConsultancies.length} consultancy
          {filteredConsultancies.length === 1 ? "" : "ies"}
        </p>
        <p className="hidden text-xs font-medium uppercase tracking-wide text-slate-500 lg:block">
          Desktop table view
        </p>
      </div>

      {filteredConsultancies.length === 0 ? (
        <section className="rounded-xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[#0f2f66]">
            No consultancy records found
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Try changing the search keywords or filters.
          </p>
        </section>
      ) : (
        <>
          <div className="hidden lg:block">
            <ConsultancyTable consultancies={filteredConsultancies} />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {filteredConsultancies.map((consultancy) => (
              <ConsultancyCard key={consultancy.id} consultancy={consultancy} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
