import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">
        {label}
      </span>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-10 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-white px-3 text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent className="rounded-xl border border-[var(--color-border)] bg-white shadow-lg">
          {options.map((option) => (
            <SelectItem key={option} value={option} className="rounded-lg data-[highlighted]:bg-[var(--color-surface-soft)] data-[highlighted]:text-[var(--color-heading)] px-2 py-1.5 text-sm">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

export default function FilterBar({
  search,
  searchPlaceholder = "Search...",
  filters = [],
  activeFiltersCount = 0,
  onSearchChange,
  onResetFilters,
  ariaLabel = "Search and filters",
}) {
  return (
    <section
      className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white/90 p-4 shadow-sm backdrop-blur-md md:p-5"
      aria-label={ariaLabel}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold tracking-wide text-[var(--color-primary)]">
          Search & Filters
        </p>
        <p className="text-xs text-[var(--color-text-soft)] font-medium">
          Active filters:{" "}
          <span className="font-bold text-[var(--color-text)]">
            {activeFiltersCount}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {onSearchChange && (
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">
              Search
            </span>
            <Input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-10 rounded-[var(--radius-input)] border border-[var(--color-border)] bg-white px-3 text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none"
            />
          </label>
        )}

        {filters.map((filter) => (
          <SelectField
            key={filter.label}
            label={filter.label}
            value={filter.value}
            options={filter.options}
            onChange={filter.onChange}
          />
        ))}
      </div>

      {onResetFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            onClick={onResetFilters}
            variant="soft"
            size="lg"
            className="rounded-[var(--radius-button)] font-bold transition-all"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </section>
  );
}
