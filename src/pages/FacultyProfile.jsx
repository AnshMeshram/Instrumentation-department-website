import { Mail, Phone, GraduationCap, Award, BookOpen, Briefcase, ChevronRight } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import facultyData from "../data/faculty.json";
import ProfileTabs from "../components/ProfileTabs";
import PageHeader from "../components/PageHeader";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

export default function FacultyProfile() {
  const { id } = useParams();
  const faculty = facultyData.find((f) => f.id === id);

  if (!faculty) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-[var(--color-border)] bg-[var(--color-surface-soft)] p-12 text-center">
        <h2 className="text-2xl font-black text-[var(--color-heading)]">Profile Not Found</h2>
        <p className="mt-2 text-[var(--color-text-soft)]">The faculty member you are looking for does not exist in our directory.</p>
        <Link to="/faculty" className="mt-8 rounded-full bg-[var(--color-primary)] px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-[var(--color-primary-strong)]">
           Return to Directory
        </Link>
      </div>
    );
  }

  const defaultImg = "/faculty_images/image.png";
  const rawImg = faculty.image || "";
  const normalizedImg = rawImg
    .replace("/faculty-images/", "/faculty_images/")
    .replace("faculty-images/", "faculty_images/");
  const initialImg = normalizedImg
    ? normalizedImg.startsWith("/")
      ? normalizedImg
      : `/${normalizedImg}`
    : defaultImg;

  return (
    <div className="space-y-16 pb-16">
      <PageHeader
        title="Faculty Profile"
        subtitle="Comprehensive academic record and professional portfolio of our department faculty."
        badgeText="Personnel Portfolio"
      />

      <Card className="overflow-hidden border-none bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-[2.5rem]">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-[var(--color-surface-soft)] lg:w-[400px]">
              <img
                src={initialImg}
                alt={faculty.name}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  if (e?.target) e.target.src = defaultImg;
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                 <Badge className="bg-[var(--color-accent)] text-black font-black border-none px-4 py-1.5 mb-2">Faculty Member</Badge>
                 <p className="text-sm font-bold text-white/80 uppercase tracking-widest">COEP Technological University</p>
              </div>
            </div>

            <div className="flex-1 p-8 md:p-12 lg:p-16 relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <GraduationCap size={200} />
              </div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-[var(--color-accent)]" />
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--color-accent)]">
                    {faculty.designation}
                  </p>
                </div>

                <h1 className="font-[var(--font-serif)] text-4xl font-black leading-tight text-[var(--color-heading)] md:text-5xl lg:text-6xl">
                  {faculty.name}
                </h1>

                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  <div className="group flex items-center gap-5 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/30 p-6 transition-all hover:bg-white hover:shadow-xl">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white shadow-lg transition-transform group-hover:rotate-12">
                      <Mail size={24} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-soft)]">Institutional Email</p>
                      <p className="mt-1 text-sm font-bold text-[var(--color-heading)] truncate">{faculty.email}</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-center gap-5 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/30 p-6 transition-all hover:bg-white hover:shadow-xl">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white shadow-lg transition-transform group-hover:rotate-12">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-soft)]">Internal Extension</p>
                      <p className="mt-1 text-sm font-bold text-[var(--color-heading)]">{faculty.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-8 bg-[var(--color-surface-soft)]/50 rounded-[2rem] border-l-8 border-[var(--color-accent)] relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 text-[var(--color-accent)] mb-4">
                      <Award size={20} />
                      <h2 className="text-xs font-black uppercase tracking-[0.25em]">
                        Primary Research & Expertise
                      </h2>
                    </div>
                    <p className="text-xl font-medium leading-relaxed text-[var(--color-heading)]">
                      {faculty.research}
                    </p>
                  </div>
                  <div className="absolute -bottom-10 -right-10 text-[var(--color-accent)]/5 rotate-12">
                     <BookOpen size={120} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="rounded-[2.5rem] border border-[var(--color-border)] bg-white p-4 shadow-sm">
        <ProfileTabs faculty={faculty} />
      </section>
    </div>
  );
}
