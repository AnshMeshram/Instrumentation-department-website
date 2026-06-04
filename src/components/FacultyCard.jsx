import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  Briefcase,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  ScrollText,
} from "lucide-react";
import {
  getFacultyDocPath,
  getFacultyImage,
  getTopDegree,
} from "../lib/facultyDirectory";

export default function FacultyCard({ faculty }) {
  const imgSrc = getFacultyImage(faculty.image);
  const docPath = getFacultyDocPath(faculty.id);
  const topDegree = getTopDegree(faculty);

  return (
    <Card className="group overflow-hidden border border-[var(--color-border)] bg-white rounded-[var(--radius-card)] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <CardContent className="p-0 flex flex-col h-full flex-1">
        {/* Image section — fixed aspect ratio */}
        <div className="relative w-full aspect-[3/2] overflow-hidden bg-[var(--color-surface-soft)] shrink-0">
          <img
            src={imgSrc}
            alt={faculty.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "/faculty_images/image.png";
            }}
            loading="lazy"
          />
          {/* Dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {/* Designation badge over image */}
          <div className="absolute bottom-3 left-3">
            <span className="rounded-full bg-[var(--color-primary)] px-3 py-1 text-[11px] font-bold text-white shadow-sm">
              {faculty.designation}
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="flex flex-col flex-1 p-5">
          {/* Name + research area */}
          <h3 className="font-serif text-xl font-black text-[var(--color-heading)] leading-tight group-hover:text-[var(--color-accent)] transition-colors">
            {faculty.name}
          </h3>
          {topDegree && (
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-soft)]">
              {topDegree}
            </p>
          )}
          <p className="mt-2 text-xs font-semibold text-[var(--color-text-soft)] uppercase tracking-wider line-clamp-2">
            {faculty.research}
          </p>

          {/* Divider */}
          <div className="my-4 h-px w-full bg-[var(--color-border)]" />

          {/* Stats row — show all metrics from faculty.json */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-[var(--color-surface-soft)] py-2 px-1">
              <p className="text-lg font-black text-[var(--color-heading)]">
                {faculty.publications?.length || 0}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-soft)]">
                Papers
              </p>
            </div>
            <div className="rounded-xl bg-[var(--color-surface-soft)] py-2 px-1">
              <p className="text-lg font-black text-[var(--color-heading)]">
                {faculty.patents?.length || 0}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-soft)]">
                Patents
              </p>
            </div>
            <div className="rounded-xl bg-[var(--color-surface-soft)] py-2 px-1">
              <p className="text-lg font-black text-[var(--color-heading)]">
                {faculty.achievements?.length || 0}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-soft)]">
                Awards
              </p>
            </div>
          </div>

          {/* Contact row */}
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={"mailto:" + faculty.email}
              className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              <Mail size={13} className="shrink-0" />
              <span className="truncate">{faculty.email}</span>
            </a>
            <a
              href={"tel:" + faculty.phone.replace(/\s+/g, "")}
              className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              <Phone size={13} className="shrink-0" />
              <span>{faculty.phone}</span>
            </a>
          </div>

          {/* Spacer pushes button to bottom */}
          <div className="flex-1" />

          {/* Show docPath above View Profile if it exists */}
          {docPath && (
            <a
              href={docPath}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] py-2 text-xs font-bold text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-pointer"
            >
              <FileText size={13} />
              Profile Document
            </a>
          )}

          {/* View Profile CTA — full width, bottom of card */}
          <Link
            to={"/faculty/" + faculty.id}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] py-2.5 text-xs font-bold text-white transition-all hover:bg-[var(--color-accent)]"
          >
            View Profile
            <ArrowRight size={13} />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
