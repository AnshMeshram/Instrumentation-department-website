import FilterBar from "./FilterBar";

const statusOptions = ["All", "Ongoing", "Completed"];

export default function ResearchPaperFilters({
  search,
  selectedStatus,
  selectedYear,
  selectedSponsor,
  yearOptions,
  sponsorOptions,
  activeFiltersCount,
  onSearchChange,
  onStatusChange,
  onYearChange,
  onSponsorChange,
  onResetFilters,
}) {
  const filters = [
    {
      label: "Status",
      value: selectedStatus,
      options: statusOptions,
      onChange: onStatusChange,
    },
    {
      label: "Academic Year",
      value: selectedYear,
      options: ["All", ...yearOptions],
      onChange: onYearChange,
    },
    {
      label: "Sponsor",
      value: selectedSponsor,
      options: ["All", ...sponsorOptions],
      onChange: onSponsorChange,
    },
  ];

  return (
    <FilterBar
      search={search}
      searchPlaceholder="Search title, PI or Co-PI"
      filters={filters}
      activeFiltersCount={activeFiltersCount}
      onSearchChange={onSearchChange}
      onResetFilters={onResetFilters}
      ariaLabel="Research paper search and filters"
    />
  );
}
