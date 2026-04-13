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
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-[#d6e2f1] bg-linear-to-r from-[#f4f8fe] via-white to-[#f6faff] p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a3f70]">
              Research & Innovation
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0f2f66] md:text-4xl">
              Consultancy
            </h1>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              Consultancy (from Industry) projects listed exactly from the PDF
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-lg border border-[#d2dff0] bg-white px-3 py-2 text-center">
              <p className="text-xs text-slate-500">Total</p>
              <p className="text-lg font-semibold text-slate-900">
                {summary.total}
              </p>
            </div>
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-center">
              <p className="text-xs text-emerald-700">Completed</p>
              <p className="text-lg font-semibold text-emerald-800">
                {summary.completed}
              </p>
            </div>
            <div className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2 text-center">
              <p className="text-xs text-sky-700">Ongoing</p>
              <p className="text-lg font-semibold text-sky-800">
                {summary.ongoing}
              </p>
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
