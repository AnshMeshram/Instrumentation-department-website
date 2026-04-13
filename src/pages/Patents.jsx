import { useMemo, useState } from "react";
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

  const year = new Date(source).getFullYear();
  if (Number.isNaN(year)) return "";

  return String(year);
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
      <section className="overflow-hidden rounded-2xl border border-[#d6e2f1] bg-linear-to-r from-[#f4f8fe] via-white to-[#f6faff] p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a3f70]">
              Research & Innovation
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#0f2f66] md:text-4xl">
              Patents
            </h1>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              Obtained / Published / Applied
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-lg border border-[#d2dff0] bg-white px-3 py-2 text-center">
              <p className="text-xs text-slate-500">Total</p>
              <p className="text-lg font-semibold text-slate-900">
                {summary.total}
              </p>
            </div>
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-center">
              <p className="text-xs text-emerald-700">Granted</p>
              <p className="text-lg font-semibold text-emerald-800">
                {summary.granted}
              </p>
            </div>
            <div className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2 text-center">
              <p className="text-xs text-sky-700">Published</p>
              <p className="text-lg font-semibold text-sky-800">
                {summary.published}
              </p>
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-center">
              <p className="text-xs text-amber-700">Applied</p>
              <p className="text-lg font-semibold text-amber-800">
                {summary.applied}
              </p>
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
        <section className="rounded-xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[#0f2f66]">
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
