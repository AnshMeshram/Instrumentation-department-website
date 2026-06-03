import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { FileSearch, Sparkles } from "lucide-react";

export default function DocumentIntelligencePanel({
  title,
  subtitle,
  summary,
  search,
  onSearchChange,
  placeholder,
}) {
  return (
    <Card className="overflow-hidden border-none bg-[var(--color-surface)] shadow-sm">
      <div className="h-1 bg-[linear-gradient(90deg,var(--color-accent),var(--color-highlight))]" />
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-primary-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
              <FileSearch size={12} />
              Academic Search
            </div>
            <div>
              <h2 className="text-2xl font-black font-[var(--font-serif)] text-[var(--color-heading)] md:text-3xl">
                {title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-soft)]">
                {subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="default"
                className="border-[var(--color-border)] bg-white text-[var(--color-text)]"
              >
                {summary.total} docs indexed
              </Badge>
              <Badge
                variant="default"
                className="border-[var(--color-border)] bg-white text-[var(--color-text)]"
              >
                {summary.tagCount} topics
              </Badge>
              {summary.latestYear ? (
                <Badge
                  variant="default"
                  className="border-[var(--color-border)] bg-white text-[var(--color-text)]"
                >
                  Latest year: {summary.latestYear}
                </Badge>
              ) : null}
            </div>
          </div>

          <div className="w-full max-w-md space-y-3">
            <label className="block text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
              Search Keywords
            </label>
            <div className="relative">
              <FileSearch
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-accent)]"
                size={18}
              />
              <input
                type="search"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] py-3.5 pl-11 pr-4 text-sm font-medium text-[var(--color-heading)] outline-none transition focus:border-[var(--color-accent)] focus:bg-white focus:ring-2 focus:ring-[var(--color-accent)]/15"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-soft)]">
              Key Topics
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {summary.topTags.length ? (
                summary.topTags.map((item) => (
                  <Badge
                    key={item.tag}
                    variant="default"
                    className="border-[var(--color-border)] bg-white text-[var(--color-heading)]"
                  >
                    {item.tag}{" "}
                    <span className="ml-1 text-[10px] opacity-60">
                      {item.count}
                    </span>
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-[var(--color-text-soft)]">
                  Topics will appear once records are loaded.
                </span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/60 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-soft)]">
              Categories
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {summary.topTypes.length ? (
                summary.topTypes.map((item) => (
                  <Badge
                    key={item.type}
                    variant="default"
                    className="border-[var(--color-border)] bg-white text-[var(--color-heading)]"
                  >
                    {item.type}{" "}
                    <span className="ml-1 text-[10px] opacity-60">
                      {item.count}
                    </span>
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-[var(--color-text-soft)]">
                  Categories will appear once records are loaded.
                </span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(0,0,0,0.94),rgba(0,0,0,0.88))] p-4 text-white">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
              Search Tips
            </p>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Search scans publication titles, years, topics, and authors to find matches.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
