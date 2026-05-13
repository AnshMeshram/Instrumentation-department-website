import { useMemo, useState } from "react";
import ResearchPaperCard from "../components/ResearchPaperCard";
import ResearchPaperFilters from "../components/ResearchPaperFilters";
import ResearchPaperTable from "../components/ResearchPaperTable";
import researchPapersData from "../data/researchPapers.json";
import { Badge } from "../components/ui/badge";
import { Activity, BookMarked, Globe, Layers } from "lucide-react";

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
    <div className="space-y-12 pb-12">
      <section className="overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="grid gap-12 px-8 py-12 lg:grid-cols-[1.3fr,0.7fr] lg:px-12 lg:py-16 relative">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="type" className="bg-[var(--color-primary)] text-white px-4 py-1.5">Research Initiative</Badge>
              <Badge variant="default" className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border-[var(--color-border)] px-4 py-1.5">Sponsored Projects</Badge>
            </div>

            <h1 className="mt-8 font-[var(--font-serif)] text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-6xl">
              Research <br />Papers & Projects
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
              A curated catalog of sponsored research projects and academic publications 
              advancing the boundaries of instrumentation and control engineering.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-3 transition-all hover:bg-white hover:shadow-md group">
                <BookMarked size={20} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-[var(--color-heading)]">{summary.total} indexed papers</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-3 transition-all hover:bg-white hover:shadow-md group">
                <Globe size={20} className="text-[var(--color-accent)] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold text-[var(--color-heading)]">{sponsorOptions.length} global sponsors</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-8 py-8 shadow-inner transition-all hover:bg-white hover:shadow-md group">
               <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                    Total Volume
                  </p>
                  <p className="mt-4 text-5xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                    {summary.total}
                  </p>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                   <Layers size={28} />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[2rem] border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-6 py-6 shadow-inner transition-all hover:bg-white hover:shadow-md group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  Ongoing
                </p>
                <p className="mt-2 text-3xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                  {summary.ongoing}
                </p>
              </div>
              <div className="rounded-[2rem] border border-[var(--color-highlight)]/20 bg-[var(--color-highlight)]/5 px-6 py-6 shadow-inner transition-all hover:bg-white hover:shadow-md group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-highlight)]">
                  Completed
                </p>
                <p className="mt-2 text-3xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                  {summary.completed}
                </p>
              </div>
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
        <p className="text-sm font-bold text-[var(--color-heading)]" aria-live="polite">
          Showing {filteredPapers.length} research projects
        </p>
        <p className="hidden text-xs font-black uppercase tracking-widest text-[var(--color-text-soft)] lg:block">
          Institution Catalog View
        </p>
      </div>

      {filteredPapers.length === 0 ? (
        <section className="rounded-[2.5rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 p-12 text-center">
          <h2 className="text-xl font-bold text-[var(--color-heading)]">
            No research papers found
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-soft)] font-medium">
            Try adjusting your search filters.
          </p>
        </section>
      ) : (
        <>
          <div className="hidden lg:block overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-sm">
            <ResearchPaperTable papers={filteredPapers} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:hidden">
            {filteredPapers.map((paper) => (
              <ResearchPaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
