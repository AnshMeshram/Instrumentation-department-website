import { Badge } from "./ui/badge";

export default function PageHeader({ title, subtitle, badgeText = "Department Resource" }) {
  return (
    <section className="overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] relative mb-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      
      <div className="px-8 py-12 lg:px-12 lg:py-16 relative">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="type" className="bg-[var(--color-primary)] text-white px-4 py-1.5">{badgeText}</Badge>
          <Badge variant="default" className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border-[var(--color-border)] px-4 py-1.5">Official Catalog</Badge>
        </div>

        <h1 className="mt-8 font-[var(--font-serif)] text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
            {subtitle}
          </p>
        )}
        
        <div className="mt-10 h-1 w-20 bg-[var(--color-accent)] rounded-full" />
      </div>
    </section>
  );
}
