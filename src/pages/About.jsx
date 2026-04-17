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
  "Embedded Control Systems",
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
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[36px] border border-[var(--color-border)] bg-[linear-gradient(135deg,#f9fbfe_0%,#ffffff_44%,#eef4fa_100%)] shadow-[0_24px_48px_rgba(13,40,69,0.09)]">
        <div className="absolute inset-y-0 right-0 hidden w-[38%] bg-[radial-gradient(circle_at_top_right,rgba(27,75,122,0.16),transparent_58%)] lg:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(27,75,122,0),rgba(27,75,122,0.35),rgba(27,75,122,0))]" />

        <div className="relative grid min-h-[calc(100svh-12rem)] items-center gap-10 px-6 py-8 lg:grid-cols-[1.02fr,0.98fr] lg:px-8 lg:py-12">
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="type">COEP Technological University</Badge>
              <Badge variant="default">
                School of Engineering and Technology
              </Badge>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
              Future-ready instrumentation education
            </p>

            <h1 className="mt-4 max-w-4xl font-[var(--font-serif)] text-5xl font-semibold leading-[0.98] tracking-tight text-[var(--color-heading)] md:text-6xl xl:text-7xl">
              Department of Instrumentation and Control Engineering
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-text-soft)] md:text-lg">
              Building engineers for automation, control, sensing, and
              intelligent systems through academically rigorous teaching,
              research-led learning, and long-standing industry engagement.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/faculty"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-strong)]"
              >
                Meet the Faculty
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/publications"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-surface-soft)]"
              >
                Explore Publications
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-[24px] border border-[var(--color-border)] bg-white/95 px-4 py-4 shadow-sm"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[var(--color-heading)]">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-[30px] border border-[var(--color-border)] bg-white shadow-[0_22px_42px_rgba(13,40,69,0.12)]">
              <Carousel images={carouselImages} autoPlay interval={4600} />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {highlightCards.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className="border-[var(--color-border)] bg-white/96 shadow-sm"
                  >
                    <CardContent className="p-4">
                      <div className="inline-flex rounded-2xl bg-[var(--color-primary-soft)] p-2.5 text-[var(--color-primary)]">
                        <Icon size={18} />
                      </div>
                      <h2 className="mt-3 text-base font-semibold text-[var(--color-heading)]">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
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

      <section className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
        <Card className="overflow-hidden border-[var(--color-border)] bg-white">
          <CardContent className="p-0">
            <div className="border-b border-[var(--color-border)] px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                About the Department
              </p>
              <h2 className="mt-2 font-[var(--font-serif)] text-3xl font-semibold text-[var(--color-heading)]">
                Academic foundation with industry relevance
              </h2>
            </div>

            <div className="space-y-5 px-6 py-6">
              {summary.map((paragraph, index) => (
                <p key={index} className="text-base leading-8 text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
          <CardContent className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
              Research Focus
            </p>
            <h2 className="mt-2 font-[var(--font-serif)] text-3xl font-semibold text-[var(--color-heading)]">
              Areas shaping the department
            </h2>

            <div className="mt-5 grid gap-3">
              {researchAreas.map((area) => (
                <div
                  key={area}
                  className="flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                      <BadgeCheck size={16} />
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      {area}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {valuePoints.map((point) => {
          const Icon = point.icon;
          return (
            <Card
              key={point.title}
              className="border-[var(--color-border)] bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="inline-flex rounded-2xl bg-[var(--color-primary-soft)] p-3 text-[var(--color-primary)]">
                  <Icon size={20} />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-[var(--color-heading)]">
                  {point.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {point.text}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="rounded-[28px] border border-[var(--color-border)] bg-[#f9fbfd] px-6 py-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
              Faculty Spotlight
            </p>
            <h2 className="mt-2 font-[var(--font-serif)] text-3xl font-semibold text-[var(--color-heading)]">
              Meet the people behind the department
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Experienced faculty members support teaching, mentoring, research,
              and industry collaboration across the department&apos;s major domains.
            </p>
          </div>

          <Link
            to="/faculty"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-primary-strong)]"
          >
            View all faculty
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredFaculty.map((faculty) => (
            <Card
              key={faculty.id}
              className="overflow-hidden border-[var(--color-border)] bg-white shadow-sm"
            >
              <img
                src={faculty.image}
                alt={faculty.name}
                className="h-56 w-full object-cover"
                loading="lazy"
              />
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                  {faculty.designation}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-7 text-slate-900">
                  {faculty.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {faculty.research}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
