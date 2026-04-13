import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const statusOptions = ["All", "Completed", "Ongoing"];

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </span>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

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
  return (
    <section
      className="rounded-2xl border border-[#e5e7eb] bg-white/95 p-4 shadow-sm backdrop-blur-sm md:p-5"
      aria-label="Consultancy search and filters"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold tracking-wide text-[#0f2f66]">
          Search & Filters
        </p>
        <p className="text-xs text-slate-500">
          Active filters:{" "}
          <span className="font-semibold text-slate-700">
            {activeFiltersCount}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Search
          </span>
          <Input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search title, leader or agency"
          />
        </label>

        <SelectField
          label="Project Leader"
          value={selectedLeader}
          options={["All", ...leaderOptions]}
          onChange={onLeaderChange}
        />

        <SelectField
          label="Year"
          value={selectedYear}
          options={["All", ...yearOptions]}
          onChange={onYearChange}
        />

        <SelectField
          label="Status"
          value={selectedStatus}
          options={statusOptions}
          onChange={onStatusChange}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="button" onClick={onResetFilters} variant="soft" size="lg">
          Reload Filters
        </Button>
      </div>
    </section>
  );
}
