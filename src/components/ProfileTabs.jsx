import { useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  Award, BookOpen, Briefcase, FileText, GraduationCap,
} from "lucide-react";

const TABS = [
  { key: "education",    label: "Education",     Icon: GraduationCap },
  { key: "experience",   label: "Experience",    Icon: Briefcase },
  { key: "publications", label: "Publications",  Icon: BookOpen },
  { key: "patents",      label: "Patents",       Icon: FileText },
  { key: "achievements", label: "Achievements",  Icon: Award },
];

function Empty({ label }) {
  return (
    <p className="py-8 text-sm text-[var(--color-text-soft)]">
      No {label.toLowerCase()} on record.
    </p>
  );
}

export default function ProfileTabs({ faculty }) {
  const [active, setActive] = useState("education");

  function renderContent(key) {
    if (key === "education") {
      if (!faculty.education?.length) return <Empty label="Education" />;
      return (
        <div className="space-y-3">
          {faculty.education.map((e, i) => (
            <div key={i} className="flex gap-4 rounded-xl border
              border-[var(--color-border)] bg-white p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl bg-[var(--color-surface-soft)] text-[var(--color-accent)]">
                <GraduationCap size={18} />
              </div>
              <div>
                <p className="font-bold text-[var(--color-heading)]">{e.degree}</p>
                <p className="mt-0.5 text-sm text-[var(--color-text-soft)]">
                  {e.institute}
                </p>
                <span className="mt-2 inline-flex rounded-full border
                  border-[var(--color-border)] bg-[var(--color-surface-soft)]
                  px-3 py-0.5 text-xs font-semibold text-[var(--color-text)]">
                  {e.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (key === "experience") {
      if (!faculty.experience?.length) return <Empty label="Experience" />;
      return (
        <div className="space-y-3">
          {faculty.experience.map((exp, i) => (
            <div key={i} className="flex gap-4 rounded-xl border
              border-[var(--color-border)] bg-white p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl bg-[var(--color-surface-soft)] text-[var(--color-accent)]">
                <Briefcase size={18} />
              </div>
              <p className="text-sm font-medium leading-relaxed
                text-[var(--color-heading)] pt-1">{exp}</p>
            </div>
          ))}
        </div>
      );
    }

    if (key === "publications") {
      if (!faculty.publications?.length) return <Empty label="Publications" />;
      return (
        <div className="space-y-3">
          {faculty.publications.map((pub, i) => (
            <div key={i} className="flex gap-4 rounded-xl border
              border-[var(--color-border)] bg-white p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl bg-[var(--color-surface-soft)] text-[var(--color-accent)]">
                <BookOpen size={18} />
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-text)] pt-1">
                {pub}
              </p>
            </div>
          ))}
        </div>
      );
    }

    if (key === "patents") {
      if (!faculty.patents?.length) return <Empty label="Patents" />;
      return (
        <div className="space-y-3">
          {faculty.patents.map((pat, i) => (
            <div key={i} className="flex gap-4 rounded-xl border
              border-[var(--color-border)] bg-white p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center
                rounded-xl bg-[var(--color-surface-soft)] text-[var(--color-accent)]">
                <FileText size={18} />
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-text)] pt-1">
                {pat}
              </p>
            </div>
          ))}
        </div>
      );
    }

    if (!faculty.achievements?.length) return <Empty label="Achievements" />;
    return (
      <div className="space-y-3">
        {faculty.achievements.map((ach, i) => (
          <div key={i} className="flex gap-4 rounded-xl border
            border-[var(--color-border)] bg-white p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl bg-[var(--color-surface-soft)] text-[var(--color-accent)]">
              <Award size={18} />
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-text)] pt-1">
              {ach}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-container)] border
      border-[var(--color-border)] bg-white overflow-hidden">

      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-[var(--color-border)]
        scrollbar-none">
        {TABS.map((tab) => {
          const isActive = active === tab.key;
          const Icon = tab.Icon;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={[
                "flex shrink-0 items-center gap-2 border-b-2 px-5 py-4",
                "text-[12px] font-bold uppercase tracking-[0.1em]",
                "transition-colors whitespace-nowrap",
                isActive
                  ? "border-[var(--color-accent)] text-[var(--color-heading)]"
                  : "border-transparent text-[var(--color-text-soft)]",
                "hover:text-[var(--color-heading)]",
              ].join(" ")}
            >
              <Icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <Motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {renderContent(active)}
          </Motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
