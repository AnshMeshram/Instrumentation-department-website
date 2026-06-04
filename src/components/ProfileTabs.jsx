import { useMemo, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { getFacultyDocPath } from "../lib/facultyDirectory";
import { getSectionResources } from "../lib/facultySectionResources";

const sectionIcons = {
  education: GraduationCap,
  experience: Briefcase,
  publications: BookOpen,
  patents: FileText,
  achievements: Award,
};

function EmptyState({ label }) {
  return (
    <div className="rounded-2xl bg-[var(--color-surface-soft)] p-6 text-sm font-medium text-[var(--color-text-soft)]">
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
              className="rounded-2xl border border-[var(--color-border)] bg-white p-5"
            >
              <h3 className="font-semibold text-[var(--color-heading)]">{edu.degree}</h3>
              <p className="mt-1 text-sm text-[var(--color-text-soft)]">{edu.institute}</p>
              <span className="mt-2 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-text)]">
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
              className="relative overflow-hidden flex items-start gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)]/50 bg-[var(--color-surface-soft)]/60 p-6 transition-all hover:bg-[var(--color-surface-soft)]"
            >
              <div className="absolute right-0 bottom-0 opacity-[0.02] text-[var(--color-accent)] pointer-events-none translate-x-4 translate-y-4">
                <Briefcase size={80} strokeWidth={1} />
              </div>
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--color-accent)] shadow-sm border border-[var(--color-border)]/40">
                <Briefcase size={18} strokeWidth={2.5} />
              </div>
              <div className="relative z-10 min-w-0 flex-1 pt-1">
                <p className="text-[14px] font-semibold leading-relaxed text-[var(--color-heading)]">
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
              className="rounded-2xl border border-[var(--color-border)] bg-white p-4 text-[var(--color-text)]"
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
              className="rounded-2xl border border-[var(--color-border)] bg-white p-4 text-[var(--color-text)]"
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
            className="rounded-2xl border border-[var(--color-border)] bg-white p-4 text-[var(--color-text)]"
          >
            {ach}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="space-y-0">
      {/* Horizontal scrollable tab bar */}
      <div className="border-b border-[var(--color-border)]">
        <div className="flex overflow-x-auto scrollbar-none gap-0">
          {tabs.map((tab) => {
            const Icon = sectionIcons[tab.key];
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={[
                  "flex shrink-0 items-center gap-2 border-b-2 px-5 py-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors whitespace-nowrap",
                  isActive
                    ? "border-[var(--color-accent)] text-[var(--color-heading)]"
                    : "border-transparent text-[var(--color-text-soft)] hover:text-[var(--color-heading)]"
                ].join(" ")}
              >
                {Icon && <Icon size={13} />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="min-h-[20rem] p-6">
        <AnimatePresence mode="wait" initial={false}>
          <Motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {renderSectionContent(activeTab)}

            {/* Section resources */}
            {sectionResources.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-6">
                {sectionResources.map((resource) => (
                  <a
                    key={`${resource.href}-${resource.label}`}
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-heading)] transition hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <FileText size={12} />
                    {resource.label}
                    <span className="rounded-full bg-white px-2 py-0.5 text-[9px] text-[var(--color-text-soft)]">
                      {resource.type}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </Motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
