import { useMemo, useState } from "react";
import ResearchPaperCard from "../components/ResearchPaperCard";
import ResearchPaperFilters from "../components/ResearchPaperFilters";
import ResearchPaperTable from "../components/ResearchPaperTable";
import researchPapersData from "../data/researchPapers.json";

function getDateValue(paper) {
  return paper.sanctionedDate || "";
}

export default function ResearchPapers() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedSponsor, setSelectedSponsor] = useState("All");

  function handleResetFilters() {
    setSearch("");
    setSelectedStatus("All");
    setSelectedYear("All");
    setSelectedSponsor("All");
  }

  const yearOptions = useMemo(() => {
    const years = Array.from(
      new Set(researchPapersData.map((paper) => paper.year).filter(Boolean)),
    );

    return years.sort((a, b) => b.localeCompare(a));
  }, []);

  const sponsorOptions = useMemo(() => {
    const sponsors = Array.from(
      new Set(
        researchPapersData
          .map((paper) => paper.sponsoringAuthority)
          .filter(Boolean),
      ),
    );

    return sponsors.sort((a, b) => a.localeCompare(b));
  }, []);

  const summary = useMemo(() => {
    return researchPapersData.reduce(
      (acc, paper) => {
        acc.total += 1;
        if (paper.status === "Ongoing") acc.ongoing += 1;
        if (paper.status === "Completed") acc.completed += 1;
        return acc;
      },
      { total: 0, ongoing: 0, completed: 0 },
    );
  }, []);

  const activeFiltersCount =
    (search.trim() ? 1 : 0) +
    (selectedStatus !== "All" ? 1 : 0) +
    (selectedYear !== "All" ? 1 : 0) +
    (selectedSponsor !== "All" ? 1 : 0);

  const filteredPapers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return researchPapersData
      .filter((paper) => {
        const titleMatch = paper.title.toLowerCase().includes(query);
        const investigatorMatch = paper.investigators
          .join(" ")
          .toLowerCase()
          .includes(query);

        const statusMatch =
          selectedStatus === "All" || paper.status === selectedStatus;
        const yearMatch = selectedYear === "All" || paper.year === selectedYear;
        const sponsorMatch =
          selectedSponsor === "All" ||
          paper.sponsoringAuthority === selectedSponsor;

        return (
          (query ? titleMatch || investigatorMatch : true) &&
          statusMatch &&
          yearMatch &&
          sponsorMatch
        );
      })
      .sort((first, second) => {
        const firstDate = new Date(getDateValue(first)).getTime() || 0;
        const secondDate = new Date(getDateValue(second)).getTime() || 0;

        return secondDate - firstDate;
      });
  }, [search, selectedStatus, selectedYear, selectedSponsor]);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-[#d6e2f1] bg-linear-to-r from-[#f4f8fe] via-white to-[#f6faff] p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a3f70]">
              Research & Innovation
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0f2f66] md:text-4xl">
              Research Papers
            </h1>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              Sponsored projects and publication-oriented research work
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-lg border border-[#d2dff0] bg-white px-3 py-2 text-center">
              <p className="text-xs text-slate-500">Total</p>
              <p className="text-lg font-semibold text-slate-900">
                {summary.total}
              </p>
            </div>
            <div className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2 text-center">
              <p className="text-xs text-sky-700">Ongoing</p>
              <p className="text-lg font-semibold text-sky-800">
                {summary.ongoing}
              </p>
            </div>
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-center">
              <p className="text-xs text-emerald-700">Completed</p>
              <p className="text-lg font-semibold text-emerald-800">
                {summary.completed}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ResearchPaperFilters
        search={search}
        selectedStatus={selectedStatus}
        selectedYear={selectedYear}
        selectedSponsor={selectedSponsor}
        yearOptions={yearOptions}
        sponsorOptions={sponsorOptions}
        activeFiltersCount={activeFiltersCount}
        onSearchChange={setSearch}
        onStatusChange={setSelectedStatus}
        onYearChange={setSelectedYear}
        onSponsorChange={setSelectedSponsor}
        onResetFilters={handleResetFilters}
      />

      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-slate-600" aria-live="polite">
          Showing {filteredPapers.length} research paper
          {filteredPapers.length === 1 ? "" : "s"}
        </p>
        <p className="hidden text-xs font-medium uppercase tracking-wide text-slate-500 lg:block">
          Desktop table view
        </p>
      </div>

      {filteredPapers.length === 0 ? (
        <section className="rounded-xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[#0f2f66]">
            No research papers found
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Try changing the search keywords or filters.
          </p>
        </section>
      ) : (
        <>
          <div className="hidden lg:block">
            <ResearchPaperTable papers={filteredPapers} />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {filteredPapers.map((paper) => (
              <ResearchPaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
