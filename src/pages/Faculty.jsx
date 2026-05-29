import FacultyCard from "../components/FacultyCard";
import facultyData from "../data/faculty.json";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { GraduationCap, ScrollText, Trophy, FolderOpenDot } from "lucide-react";
import { motion as Motion, useReducedMotion } from "framer-motion";

const designationOrder = {
  Professor: 1,
  "Associate Professor": 2,
  "Assistant Professor": 3,
};

export default function Faculty() {
  const reduceMotion = useReducedMotion();
  const sortedFaculty = [...facultyData].sort((a, b) => {
    const first = designationOrder[a.designation] || 99;
    const second = designationOrder[b.designation] || 99;
    if (first !== second) {
      return first - second;
    }
    return a.name.localeCompare(b.name);
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

      <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-6 py-8 shadow-sm md:px-8">
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-24 translate-x-16 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
            <div>
              <Badge className="border-[var(--color-border)] bg-white px-3 py-1 text-[var(--color-text)]">
                Faculty Intelligence Panel
              </Badge>
              <h2 className="mt-4 font-[var(--font-serif)] text-3xl font-black text-[var(--color-heading)] md:text-4xl">
                Profiles aligned with teaching, research, and impact.
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
                      <p className="mt-4 font-[var(--font-serif)] text-4xl font-black text-[var(--color-heading)]">
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
        className="grid grid-cols-1 gap-10"
      >
        {sortedFaculty.map((faculty) => (
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
    </div>
  );
}
