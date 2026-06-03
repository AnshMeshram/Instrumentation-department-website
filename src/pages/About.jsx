import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Microscope,
  Briefcase,
  Award,
  ArrowUpRight,
  ShieldCheck,
  BookOpen,
  Building2,
  Activity,
  ChevronRight,
  ScrollText,
  Trophy,
  FolderOpenDot
} from "lucide-react";
import Carousel from "../components/Carousel";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import aboutData from "../data/about.json";
import facultyData from "../data/faculty.json";
import { useScrollReveal } from "../hooks/useScrollReveal";

const highlightCards = [
  {
    title: "Accredited Pathways",
    text: "Undergraduate and postgraduate programmes supported by an academically rigorous, NBA accredited, industry-aware curriculum.",
    icon: GraduationCap,
  },
  {
    title: "Applied Research Hub",
    text: "Strong focus on industrial automation, process systems, and biomedical sponsored R&D projects.",
    icon: Microscope,
  },
  {
    title: "Industry Engagement",
    text: "Nearly 100% placements and training collaborations with partners like AFMC, Emerson, Honeywell, and TCS.",
    icon: Briefcase,
  },
];

const quickFacts = [
  { label: "Established", value: "1965" },
  { label: "Faculty Members", value: "12" },
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
  useDocumentMetadata({
    title: "About Us",
    description: "Welcome to the Department of Instrumentation and Control Engineering at COEP Technological University. Established in 1965, we focus on control, instrumentation, automation, and biomedical systems.",
  });

  const { title, summary, images } = aboutData;

  const carouselImages = images.map((src, index) => ({
    src,
    alt: `${title} campus view ${index + 1}`,
  }));

  const featuredFaculty = facultyData.slice(0, 4);

  const { ref: reveal1Ref, isInView: reveal1InView } = useScrollReveal();
  const { ref: reveal2Ref, isInView: reveal2InView } = useScrollReveal();
  const { ref: reveal3Ref, isInView: reveal3InView } = useScrollReveal();
  const { ref: reveal4Ref, isInView: reveal4InView } = useScrollReveal();

  return (
    <div className="page-stack-tight pb-12">
      {/* Hero Card */}
      <section className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[0_20px_60px_-15px_rgba(0,33,71,0.1)] w-full">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[linear-gradient(to_left,var(--color-primary-soft)_0%,transparent_100%)] lg:block" />

        <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-12 lg:p-12 relative items-center w-full">
          {/* Staggered Hero text */}
          <Motion.div
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            <Motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap items-center gap-3"
            >
              <Badge
                variant="type"
                className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-strong)] px-3 py-1 text-xs"
              >
                COEP Technological University
              </Badge>
              <Badge
                variant="default"
                className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border-[var(--color-border)] px-3 py-1 text-xs"
              >
                School of Engineering and Technology
              </Badge>
            </Motion.div>

            <Motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]"
            >
              Future-ready instrumentation education
            </Motion.p>

            <Motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="font-[var(--font-serif)] text-4xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-5xl xl:text-6xl"
            >
              Department of Instrumentation & Control Engineering
            </Motion.h1>

            <Motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-base leading-relaxed text-[var(--color-text-soft)]"
            >
              Building engineers for automation, control, sensing, and intelligent
              systems through academically rigorous teaching, research-led
              learning, and long-standing industry engagement.
            </Motion.p>

            <Motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                to="/faculty"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-teal-600 hover:shadow-lg hover:-translate-y-0.5"
              >
                Meet the Faculty
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/publications"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition-all hover:bg-[var(--color-surface-soft)] hover:text-[var(--color-primary)]"
              >
                Explore Publications
              </Link>
            </Motion.div>

            <Motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="grid gap-4 grid-cols-2 md:grid-cols-4 border-t border-[var(--color-border)] pt-6 w-full"
            >
              {quickFacts.map((fact) => (
                <div key={fact.label}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-soft)]">
                    {fact.label}
                  </p>
                  <p className="mt-1 text-2xl font-[var(--font-serif)] font-bold text-[var(--color-accent)]">
                    {fact.value}
                  </p>
                </div>
              ))}
            </Motion.div>
          </Motion.div>

          <div className="lg:col-span-5 w-full h-[300px] sm:h-[380px] lg:h-[460px]">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-md">
              <Carousel
                images={carouselImages}
                autoPlay
                interval={5200}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* highlightCards Section */}
      <section
        ref={reveal1Ref}
        style={{
          opacity: reveal1InView ? 1 : 0,
          transform: reveal1InView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.5s ease, transform 0.5s ease"
        }}
        className="grid gap-4 md:grid-cols-3"
      >
        {highlightCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)] hover:-translate-y-1 hover:shadow-md transition duration-300"
            >
              <CardContent className="p-6">
                <div className="inline-flex rounded-xl bg-[var(--color-primary-soft)] p-3 text-[var(--color-accent)]">
                  <Icon size={20} />
                </div>
                <h2 className="mt-4 text-sm font-black uppercase tracking-widest text-[var(--color-heading)]">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-soft)] font-medium">
                  {item.text}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Foundation & Impact Section */}
      <section
        ref={reveal2Ref}
        style={{
          opacity: reveal2InView ? 1 : 0,
          transform: reveal2InView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.5s ease, transform 0.5s ease"
        }}
        className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]"
      >
        <Card className="overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-soft)] shadow-sm hover:shadow-md transition">
          <CardContent className="p-0">
            <div className="border-b border-[var(--color-border)] px-6 py-8 md:px-8 md:py-10 bg-[var(--color-primary-soft)]/40">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">
                Our Foundation
              </p>
              <h2 className="mt-4 font-[var(--font-serif)] text-4xl md:text-5xl font-black text-[var(--color-heading)] leading-[1.1] tracking-tight">
                Academic rigor <br /> meets real-world <br /> relevance.
              </h2>
            </div>

            <div className="space-y-6 px-6 py-8 md:px-8 md:py-10">
              {summary.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg leading-relaxed text-[var(--color-text)] font-medium"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-black text-white shadow-2xl overflow-hidden group">
          <CardContent className="p-8 md:p-9 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />

            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Academic Excellence
            </p>
            <h2 className="mt-4 font-[var(--font-serif)] text-4xl font-black text-white leading-tight">
              Areas of <br />
              Impact
            </h2>

            <div className="mt-10 grid gap-4">
              {[
                {
                  name: "Industrial Automation",
                  color: "hover:bg-[var(--color-accent)]/20 border-white/10",
                },
                {
                  name: "Process Systems Engineering",
                  color: "hover:bg-[var(--color-highlight)]/20 border-white/10",
                },
                {
                  name: "Instrumentation Systems",
                  color: "hover:bg-[var(--color-accent)]/20 border-white/10",
                },
                {
                  name: "Biomedical Engineering",
                  color: "hover:bg-[var(--color-highlight)]/20 border-white/10",
                },
                {
                  name: "Control & Embedded Systems",
                  color: "hover:bg-[var(--color-accent)]/20 border-white/10",
                },
                {
                  name: "Data-driven Monitoring",
                  color: "hover:bg-[var(--color-highlight)]/20 border-white/10",
                },
              ].map((area, idx) => (
                <div
                  key={idx}
                  className={`group/item flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-6 py-5 transition-all duration-300 hover:-translate-x-1 ${area.color} cursor-default`}
                >
                  <div className="flex items-center gap-5">
                    <span className="text-[10px] font-bold text-white/60 group-hover/item:text-[var(--color-accent)] transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="text-sm font-bold tracking-tight text-white group-hover/item:text-white transition-colors">
                      {area.name}
                    </span>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-white/0 -translate-x-2 transition-all duration-300 group-hover/item:text-[var(--color-accent)] group-hover/item:translate-x-0"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ValuePoints Section */}
      <section
        ref={reveal3Ref}
        style={{
          opacity: reveal3InView ? 1 : 0,
          transform: reveal3InView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.5s ease, transform 0.5s ease"
        }}
        className="grid gap-6 lg:grid-cols-3"
      >
        {valuePoints.map((point) => {
          const Icon = point.icon;
          return (
            <Card
              key={point.title}
              className="border border-[var(--color-border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md group p-1"
            >
              <CardContent className="p-6 md:p-7">
                <div className="inline-flex rounded-full bg-[var(--color-primary-soft)] p-4 text-[var(--color-accent)] mb-6 transition-transform duration-500 group-hover:rotate-[360deg]">
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

      {/* Faculty Section */}
      <section
        ref={reveal4Ref}
        style={{
          opacity: reveal4InView ? 1 : 0,
          transform: reveal4InView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.5s ease, transform 0.5s ease"
        }}
        className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-6 py-12 md:px-8 shadow-sm overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full -mr-32 -mt-32 blur-3xl" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between border-b border-[var(--color-border)] pb-10 relative">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              Institutional Leadership
            </p>
            <h2 className="mt-4 font-[var(--font-serif)] text-4xl md:text-5xl font-black text-[var(--color-heading)] leading-tight">
              Meet the faculty <br /> driving innovation.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
              Our distinguished faculty members bring decades of research
              expertise and industrial experience to the department.
            </p>
          </div>

          <Link
            to="/faculty"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-[var(--color-accent)] hover:shadow-xl hover:-translate-y-1 shrink-0"
          >
            Explore all profiles
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featuredFaculty.map((faculty) => (
            <Card
              key={faculty.id}
              className="group relative overflow-hidden border border-[var(--color-border)] bg-white transition-all duration-700 hover:shadow-[0_80px_100px_-30px_rgba(0,0,0,0.18)] hover:-translate-y-4 rounded-2xl"
            >
              <div className="relative overflow-hidden p-4">
                <div className="relative overflow-hidden aspect-[3/4] rounded-2xl bg-[var(--color-surface-soft)] shadow-inner">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1"
                    onError={(e) => {
                      if (e?.target) e.target.src = "/faculty_images/image.png";
                    }}
                    loading="lazy"
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 h-12 w-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-12">
                    <ArrowRight size={20} className="text-white -rotate-45" />
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--color-accent)] mb-2">
                      Faculty Member
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
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">
                    Faculty Profile
                  </span>
                </div>

                <h3 className="text-2xl font-black font-[var(--font-serif)] tracking-tight text-[var(--color-heading)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  <Link to={`/faculty/${faculty.id}`}>
                    {faculty.name}
                  </Link>
                </h3>

                <div className="mt-5 space-y-4">
                  <p className="text-xs font-medium leading-relaxed text-[var(--color-text-soft)] line-clamp-2 border-l-2 border-[var(--color-accent)] pl-4">
                    {faculty.research}
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="h-8 w-px bg-[var(--color-border)]" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-text-soft)] opacity-50">
                        Department
                      </p>
                      <p className="text-[10px] font-bold text-[var(--color-heading)]">
                        Instrumentation & Control
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
