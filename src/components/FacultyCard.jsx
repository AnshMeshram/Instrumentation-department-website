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
  getFacultyMetrics,
  getTopDegree,
} from "../lib/facultyDirectory";

export default function FacultyCard({ faculty }) {
  const imgSrc = getFacultyImage(faculty.image);
  const docPath = getFacultyDocPath(faculty.id);
  const metrics = getFacultyMetrics(faculty);
  const topDegree = getTopDegree(faculty);

  return (
    <Card className="group overflow-hidden border-none bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.14)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_50px_90px_-28px_rgba(0,0,0,0.2)]">
      <CardContent className="p-0">
        <div className="flex flex-col xl:flex-row">
          <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-[var(--color-surface-soft)] xl:w-72">
            <img
              src={imgSrc}
              alt={faculty.name}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-105"
              onError={(e) => {
                if (e?.target) e.target.src = "/faculty_images/image.png";
              }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <Badge className="bg-white/10 px-3 py-1 text-white backdrop-blur-md border-white/20">
                COEP Faculty
              </Badge>
              <p className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-accent)]">
                Research Mentor
              </p>
              <h4 className="mt-1 text-lg font-bold !text-white uppercase tracking-tight">
                Instrumentation and Control
              </h4>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-7 md:p-10">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-[var(--color-primary)] px-3 py-1 text-white border-none">
                  {faculty.designation}
                </Badge>
                <Badge className="border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-text)] px-3 py-1">
                  {metrics.publicationCount} publications
                </Badge>
                <Badge className="border-[var(--color-border)] bg-[var(--color-surface-soft)] text-[var(--color-text)] px-3 py-1">
                  {metrics.patentCount} patents
                </Badge>
              </div>

              <h3 className="mt-5 font-[var(--font-serif)] text-3xl font-black leading-tight text-[var(--color-heading)] transition-colors duration-300 group-hover:text-[var(--color-accent)] md:text-4xl">
                {faculty.name}
              </h3>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
                {topDegree}
              </p>

              <p className="mt-4 border-l-4 border-[var(--color-accent)] pl-4 text-base leading-relaxed text-[var(--color-text-soft)]">
                {faculty.research}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 p-4 text-sm font-bold text-[var(--color-text)] transition-all group-hover:bg-white">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white shadow-lg">
                    <Mail size={18} />
                  </div>
                  <span className="truncate">{faculty.email}</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 p-4 text-sm font-bold text-[var(--color-text)] transition-all group-hover:bg-white">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white shadow-lg">
                    <Phone size={18} />
                  </div>
                  <span>{faculty.phone}</span>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                  <div className="flex items-center gap-2 text-[var(--color-text-soft)]">
                    <GraduationCap size={15} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Education
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-black text-[var(--color-heading)]">
                    {metrics.educationCount}
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                  <div className="flex items-center gap-2 text-[var(--color-text-soft)]">
                    <Briefcase size={15} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Experience
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-black text-[var(--color-heading)]">
                    {metrics.experienceCount}
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4">
                  <div className="flex items-center gap-2 text-[var(--color-text-soft)]">
                    <ScrollText size={15} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Achievements
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-black text-[var(--color-heading)]">
                    {metrics.achievementCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-7">
              <Link
                to={`/faculty/${faculty.id}`}
                className="inline-flex items-center gap-3 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-strong)]"
              >
                View Full Profile
                <ArrowRight size={16} />
              </Link>
              <div className="flex items-center gap-3">
                {docPath ? (
                  <a
                    href={docPath}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--color-heading)] transition-colors hover:border-[var(--color-border-strong)]"
                  >
                    <FileText size={14} />
                    Profile Document
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
