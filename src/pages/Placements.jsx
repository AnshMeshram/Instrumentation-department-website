import { useState, useMemo } from "react";
import { TrendingUp, Award, Briefcase, Filter } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { useScrollReveal } from "../hooks/useScrollReveal";

const RECRUITERS = [
  "TCS",
  "Infosys",
  "Siemens",
  "ABB",
  "Honeywell",
  "Emerson",
  "Rockwell",
  "L&T",
  "BARC",
  "Forbes Marshall"
];

const PLACEMENT_RECORDS = [
  { year: "2025-26", company: "Honeywell", role: "Control Engineer", package: "12.0 LPA" },
  { year: "2025-26", company: "Emerson", role: "Systems Engineer", package: "10.5 LPA" },
  { year: "2024-25", company: "Rockwell Automation", role: "Application Engineer", package: "9.8 LPA" },
  { year: "2024-25", company: "Siemens", role: "Automation Specialist", package: "11.2 LPA" },
  { year: "2023-24", company: "TCS", role: "Assistant Systems Engineer", package: "7.5 LPA" },
  { year: "2023-24", company: "L&T", role: "Instrumentation Engineer", package: "8.8 LPA" },
  { year: "2022-23", company: "ABB", role: "Project Engineer", package: "9.2 LPA" },
  { year: "2022-23", company: "BARC", role: "Scientific Officer", package: "15.0 LPA" },
  { year: "2021-22", company: "Forbes Marshall", role: "Graduate Engineer Trainee", package: "8.0 LPA" },
  { year: "2021-22", company: "Honeywell", role: "R&D Engineer", package: "10.2 LPA" }
];

export default function Placements() {
  useDocumentMetadata({
    title: "Internships & Placements",
    description: "View department placement rates, average salary packages, key recruiting companies, and student placement history."
  });

  const [selectedYear, setSelectedYear] = useState("All");
  const { ref: reveal1Ref, isInView: reveal1InView } = useScrollReveal();
  const { ref: reveal2Ref, isInView: reveal2InView } = useScrollReveal();

  const filteredData = useMemo(() => {
    return PLACEMENT_RECORDS.filter((row) => selectedYear === "All" || row.year === selectedYear);
  }, [selectedYear]);

  const yearOptions = useMemo(() => {
    return Array.from(new Set(PLACEMENT_RECORDS.map((row) => row.year)));
  }, []);

  return (
    <div className="space-y-12 pb-12">
      <PageHeader
        title="Internships & Placements"
        description="Providing excellent industrial launchpads for our graduates through continuous training, mock drives, and industry collaborations."
      />

      {/* 3 Stats Cards */}
      <section
        ref={reveal1Ref}
        style={{
          opacity: reveal1InView ? 1 : 0,
          transform: reveal1InView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.5s ease, transform 0.5s ease"
        }}
        className="grid gap-6 md:grid-cols-3"
      >
        <Card className="border border-[var(--color-border)] bg-white shadow-sm hover:-translate-y-1 transition duration-300">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="rounded-xl bg-blue-50 p-4 text-blue-600">
              <TrendingUp size={28} />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold font-[var(--font-serif)] text-[var(--color-primary)]">
                9.5 LPA
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-soft)] mt-1">
                Average Package
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--color-border)] bg-white shadow-sm hover:-translate-y-1 transition duration-300">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="rounded-xl bg-amber-50 p-4 text-amber-600">
              <Award size={28} />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold font-[var(--font-serif)] text-[var(--color-primary)]">
                32.4 LPA
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-soft)] mt-1">
                Highest Package
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--color-border)] bg-white shadow-sm hover:-translate-y-1 transition duration-300">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="rounded-xl bg-emerald-50 p-4 text-emerald-600">
              <Briefcase size={28} />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold font-[var(--font-serif)] text-[var(--color-primary)]">
                450+
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-soft)] mt-1">
                Placed / Strong Alumni
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recruiter Marquee */}
      <section className="bg-[var(--color-surface-soft)] border-y border-[var(--color-border)] py-10 overflow-hidden relative">
        <div className="space-y-4">
          <h3 className="text-center text-xs font-bold uppercase tracking-widest text-[var(--color-text-soft)] mb-6">
            Key Corporate Recruiting & Training Partners
          </h3>
          <div className="relative flex overflow-x-hidden w-full">
            <div className="flex animate-marquee whitespace-nowrap gap-16 text-[var(--color-border-strong)] font-bold text-sm uppercase tracking-[0.15em] shrink-0">
              {[...RECRUITERS, ...RECRUITERS, ...RECRUITERS].map((recruiter, idx) => (
                <span key={idx} className="hover:text-[var(--color-accent)] transition cursor-default">
                  {recruiter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Year Filterable placement records table */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-[var(--color-heading)] flex items-center gap-2">
            <Briefcase size={20} className="text-[var(--color-accent)]" />
            Recent Student Placements
          </h3>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[var(--color-text-soft)]" />
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Select Batch Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Graduation Batches</SelectItem>
                {yearOptions.map((yr) => (
                  <SelectItem key={yr} value={yr}>
                    Batch {yr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Data Table */}
        <div
          ref={reveal2Ref}
          style={{
            opacity: reveal2InView ? 1 : 0,
            transform: reveal2InView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.5s ease, transform 0.5s ease"
          }}
          className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-[var(--color-surface-soft)] border-b border-[var(--color-border)] text-xs font-bold uppercase tracking-wider text-[var(--color-text-soft)]">
                <tr>
                  <th className="p-4">Academic Year</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] font-medium text-[var(--color-text)]">
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--color-surface-soft)]/50 transition">
                    <td className="p-4 font-bold">{row.year}</td>
                    <td className="p-4">{row.company}</td>
                    <td className="p-4 text-[var(--color-text-soft)]">{row.role}</td>
                    <td className="p-4 font-bold text-[var(--color-accent)]">{row.package}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-3 text-xs text-[var(--color-text-soft)]">
            Showing {filteredData.length} placement records
          </div>
        </div>
      </section>
    </div>
  );
}
