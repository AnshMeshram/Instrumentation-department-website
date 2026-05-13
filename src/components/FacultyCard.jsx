import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, ArrowUpRight, ArrowRight, UserPlus } from "lucide-react";

export default function FacultyCard({ faculty }) {
  const defaultImg = "/faculty_images/image.png";
  const rawImg = faculty.image || "";
  const normalizedImg = rawImg
    .replace("/faculty-images/", "/faculty_images/")
    .replace("faculty-images/", "faculty_images/");
  const imgSrc = normalizedImg
    ? normalizedImg.startsWith("/")
      ? normalizedImg
      : `/${normalizedImg}`
    : defaultImg;

  return (
    <Card className="group overflow-hidden border-none bg-white shadow-sm transition-all duration-700 hover:shadow-[0_80px_100px_-30px_rgba(0,0,0,0.15)] hover:-translate-y-4">
      <CardContent className="p-0">
        <Link
          to={`/faculty/${faculty.id}`}
          className="flex flex-col md:flex-row md:items-stretch"
        >
          <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-[var(--color-surface-soft)] md:w-64 lg:w-72">
            <img
              src={imgSrc}
              alt={faculty.name}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-105"
              onError={(e) => {
                if (e?.target) e.target.src = defaultImg;
              }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute top-6 right-6 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110">
              <ArrowUpRight size={22} />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-accent)] mb-2">Institutional Faculty</p>
                <h4 className="text-lg font-bold text-white uppercase tracking-tight">View Academic Record</h4>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-8 md:p-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-[var(--color-accent)]" />
                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[var(--color-accent)]">
                  {faculty.designation}
                </p>
              </div>
              
              <h3 className="font-[var(--font-serif)] text-3xl font-black leading-tight text-[var(--color-heading)] group-hover:text-[var(--color-accent)] transition-colors duration-300 md:text-4xl">
                {faculty.name}
              </h3>
              
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="flex items-center gap-4 text-sm font-bold text-[var(--color-text)] bg-[var(--color-surface-soft)]/50 p-4 rounded-2xl border border-[var(--color-border)] group-hover:bg-white group-hover:shadow-md transition-all">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white shadow-lg">
                    <Mail size={18} />
                  </div>
                  <span className="truncate">{faculty.email}</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-[var(--color-text)] bg-[var(--color-surface-soft)]/50 p-4 rounded-2xl border border-[var(--color-border)] group-hover:bg-white group-hover:shadow-md transition-all">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white shadow-lg">
                    <Phone size={18} />
                  </div>
                  <span>{faculty.phone}</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-black/[0.02] rounded-2xl border-l-4 border-[var(--color-accent)]">
                <p className="text-xs font-black uppercase tracking-widest text-[var(--color-accent)] mb-2">Research Focus</p>
                <p className="text-base font-medium leading-relaxed text-[var(--color-text-soft)]">
                  {faculty.research}
                </p>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-[var(--color-border)] pt-8">
              <div className="flex items-center gap-3">
                 <UserPlus size={16} className="text-[var(--color-accent)]" />
                 <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                    Mentorship Available
                 </span>
              </div>
              <div className="flex items-center gap-4 group/btn">
                <span className="text-sm font-black text-[var(--color-heading)]">Profile Full View</span>
                <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-[var(--color-surface-soft)] text-[var(--color-primary)] transition-all group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:shadow-xl group-hover:-rotate-12">
                    <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
