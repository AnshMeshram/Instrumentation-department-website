import { useMemo, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { getFacultyDocPath } from "../lib/facultyDirectory";
import { getSectionResources } from "../lib/facultySectionResources";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const sectionIcons = {
  education: GraduationCap,
  experience: Briefcase,
  publications: BookOpen,
  patents: FileText,
  achievements: Award,
};

function EmptyState({ label }) {
  return (
    <div className="rounded-2xl bg-surface-soft p-6 text-sm font-medium text-text-soft">
      No {label.toLowerCase()} records available yet.
    </div>
  );
}

export default function ProfileTabs({ faculty }) {
  const [activeTab, setActiveTab] = useState("education");
  const profileDocPath = getFacultyDocPath(faculty.id);

  const tabs = useMemo(
    () => [
      {
        key: "education",
        label: "Education",
        description: "Academic foundation and qualification timeline.",
      },
      {
        key: "experience",
        label: "Experience",
        description: "Teaching, research, and industry engagement history.",
      },
      {
        key: "publications",
        label: "Research Publications",
        description: "Peer-reviewed and conference publication records.",
      },
      {
        key: "patents",
        label: "Patents",
        description: "Filed and granted intellectual property contributions.",
      },
      {
        key: "achievements",
        label: "Achievements/Award Recognition",
        description: "Institutional recognitions, grants, and milestones.",
      },
    ],
    [],
  );

  const sectionResources = useMemo(() => {
    const records = getSectionResources(activeTab);
    if (!profileDocPath) {
      return records;
    }
    return [
      {
        label: "Faculty Profile (DOCX)",
        href: profileDocPath,
        type: "DOCX",
      },
      ...records,
    ];
  }, [activeTab, profileDocPath]);

  const activeTabMeta = tabs.find((tab) => tab.key === activeTab) || tabs[0];
  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const moveSection = (offset) => {
    const nextIndex = activeIndex + offset;
    if (nextIndex < 0 || nextIndex >= tabs.length) {
      return;
    }
    setActiveTab(tabs[nextIndex].key);
  };

  const renderSectionContent = (tabKey) => {
    if (tabKey === "education") {
      if (!faculty.education?.length) {
        return <EmptyState label="Education" />;
      }
      return (
        <div className="space-y-4">
          {faculty.education.map((edu, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-white p-5"
            >
              <h3 className="font-semibold text-heading">{edu.degree}</h3>
              <p className="mt-1 text-sm text-text-soft">{edu.institute}</p>
              <span className="mt-2 inline-flex rounded-full border border-border bg-surface-soft px-3 py-1 text-xs font-semibold text-text">
                {edu.year}
              </span>
            </div>
          ))}
        </div>
      );
    }

    if (tabKey === "experience") {
      if (!faculty.experience?.length) {
        return <EmptyState label="Experience" />;
      }
      return (
        <ul className="grid gap-4 sm:grid-cols-2">
          {faculty.experience.map((exp, i) => (
            <li
              key={i}
              className="relative overflow-hidden flex items-start gap-4 rounded-[1.5rem] border border-border/50 bg-surface-soft/60 p-6 transition-all hover:bg-surface-soft"
            >
              <div className="absolute right-0 bottom-0 opacity-[0.02] text-accent pointer-events-none translate-x-4 translate-y-4">
                <Briefcase size={80} strokeWidth={1} />
              </div>
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-accent shadow-sm border border-border/40">
                <Briefcase size={18} strokeWidth={2.5} />
              </div>
              <div className="relative z-10 min-w-0 flex-1 pt-1">
                <p className="text-[14px] font-semibold leading-relaxed text-heading">
                  {exp}
                </p>
              </div>
            </li>
          ))}
        </ul>
      );
    }

    if (tabKey === "publications") {
      if (!faculty.publications?.length) {
        return <EmptyState label="Publications" />;
      }
      return (
        <ul className="space-y-3">
          {faculty.publications.map((pub, i) => (
            <li
              key={i}
              className="rounded-2xl border border-border bg-white p-4 text-text"
            >
              {pub}
            </li>
          ))}
        </ul>
      );
    }

    if (tabKey === "patents") {
      if (!faculty.patents?.length) {
        return <EmptyState label="Patents" />;
      }
      return (
        <ul className="space-y-3">
          {faculty.patents.map((pat, i) => (
            <li
              key={i}
              className="rounded-2xl border border-border bg-white p-4 text-text"
            >
              {pat}
            </li>
          ))}
        </ul>
      );
    }

    if (!faculty.achievements?.length) {
      return <EmptyState label="Achievements" />;
    }

    return (
      <ul className="space-y-3">
        {faculty.achievements.map((ach, i) => (
          <li
            key={i}
            className="rounded-2xl border border-border bg-white p-4 text-text"
          >
            {ach}
          </li>
        ))}
      </ul>
    );
  };

  const ActiveIcon = sectionIcons[activeTabMeta.key];

  return (
    <section className="mt-10 space-y-5">
      <div className="rounded-2xl bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_100%)] p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-accent">
              Section Order
            </p>
            <div className="mt-2 flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-accent shadow-sm">
                {ActiveIcon ? <ActiveIcon size={16} /> : <Sparkles size={16} />}
              </div>
              <div>
                <p className="text-base font-black text-heading">
                  {activeTabMeta.label}
                </p>
                <p className="text-sm text-text-soft">
                  {activeTabMeta.description}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-80">
            <Select value={activeTab} onValueChange={handleTabChange}>
              <SelectTrigger className="h-12 rounded-xl border-none bg-white shadow-[0_14px_34px_-20px_rgba(0,0,0,0.35)] focus:ring-2 focus:ring-accent/20">
                <SelectValue placeholder="Select profile section" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-none shadow-[0_24px_56px_-24px_rgba(0,0,0,0.35)]">
                {tabs.map((tab, index) => (
                  <SelectItem
                    key={tab.key}
                    value={tab.key}
                    className="rounded-lg data-highlighted:bg-surface-soft data-highlighted:text-heading"
                  >
                    {String(index + 1).padStart(2, "0")} - {tab.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
          <div className="inline-flex rounded-full bg-surface-soft px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-text-soft">
            Section {activeIndex + 1} of {tabs.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => moveSection(-1)}
              disabled={activeIndex <= 0}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-heading shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={14} />
              Previous
            </button>
            <button
              type="button"
              onClick={() => moveSection(1)}
              disabled={activeIndex >= tabs.length - 1}
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-heading shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {sectionResources.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {sectionResources.map((resource) => (
              <a
                key={`${resource.href}-${resource.label}`}
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-heading shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5"
              >
                <FileText size={12} />
                {resource.label}
                <span className="rounded-full bg-surface-soft px-2 py-0.5 text-[9px] text-text-soft">
                  {resource.type}
                </span>
              </a>
            ))}
          </div>
        ) : null}
      </div>

      <div className="min-h-112 rounded-2xl bg-white p-5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)]">
        <AnimatePresence mode="wait" initial={false}>
          <Motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            {renderSectionContent(activeTab)}
          </Motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
