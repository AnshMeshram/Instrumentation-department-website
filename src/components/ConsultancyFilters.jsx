import FilterBar from "./FilterBar";

const statusOptions = ["All", "Completed", "Ongoing"];

export default function ConsultancyFilters({
  search,
  selectedLeader,
  selectedYear,
  selectedStatus,
  yearOptions,
  leaderOptions,
  activeFiltersCount,
  onSearchChange,
  onLeaderChange,
  onYearChange,
  onStatusChange,
  onResetFilters,
}) {
  const filters = [
    {
      label: "Project Leader",
      value: selectedLeader,
      options: ["All", ...leaderOptions],
      onChange: onLeaderChange,
    },
    {
      label: "Year",
      value: selectedYear,
      options: ["All", ...yearOptions],
      onChange: onYearChange,
    },
    {
      label: "Status",
      value: selectedStatus,
      options: statusOptions,
      onChange: onStatusChange,
    },
  ];

  return (
    <FilterBar
      search={search}
      searchPlaceholder="Search title, leader or agency"
      filters={filters}
      activeFiltersCount={activeFiltersCount}
      onSearchChange={onSearchChange}
      onResetFilters={onResetFilters}
      ariaLabel="Consultancy search and filters"
    />
  );
}
