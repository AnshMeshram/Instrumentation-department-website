import { useMemo, useState, useRef } from "react";
import dayjs from "dayjs";
import { BadgeCheck, FileStack, CheckCircle2, FileText, Clock } from "lucide-react";
import PatentCard from "../components/PatentCard";
import PatentFilters from "../components/PatentFilters";
import PatentTable from "../components/PatentTable";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import patentsData from "../data/patents.json";
import { motion as Motion, useReducedMotion, useInView } from "framer-motion";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

function getDateValue(patent) {
  return patent.applicationDate || patent.grantedDate || "";
}

function getYear(patent) {
  const source = getDateValue(patent);
  if (!source) return "";

  const parsed = dayjs(source);
  if (!parsed.isValid()) return "";

  return String(parsed.year());
}

export default function Patents() {
  useDocumentMetadata({
    title: "Patents & Intellectual Property",
    description: "Explore the patents, innovations, and intellectual property filed and granted to the faculty and researchers of the department.",
  });
  const statsRevealRef = useRef(null);
  const statsInView = useInView(statsRevealRef, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  function handleResetFilters() {
    setSearch("");
    setSelectedStatus("All");
    setSelectedYear("All");
    setSelectedType("All");
  }

  const yearOptions = useMemo(() => {
    const years = Array.from(
      new Set(patentsData.map((patent) => getYear(patent)).filter(Boolean)),
    );

    return years.sort((a, b) => Number(b) - Number(a));
  }, []);

  const summary = useMemo(() => {
    return patentsData.reduce(
      (acc, patent) => {
        acc.total += 1;
        if (patent.status === "Granted") acc.granted += 1;
        if (patent.status === "Published") acc.published += 1;
        if (patent.status === "Applied") acc.applied += 1;
        return acc;
      },
      { total: 0, granted: 0, published: 0, applied: 0 },
    );
  }, []);

  const activeFiltersCount =
    (search.trim() ? 1 : 0) +
    (selectedStatus !== "All" ? 1 : 0) +
    (selectedYear !== "All" ? 1 : 0) +
    (selectedType !== "All" ? 1 : 0);

  const filteredPatents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patentsData
      .filter((patent) => {
        const titleMatch = patent.title.toLowerCase().includes(query);
        const facultyMatch = patent.facultyStudents
          .join(" ")
          .toLowerCase()
          .includes(query);

        const statusMatch =
          selectedStatus === "All" || patent.status === selectedStatus;
        const yearMatch =
          selectedYear === "All" || getYear(patent) === selectedYear;
        const typeMatch =
          selectedType === "All" || patent.type === selectedType;

        return (
          (query ? titleMatch || facultyMatch : true) &&
          statusMatch &&
          yearMatch &&
          typeMatch
        );
      })
      .sort((first, second) => {
        const firstDate = new Date(getDateValue(first)).getTime() || 0;
        const secondDate = new Date(getDateValue(second)).getTime() || 0;

        return secondDate - firstDate;
      });
  }, [search, selectedStatus, selectedYear, selectedType]);

  return (
    <div className="space-y-12 pb-12">
      <section className="overflow-hidden rounded-[var(--radius-container)] border border-[var(--color-border)] border-t-[5px] border-t-[var(--color-primary)] bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)]">
        <div className="px-8 py-12 lg:px-12 lg:py-14 space-y-10">
          <div className="grid gap-8 lg:grid-cols-[1fr,auto] items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="type"
                  className="bg-[var(--color-primary)] text-white px-4 py-1.5"
                >
                  Intellectual Property
                </Badge>
                <Badge
                  variant="default"
                  className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border-[var(--color-border)] px-4 py-1.5"
                >
                  IP Portfolio
                </Badge>
              </div>

              <h1 className="mt-8 font-[var(--font-serif)] text-4xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-5xl">
                Patents and Innovation
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
                A record of granted, published, and filed patents reflecting the
                department&apos;s commitment to pioneering instrumentation and
                industrial automation outcomes.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-3">
              <FileStack size={20} className="text-[var(--color-accent)]" />
              <span className="text-sm font-bold text-[var(--color-heading)]">
                {yearOptions.length} years indexed
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-[var(--color-border)] pt-8">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-5 py-5 transition-all hover:bg-white hover:shadow-sm">
              <BadgeCheck size={16} className="mb-2 text-[var(--color-text-soft)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                Total
              </p>
              <p className="mt-3 text-4xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {summary.total}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-5 py-5 transition-all hover:bg-white hover:shadow-sm">
              <CheckCircle2 size={16} className="mb-2 text-[var(--color-accent)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Granted
              </p>
              <p className="mt-3 text-4xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {summary.granted}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-highlight)]/20 bg-[var(--color-highlight)]/5 px-5 py-5 transition-all hover:bg-white hover:shadow-sm">
              <FileStack size={16} className="mb-2 text-[var(--color-highlight)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-highlight)]">
                Published
              </p>
              <p className="mt-3 text-4xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {summary.published}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-5 py-5 transition-all hover:bg-white hover:shadow-sm">
              <Clock size={16} className="mb-2 text-[var(--color-text-soft)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Applied
              </p>
              <p className="mt-3 text-4xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {summary.applied}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        ref={statsRevealRef}
        style={{
          opacity: statsInView ? 1 : 0,
          transform: statsInView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.45s ease, transform 0.45s ease"
        }}
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { label: "Total Patents", value: summary.total, icon: BadgeCheck },
          { label: "Granted", value: summary.granted, icon: CheckCircle2 },
          { label: "Published", value: summary.published, icon: FileText },
          { label: "Applied", value: summary.applied, icon: Clock },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="border-none bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition duration-300">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
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
          );
        })}
      </section>

      <PatentFilters
        search={search}
        selectedStatus={selectedStatus}
        selectedYear={selectedYear}
        selectedType={selectedType}
        yearOptions={yearOptions}
        activeFiltersCount={activeFiltersCount}
        onSearchChange={setSearch}
        onStatusChange={setSelectedStatus}
        onYearChange={setSelectedYear}
        onTypeChange={setSelectedType}
        onResetFilters={handleResetFilters}
      />

      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-[var(--color-text-soft)]" aria-live="polite">
          Showing {filteredPatents.length} patent
          {filteredPatents.length === 1 ? "" : "s"}
        </p>
        <p className="hidden text-xs font-medium uppercase tracking-wide text-[var(--color-text-soft)] md:block">
          Table view
        </p>
      </div>

      {filteredPatents.length === 0 ? (
        <section className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--color-heading)]">
            No patents found
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-soft)]">
            Try changing the search keywords or filters.
          </p>
        </section>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <PatentTable patents={filteredPatents} />
          </div>

          <Motion.div
            className="grid grid-cols-1 gap-4 md:hidden"
            initial="hidden"
            animate="visible"
            variants={
              reduceMotion
                ? undefined
                : {
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.08,
                      },
                    },
                  }
            }
          >
            {filteredPatents.map((patent) => (
              <Motion.div
                key={patent.id}
                variants={
                  reduceMotion
                    ? undefined
                    : {
                        hidden: { opacity: 0, y: 16 },
                        visible: { opacity: 1, y: 0 },
                      }
                }
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <PatentCard patent={patent} />
              </Motion.div>
            ))}
          </Motion.div>
        </>
      )}
    </div>
  );
}
