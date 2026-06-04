import { Link } from "react-router-dom";
import { ArrowUpRight, FileText, Mail, Phone } from "lucide-react";
import {
  getFacultyDocPath,
  getFacultyImage,
  getFacultyMetrics,
  getTopDegree,
} from "../lib/facultyDirectory";

export default function FacultyCard({ faculty }) {
  const imgSrc = getFacultyImage(faculty.image);
  const docPath = getFacultyDocPath(faculty.id);
  const metrics = getFacultyMetrics(faculty);
  const topDegree = getTopDegree(faculty);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border
      border-[var(--color-border)] bg-white transition-all duration-300
      hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.1)]">

      {/* Photo â€” square crop, face visible at top */}
      <div className="relative aspect-square w-full overflow-hidden
        bg-[var(--color-surface-soft)]">
        <img
          src={imgSrc}
          alt={faculty.name}
          className="absolute inset-0 h-full w-full object-cover object-top
            transition-transform duration-500 group-hover:scale-[1.03]"
          onError={(e) => { e.target.src = "/faculty_images/image.png"; }}
          loading="lazy"
          decoding="async"
        />
        {/* teal accent line slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]
          translate-y-full bg-[var(--color-accent)]
          transition-transform duration-300 group-hover:translate-y-0" />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">

        {/* Designation */}
        <span className="inline-flex w-fit rounded-full border
          border-[var(--color-border)] bg-[var(--color-surface-soft)]
          px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em]
          text-[var(--color-text-soft)]">
          {faculty.designation}
        </span>

        {/* Name */}
        <h3 className="mt-3 font-[var(--font-serif)] text-[1.1rem] font-black
          leading-snug text-[var(--color-heading)] transition-colors
          group-hover:text-[var(--color-accent)]">
          {faculty.name}
        </h3>

        {/* Top qualification */}
        <p className="mt-1 text-[11px] font-semibold text-[var(--color-text-soft)]">
          {topDegree}
        </p>

        {/* Research area */}
        <p className="mt-3 border-l-2 border-[var(--color-accent)] pl-3
          text-[12px] leading-relaxed text-[var(--color-text-soft)] line-clamp-2">
          {faculty.research}
        </p>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-[var(--color-border)]" />

        {/* 3 stat boxes */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { n: metrics.publicationCount, label: "Papers" },
            { n: metrics.patentCount,      label: "Patents" },
            { n: metrics.achievementCount, label: "Awards" },
          ].map(({ n, label }) => (
            <div key={label}
              className="rounded-xl bg-[var(--color-surface-soft)] py-2">
              <p className="text-base font-black text-[var(--color-heading)]">
                {n}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wide
                text-[var(--color-text-soft)]">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-4 space-y-2">
          <a href={"mailto:" + faculty.email}
            className="flex items-center gap-2 rounded-lg border
              border-[var(--color-border)] px-3 py-2 text-[11px] font-semibold
              text-[var(--color-text)] transition-colors
              hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
            <Mail size={12} className="shrink-0 text-[var(--color-accent)]" />
            <span className="truncate">{faculty.email}</span>
          </a>
          <a href={"tel:" + faculty.phone.replace(/\s+/g, "")}
            className="flex items-center gap-2 rounded-lg border
              border-[var(--color-border)] px-3 py-2 text-[11px] font-semibold
              text-[var(--color-text)] transition-colors
              hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
            <Phone size={12} className="shrink-0 text-[var(--color-accent)]" />
            <span>{faculty.phone}</span>
          </a>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA row */}
        <div className="mt-5 flex items-center gap-2 border-t
          border-[var(--color-border)] pt-4">
          <Link to={"/faculty/" + faculty.id}
            className="flex flex-1 items-center justify-center gap-1.5
              rounded-full bg-[var(--color-primary)] py-2.5 text-[11px]
              font-bold text-white transition-colors
              hover:bg-[var(--color-accent)]">
            View Profile
            <ArrowUpRight size={12} />
          </Link>
          {docPath && (
            <a href={docPath} target="_blank" rel="noreferrer" title="Download CV"
              className="flex h-9 w-9 shrink-0 items-center justify-center
                rounded-full border border-[var(--color-border)]
                bg-[var(--color-surface-soft)] text-[var(--color-text-soft)]
                transition-colors hover:border-[var(--color-accent)]
                hover:text-[var(--color-accent)]">
              <FileText size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
