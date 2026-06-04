import { useState, useRef } from "react";
import FacultyCard from "../components/FacultyCard";
import facultyData from "../data/faculty.json";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { GraduationCap, ScrollText, Trophy, FolderOpenDot } from "lucide-react";
import { motion as Motion, useReducedMotion, useInView } from "framer-motion";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

const designationOrder = {
  Professor: 1,
  "Associate Professor": 2,
  "Assistant Professor": 3,
};

export default function Faculty() {
  useDocumentMetadata({
    title: "Faculty Directory",
    description: "Browse the directory of faculty members at the Department of Instrumentation and Control Engineering, COEP Technological University.",
  });

  const reduceMotion = useReducedMotion();
  const sortedFaculty = [...facultyData].sort((a, b) => {
    const first = designationOrder[a.designation] || 99;
    const second = designationOrder[b.designation] || 99;
    if (first !== second) {
      return first - second;
    }
    return a.name.localeCompare(b.name);
  });

  const [searchQuery, setSearchQuery] = useState("");
  const gridRevealRef = useRef(null);
  const gridInView = useInView(gridRevealRef, { once: true, margin: "-60px" });

  const filteredFaculty = sortedFaculty.filter((faculty) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      faculty.name.toLowerCase().includes(query) ||
      (faculty.research && faculty.research.toLowerCase().includes(query)) ||
      faculty.designation.toLowerCase().includes(query)
    );
  });

  const totals = sortedFaculty.reduce(
    (acc, faculty) => {
      acc.publications += faculty.publications?.length || 0;
      acc.patents += faculty.patents?.length || 0;
      acc.achievements += faculty.achievements?.length || 0;
      return acc;
    },
    { publications: 0, patents: 0, achievements: 0 },
  );

  const statCards = [
    {
      label: "Faculty Members",
      value: sortedFaculty.length,
      icon: GraduationCap,
    },
    {
      label: "Research Publications",
      value: totals.publications,
      icon: ScrollText,
    },
    {
      label: "Filed Patents",
      value: totals.patents,
      icon: FolderOpenDot,
    },
    {
      label: "Recognitions",
      value: totals.achievements,
      icon: Trophy,
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      <PageHeader
        title="Faculty Directory"
        subtitle="Academic profiles shaped in a research-led environment with industrial relevance, mentorship, and institutional outcomes."
        badgeText="Academic Directory"
      />

      <section className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-6 py-8 shadow-sm md:px-8">
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
            <div>
              <Badge className="border-[var(--color-border)] bg-white px-3 py-1 text-[var(--color-text)]">
                Department Overview
              </Badge>
              <h2 className="mt-4 font-[var(--font-serif)] text-3xl font-black text-[var(--color-heading)] md:text-4xl">
                Dedicated to academic teaching, research, and innovation.
              </h2>
            </div>
          </div>

          <Motion.div
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? false : "visible"}
            variants={
              reduceMotion
                ? undefined
                : {
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                  }
            }
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {statCards.map((item) => {
              const Icon = item.icon;
              return (
                <Motion.div
                  key={item.label}
                  variants={
                    reduceMotion
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 20 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 24,
                            },
                          },
                        }
                  }
                >
                  <Card className="border-none bg-white">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                          {item.label}
                        </p>
                        <div className="rounded-xl bg-[var(--color-primary-soft)] p-2.5 text-[var(--color-primary)]">
                          <Icon size={16} />
                        </div>
                      </div>
                      <p className="mt-4 font-[var(--font-serif)] text-5xl font-black text-[var(--color-heading)]">
                        {item.value}
                      </p>
                    </CardContent>
                  </Card>
                </Motion.div>
              );
            })}
          </Motion.div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
        <div className="flex-1 max-w-lg relative">
          <input
            type="text"
            placeholder="Search faculty by name, designation, or research area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 pl-11 text-sm text-[var(--color-text)] placeholder-[var(--color-text-soft)]/60 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-soft)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z"
              />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--color-text-soft)] hover:text-[var(--color-accent)] transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="text-sm font-semibold text-[var(--color-text-soft)]">
          Showing {filteredFaculty.length} of {sortedFaculty.length} members
        </div>
      </div>

      {filteredFaculty.length === 0 ? (
        <div className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-white p-12 text-center">
          <p className="text-lg font-bold text-[var(--color-heading)]">No faculty members found</p>
          <p className="mt-2 text-sm text-[var(--color-text-soft)]">Try adjusting your search query.</p>
        </div>
      ) : (
        <section
          ref={gridRevealRef}
          style={{
            opacity: gridInView ? 1 : 0,
            transform: gridInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.45s ease, transform 0.45s ease"
          }}
        >
          <Motion.div
            initial={reduceMotion ? false : "hidden"}
            animate={reduceMotion ? false : "visible"}
            variants={
              reduceMotion
                ? undefined
                : {
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } },
                  }
            }
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredFaculty.map((faculty) => (
              <Motion.div
                key={faculty.id}
                variants={
                  reduceMotion
                    ? undefined
                    : {
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { type: "spring", stiffness: 300, damping: 24 },
                        },
                      }
                }
              >
                <FacultyCard faculty={faculty} />
              </Motion.div>
            ))}
          </Motion.div>
        </section>
      )}
    </div>
  );
}
