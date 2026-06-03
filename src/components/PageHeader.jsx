import { Badge } from "./ui/badge";

export default function PageHeader({
  title,
  subtitle,
  badgeText = "Department Resource",
}) {
  return (
    <section className="relative mb-8 overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)]">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[linear-gradient(to_left,var(--color-primary-soft)_0%,transparent_100%)] lg:block" />

      <div className="px-6 py-10 lg:px-10 lg:py-12 relative">
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="type"
            className="bg-[var(--color-primary)] text-white px-4 py-1.5"
          >
            {badgeText}
          </Badge>
          <Badge
            variant="default"
            className="border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-1.5 text-[var(--color-text)]"
          >
            Official Catalog
          </Badge>
        </div>

        <h1 className="mt-8 font-[var(--font-serif)] text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
