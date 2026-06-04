import {
  Mail,
  Phone,
  Award,
  Briefcase,
  ChevronRight,
  FileText,
  GraduationCap,
  Linkedin,
  BookOpen,
  Link as LinkIcon,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import facultyData from "../data/faculty.json";
import ProfileTabs from "../components/ProfileTabs";
import { Card } from "../components/ui/card";
import {
  getFacultyDocPath,
  getFacultyImage,
  getFacultyMetrics,
} from "../lib/facultyDirectory";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

export default function FacultyProfile() {
  const { id } = useParams();
  const faculty = facultyData.find((f) => f.id === id);

  useDocumentMetadata({
    title: faculty ? faculty.name : "Faculty Profile",
    description: faculty
      ? `${faculty.name} is a ${faculty.designation} in the Instrumentation and Control Engineering Department at COEP Tech. Specialization: ${faculty.areaOfInterest?.join(", ")}.`
      : "View faculty profile details.",
  });

  if (!faculty) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center rounded-4xl bg-[var(--color-surface-soft)] p-12 text-center shadow-[0_20px_50px_-30px_rgba(0,0,0,0.2)]">
        <h2 className="text-2xl font-black text-[var(--color-heading)]">Profile Not Found</h2>
        <p className="mt-2 text-[var(--color-text-soft)]">
          The faculty member you are looking for does not exist in our
          directory.
        </p>
        <Link
          to="/faculty"
          className="mt-8 rounded-full bg-[var(--color-primary)] px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-[var(--color-primary-strong)]"
        >
          Return to Directory
        </Link>
      </div>
    );
  }

  const initialImg = getFacultyImage(faculty.image);
  const docPath = getFacultyDocPath(faculty.id);
  const metrics = getFacultyMetrics(faculty);

  return (
    <div className="space-y-8 pb-16 pt-8 px-4 md:px-8">
      {/* Main unified profile card */}
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[var(--radius-container)] bg-white shadow-2xl border border-[var(--color-border)]/50 flex flex-col lg:flex-row">
        {/* Left Side - Image */}
        <div className="relative w-full lg:w-[400px] xl:w-[450px] shrink-0 overflow-hidden bg-[var(--color-surface-soft)] flex flex-col justify-end h-80 sm:h-96 lg:h-auto lg:min-h-[400px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,164,0.1),transparent_50%)]" />
          <img
            src={initialImg}
            alt={faculty.name}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              if (e?.target) e.target.src = "/faculty_images/image.png";
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
        </div>

        {/* Right Side - Info */}
        <div className="flex-1 p-8 md:p-12 lg:p-14 xl:p-16 flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-4 text-2xs font-bold uppercase tracking-[0.3em] text-[var(--color-accent)]">
            <span className="h-[2px] w-6 bg-[var(--color-accent)]"></span>
            FACULTY PROFILE
          </div>
          <h1 className="font-serif text-4xl font-bold leading-tight text-[var(--color-heading)] md:text-5xl">
            {faculty.name}
          </h1>
          <p className="mt-3 text-lg md:text-xl font-bold text-[var(--color-text-soft)]">
            {faculty.designation}
          </p>

          {faculty.research && (
            <div className="mt-4 flex flex-wrap gap-2">
              {faculty.research.split(",").map((spec, i) => (
                <span
                  key={i}
                  className="rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--color-primary)] shadow-sm"
                >
                  {spec.trim()}
                </span>
              ))}
            </div>
          )}

          <div className="my-8 h-px w-full bg-[var(--color-border)]/40" />

          {/* Contact Details */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-center gap-5 rounded-2xl bg-[var(--color-surface-soft)]/50 p-4 transition-colors hover:bg-[var(--color-surface-soft)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] bg-white text-[var(--color-accent)] shadow-sm">
                <Mail size={20} strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <p className="text-2xs font-bold text-[var(--color-text-soft)] uppercase tracking-widest">
                  Email
                </p>
                <p className="mt-1 break-all text-[13px] font-bold text-[var(--color-heading)]">
                  {faculty.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 rounded-2xl bg-[var(--color-surface-soft)]/50 p-4 transition-colors hover:bg-[var(--color-surface-soft)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] bg-white text-[var(--color-accent)] shadow-sm">
                <Phone size={20} strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <p className="text-2xs font-bold text-[var(--color-text-soft)] uppercase tracking-widest">
                  Phone
                </p>
                <p className="mt-1 text-[13px] font-bold text-[var(--color-heading)]">
                  {faculty.phone}
                </p>
              </div>
            </div>
          </div>

          {faculty.links && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {faculty.links.scholar && (
                <a
                  href={faculty.links.scholar}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)]/50 bg-white text-[var(--color-text-soft)] shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]"
                  title="Google Scholar"
                >
                  <GraduationCap size={20} strokeWidth={2} />
                </a>
              )}
              {faculty.links.linkedin && (
                <a
                  href={faculty.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)]/50 bg-white text-[var(--color-text-soft)] shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]"
                  title="LinkedIn"
                >
                  <Linkedin size={18} strokeWidth={2} />
                </a>
              )}
              {faculty.links.orcid && (
                <a
                  href={faculty.links.orcid}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)]/50 bg-white text-[var(--color-text-soft)] shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]"
                  title="ORCID iD"
                >
                  <BookOpen size={18} strokeWidth={2} />
                </a>
              )}
              {faculty.links.website && (
                <a
                  href={faculty.links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)]/50 bg-white text-[var(--color-text-soft)] shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary)]"
                  title="Personal Website"
                >
                  <LinkIcon size={18} strokeWidth={2} />
                </a>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-xl bg-[var(--color-surface-soft)] px-5 py-3 text-xs font-bold text-[var(--color-heading)]">
              <FileText className="text-[var(--color-accent)]" size={16} strokeWidth={2.5} />
              {metrics.publicationCount} Publications
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-[var(--color-surface-soft)] px-5 py-3 text-xs font-bold text-[var(--color-heading)]">
              <Award className="text-[var(--color-accent)]" size={16} strokeWidth={2.5} />
              {metrics.patentCount} Patents
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-[var(--color-surface-soft)] px-5 py-3 text-xs font-bold text-[var(--color-heading)]">
              <Briefcase className="text-[var(--color-accent)]" size={16} strokeWidth={2.5} />
              {metrics.experienceCount} Experience
            </div>
          </div>

          {faculty.research && (
            <>
              <div className="my-8 h-px w-full bg-[var(--color-border)]/40" />
              <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-surface-soft)]/60 p-6 md:p-8 border border-[var(--color-border)]/50">
                <div className="absolute right-0 bottom-0 opacity-[0.03] text-[var(--color-accent)] pointer-events-none translate-x-1/4 translate-y-1/4">
                  <Award size={160} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3 text-[var(--color-accent)]">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm border border-[var(--color-border)]/40">
                      <Award size={16} strokeWidth={2.5} />
                    </span>
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.15em]">
                      Primary Research & Expertise
                    </h2>
                  </div>
                  <p className="text-[15px] font-medium leading-relaxed text-[var(--color-heading)]/80">
                    {faculty.research}
                  </p>
                </div>
              </div>
            </>
          )}

          {docPath && (
            <div className="mt-10 flex">
              <a
                href={docPath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[var(--color-heading)] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-black hover:shadow-lg"
              >
                Download Profile Document
                <ChevronRight size={16} strokeWidth={3} />
              </a>
            </div>
          )}
        </div>
      </div>

      <section className="mx-auto w-full max-w-6xl pt-4">
        <div className="rounded-[var(--radius-container)] bg-white p-4 shadow-sm border border-[var(--color-border)]/50">
          <ProfileTabs faculty={faculty} />
        </div>
      </section>
    </div>
  );
}
