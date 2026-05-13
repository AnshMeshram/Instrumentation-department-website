import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Microscope,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import aboutData from "../data/about.json";
import facultyData from "../data/faculty.json";

const highlightCards = [
  {
    title: "Accredited learning pathways",
    text: "Undergraduate and postgraduate programmes supported by an academically rigorous, industry-aware curriculum.",
    icon: GraduationCap,
  },
  {
    title: "Applied research culture",
    text: "Strong focus on industrial automation, process systems, instrumentation systems, and biomedical instrumentation.",
    icon: Microscope,
  },
  {
    title: "Industry engagement",
    text: "Long-standing collaboration with research labs, government organizations, and leading industrial partners.",
    icon: BriefcaseBusiness,
  },
];

const researchAreas = [
  "Industrial Automation",
  "Process Systems Engineering",
  "Instrumentation Systems Engineering",
  "Biomedical Instrumentation",
  "Control System",
  "Embedded System",
  "Data-driven Monitoring",
];

const quickFacts = [
  { label: "Established", value: "1965" },
  { label: "Faculty Members", value: String(facultyData.length) },
  { label: "Core Research Areas", value: "06" },
  { label: "Academic Focus", value: "UG + PG" },
];

const valuePoints = [
  {
    title: "Academic depth with practice",
    text: "Students learn core engineering fundamentals while engaging with real-world control, instrumentation, and automation problems.",
    icon: BookOpen,
  },
  {
    title: "Calm, research-led culture",
    text: "The department combines steady academic mentoring with project-driven learning and publication-oriented research activity.",
    icon: ShieldCheck,
  },
  {
    title: "Institutional and industry credibility",
    text: "Collaborations with organizations such as BARC, Emerson, Honeywell, Rockwell Automation, TCS, and the Armed Forces ecosystem shape the department's outlook.",
    icon: Building2,
  },
];

export default function About() {
  const { title, summary, images } = aboutData;

  const carouselImages = images.map((src, index) => ({
    src,
    alt: `${title} campus view ${index + 1}`,
  }));

  const featuredFaculty = facultyData.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white shadow-[0_20px_60px_-15px_rgba(0,33,71,0.1)]">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(to_left,var(--color-primary-soft)_0%,transparent_100%)] lg:block" />

        <div className="relative grid min-h-[calc(100svh-10rem)] items-center gap-12 px-6 py-12 lg:grid-cols-[1.1fr,0.9fr] lg:px-12 lg:py-16">
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="type" className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-strong)] px-3 py-1 text-xs">
                COEP Technological University
              </Badge>
              <Badge variant="default" className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border-[var(--color-border)] px-3 py-1 text-xs">
                School of Engineering and Technology
              </Badge>
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Future-ready instrumentation education
            </p>

            <h1 className="mt-4 max-w-4xl font-[var(--font-serif)] text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-6xl xl:text-[4.5rem]">
              Department of Instrumentation and Control Engineering
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-soft)]">
              Building engineers for automation, control, sensing, and
              intelligent systems through academically rigorous teaching,
              research-led learning, and long-standing industry engagement.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/faculty"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--color-primary-strong)] hover:shadow-lg hover:-translate-y-0.5"
              >
                Meet the Faculty
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/publications"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] bg-white px-7 py-3.5 text-sm font-semibold text-[var(--color-text)] transition-all hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)]"
              >
                Explore Publications
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 border-t border-[var(--color-border)] pt-8">
              {quickFacts.map((fact) => (
                <div key={fact.label}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-soft)]">
                    {fact.label}
                  </p>
                  <p className="mt-1 text-3xl font-[var(--font-serif)] font-bold text-[var(--color-primary)]">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative space-y-6">
            {/* Background utilization - carbon-teal gradient blob */}
            <div className="absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_70%)] opacity-20 blur-3xl" />
            
            <div className="group relative overflow-hidden rounded-2xl border-8 border-white bg-white shadow-2xl transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] aspect-[16/10]">
              <div className="absolute inset-0 z-10 border border-[var(--color-border)] rounded-[inherit] pointer-events-none" />
              <Carousel images={carouselImages} autoPlay interval={4600} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlightCards.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className="border-none bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all duration-300"
                  >
                    <CardContent className="p-5">
                      <div className="inline-flex rounded-xl bg-[var(--color-primary-soft)] p-3 text-[var(--color-primary)] mb-4">
                        <Icon size={20} />
                      </div>
                      <h2 className="text-xs font-black uppercase tracking-widest text-[var(--color-heading)]">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-soft)] font-medium">
                        {item.text}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <Card className="overflow-hidden border-none bg-[var(--color-surface-soft)] shadow-sm">
          <CardContent className="p-0">
            <div className="border-b border-[var(--color-border)] px-10 py-12 bg-[var(--color-primary-soft)]/40">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
                Our Foundation
              </p>
              <h2 className="mt-4 font-[var(--font-serif)] text-4xl md:text-5xl font-black text-[var(--color-heading)] leading-[1.1] tracking-tight">
                Academic rigor <br /> meets real-world <br /> relevance.
              </h2>
            </div>

            <div className="space-y-8 px-10 py-12">
              {summary.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed text-[var(--color-text)] font-medium">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-black text-white shadow-2xl overflow-hidden group">
          <CardContent className="p-10 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
            
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Academic Excellence
            </p>
            <h2 className="mt-4 font-[var(--font-serif)] text-4xl font-black !text-white leading-tight">
              Areas of <br />Impact
            </h2>

            <div className="mt-12 grid gap-4">
              {[
                { name: "Industrial Automation", color: "hover:bg-[var(--color-accent)]/20 border-white/10" },
                { name: "Process Systems Engineering", color: "hover:bg-[var(--color-highlight)]/20 border-white/10" },
                { name: "Instrumentation Systems", color: "hover:bg-[var(--color-accent)]/20 border-white/10" },
                { name: "Biomedical Engineering", color: "hover:bg-[var(--color-highlight)]/20 border-white/10" },
                { name: "Control & Embedded Systems", color: "hover:bg-[var(--color-accent)]/20 border-white/10" },
                { name: "Data-driven Monitoring", color: "hover:bg-[var(--color-highlight)]/20 border-white/10" },
              ].map((area, idx) => (
                <div
                  key={idx}
                  className={`group/item flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-6 py-5 transition-all duration-300 hover:-translate-x-1 ${area.color} cursor-default`}
                >
                  <div className="flex items-center gap-5">
                    <span className="text-[10px] font-black text-white/60 group-hover/item:text-[var(--color-accent)] transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="text-sm font-bold tracking-tight text-white group-hover/item:text-white transition-colors">
                      {area.name}
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-white/0 -translate-x-2 transition-all duration-300 group-hover/item:text-[var(--color-accent)] group-hover/item:translate-x-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        {valuePoints.map((point) => {
          const Icon = point.icon;
          return (
            <Card
              key={point.title}
              className="border-none bg-white shadow-sm transition-all duration-300 hover:shadow-md group p-2"
            >
              <CardContent className="p-8">
                <div className="inline-flex rounded-full bg-[var(--color-primary-soft)] p-5 text-[var(--color-primary)] mb-8 transition-transform duration-500 group-hover:rotate-[360deg]">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-black font-[var(--font-serif)] text-[var(--color-heading)] tracking-tight">
                  {point.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-text-soft)] font-medium">
                  {point.text}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-8 py-16 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between border-b border-[var(--color-border)] pb-12 relative">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Institutional Leadership
            </p>
            <h2 className="mt-4 font-[var(--font-serif)] text-4xl md:text-5xl font-black text-[var(--color-heading)] leading-tight">
              Meet the faculty <br /> driving innovation.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
              Our distinguished faculty members bring decades of research expertise and 
              industrial experience to the department.
            </p>
          </div>

          <Link
            to="/faculty"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-primary)] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[var(--color-primary-strong)] hover:shadow-xl hover:-translate-y-1 shrink-0"
          >
            Explore all profiles
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {featuredFaculty.map((faculty) => (
            <Card
              key={faculty.id}
              className="group relative overflow-hidden border-none bg-white transition-all duration-700 hover:shadow-[0_80px_100px_-30px_rgba(0,0,0,0.18)] hover:-translate-y-4"
            >
              <div className="relative overflow-hidden p-4">
                <div className="relative overflow-hidden aspect-[3/4] rounded-2xl bg-[var(--color-surface-soft)] shadow-inner">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1"
                    loading="lazy"
                  />
                  
                  {/* Premium Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 h-12 w-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-12">
                     <ArrowRight size={20} className="text-white -rotate-45" />
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-accent)] mb-2">
                      Academic Leadership
                    </p>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {faculty.designation}
                    </h3>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 pt-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8 bg-[var(--color-accent)]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-accent)]">Faculty Profile</span>
                </div>
                
                <h3 className="text-2xl font-black font-[var(--font-serif)] tracking-tight text-[var(--color-heading)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  {faculty.name}
                </h3>
                
                <div className="mt-5 space-y-4">
                  <p className="text-xs font-medium leading-relaxed text-[var(--color-text-soft)] line-clamp-2 border-l-2 border-[var(--color-accent)] pl-4">
                    {faculty.research}
                  </p>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <div className="h-8 w-px bg-[var(--color-border)]" />
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-soft)] opacity-50">Department</p>
                       <p className="text-[10px] font-bold text-[var(--color-heading)]">Instrumentation & Control</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 h-16 w-16 bg-[var(--color-accent)]/5 rounded-tl-[3rem] transition-all duration-500 group-hover:bg-[var(--color-accent)]/10" />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
