import FilterBar from "./FilterBar";

export default function PublicationFilters({
  search,
  selectedFaculty,
  selectedYear,
  selectedAuthor,
  selectedCategory,
  yearOptions,
  facultyOptions,
  authorOptions,
  categoryOptions,
  activeFiltersCount,
  onSearchChange,
  onFacultyChange,
  onYearChange,
  onAuthorChange,
  onCategoryChange,
  onResetFilters,
}) {
  const filters = [
    {
      label: "Faculty",
      value: selectedFaculty,
      options: ["All", ...facultyOptions],
      onChange: onFacultyChange,
    },
    {
      label: "Session Year",
      value: selectedYear,
      options: ["All", ...yearOptions],
      onChange: onYearChange,
    },
    {
      label: "Author",
      value: selectedAuthor,
      options: ["All", ...authorOptions],
      onChange: onAuthorChange,
    },
    {
      label: "Category",
      value: selectedCategory,
      options: ["All", ...categoryOptions],
      onChange: onCategoryChange,
    },
  ];

  return (
    <FilterBar
      search={search}
      searchPlaceholder="Search title, authors or venue"
      filters={filters}
      activeFiltersCount={activeFiltersCount}
      onSearchChange={onSearchChange}
      onResetFilters={onResetFilters}
      ariaLabel="Publication search and filters"
    />
  );
}
