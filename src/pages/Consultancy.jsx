import { useMemo, useState } from "react";
import { Activity, BadgeCheck, BriefcaseBusiness, Building2 } from "lucide-react";
import { Badge } from "../components/ui/badge";
import ConsultancyCard from "../components/ConsultancyCard";
import ConsultancyFilters from "../components/ConsultancyFilters";
import ConsultancyTable from "../components/ConsultancyTable";
import consultancyData from "../data/consultancy.json";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

export default function Consultancy() {
  useDocumentMetadata({
    title: "Consultancy & Industry Services",
    description: "Explore the consulting services, technology transfers, and industrial projects undertaken by our faculty members.",
  });
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
      <section className="overflow-hidden rounded-[var(--radius-container)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] relative">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle, var(--color-primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative px-8 py-12 lg:px-12 lg:py-14 space-y-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="type" className="bg-[var(--color-primary)] text-white px-4 py-1.5">Industry Engagement</Badge>
              <Badge variant="default" className="bg-white text-[var(--color-text)] border-[var(--color-border)] px-4 py-1.5">Consultancy & Training</Badge>
            </div>

            <h1 className="mt-8 font-[var(--font-serif)] text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-6xl">
              Consultancy & Services
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
              A comprehensive record of industrial consultancy and training projects
              reflecting our expertise in real-world instrumentation and automation
              problem solving.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-8">
            <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-6 py-4 shadow-sm">
              <BriefcaseBusiness size={20} className="text-[var(--color-accent)]" />
              <div>
                <p className="text-2xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">{summary.total}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-soft)]">Total Projects</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-6 py-4">
              <BadgeCheck size={20} className="text-[var(--color-accent)]" />
              <div>
                <p className="text-2xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">{summary.completed}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-soft)]">Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-highlight)]/20 bg-[var(--color-highlight)]/5 px-6 py-4">
              <Activity size={20} className="text-[var(--color-highlight)]" />
              <div>
                <p className="text-2xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">{summary.ongoing}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-soft)]">Ongoing</p>
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
        <p className="text-sm text-[var(--color-text-soft)]" aria-live="polite">
          Showing {filteredConsultancies.length} {filteredConsultancies.length === 1 ? "consultancy" : "consultancies"}
        </p>
        <p className="hidden text-xs font-medium uppercase tracking-wide text-[var(--color-text-soft)] md:block">
          Table view
        </p>
      </div>

      {filteredConsultancies.length === 0 ? (
        <section className="rounded-xl border border-[var(--color-border)] bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--color-primary)]">
            No consultancy records found
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-soft)]">
            Try changing the search keywords or filters.
          </p>
        </section>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <ConsultancyTable consultancies={filteredConsultancies} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredConsultancies.map((consultancy) => (
              <ConsultancyCard key={consultancy.id} consultancy={consultancy} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
