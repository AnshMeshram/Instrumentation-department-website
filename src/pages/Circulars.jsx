import { useState, useMemo } from "react";
import { Download, FileText, Calendar, Filter } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import PageHeader from "../components/PageHeader";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import { useScrollReveal } from "../hooks/useScrollReveal";

const CIRCULARS_DATA = [
  {
    title: "End Semester Examination Time Table - AY 2025-26 Term II",
    date: "2026-05-10",
    type: "Notices",
    description: "Detailed timetable and classroom allocations for the upcoming end-semester examinations."
  },
  {
    title: "Annual Departmental Progress Report - 2024-25",
    date: "2025-12-15",
    type: "Reports",
    description: "Comprehensive summary of faculty publications, patents, placement statistics, and infrastructure additions."
  },
  {
    title: "Rules for Project Phase I Selection - B.Tech Final Year",
    date: "2026-04-02",
    type: "Circulars",
    description: "Guidelines for choosing industry-sponsored projects and supervisor assignment process."
  },
  {
    title: "AICTE Sponsored STTP on Advanced Industrial Control Systems",
    date: "2026-03-20",
    type: "Circulars",
    description: "Brochure and registration instructions for the 1-week Short Term Training Program."
  },
  {
    title: "Minutes of the 48th Board of Studies (BOS) Meeting",
    date: "2026-01-25",
    type: "Reports",
    description: "Official approvals for curriculum updates, new elective courses, and evaluation criteria modifications."
  },
  {
    title: "M.Tech Dissertation Evaluation Scheme Term II",
    date: "2026-05-01",
    type: "Notices",
    description: "Notice outlining presentation formats, review cycles, and final grading guidelines."
  },
  {
    title: "Department Placement Report - Batch of 2025",
    date: "2025-07-30",
    type: "Reports",
    description: "Detailed performance listing recruiting partners, average salaries, and historical trends."
  },
  {
    title: "Guidelines for Anti-Ragging Committee and Grievances",
    date: "2025-08-01",
    type: "Notices",
    description: "Official codes of conduct, committee composition, and helpline information for students."
  }
];

export default function Circulars() {
  useDocumentMetadata({
    title: "Circulars & Reports",
    description: "Access official notices, circulars, and annual progress reports published by the department."
  });

  const [activeFilter, setActiveFilter] = useState("All");
  const { ref, isInView } = useScrollReveal();

  const filteredEntries = useMemo(() => {
    return CIRCULARS_DATA.filter((entry) => activeFilter === "All" || entry.type === activeFilter);
  }, [activeFilter]);

  const handleDownload = (title) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 800)),
      {
        loading: "Retrieving document...",
        success: `${title} PDF downloaded successfully!`,
        error: "Failed to download document."
      }
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Circulars & Reports"
        description="Stay updated with the latest departmental announcements, notices, policies, and annual performance publications."
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
        <div className="flex flex-wrap gap-2">
          {["All", "Circulars", "Reports", "Notices"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                activeFilter === filter
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-surface-soft)] text-[var(--color-text-soft)] hover:bg-[var(--color-border)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-text-soft)]">
          <Filter size={12} />
          <span>Filter active</span>
        </div>
      </div>

      {/* Entries List */}
      <div
        ref={ref}
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.5s ease, transform 0.5s ease"
        }}
        className="space-y-4"
      >
        {filteredEntries.map((entry, idx) => (
          <Card key={idx} className="border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[var(--color-accent)] text-white text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider">
                    {entry.type}
                  </Badge>
                  <span className="text-[10px] text-[var(--color-text-soft)] font-semibold flex items-center gap-1">
                    <Calendar size={10} />
                    {entry.date}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[var(--color-heading)] flex items-start gap-2">
                  <FileText size={16} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                  {entry.title}
                </h4>
                <p className="text-xs text-[var(--color-text-soft)] font-medium leading-relaxed max-w-4xl">
                  {entry.description}
                </p>
              </div>
              <button
                onClick={() => handleDownload(entry.title)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-border-strong)] bg-white hover:bg-[var(--color-surface-soft)] text-[var(--color-heading)] px-4 py-2 text-2xs font-bold transition shrink-0 self-start md:self-center cursor-pointer active:scale-95"
              >
                <Download size={12} />
                Download PDF
              </button>
            </CardContent>
          </Card>
        ))}

        {filteredEntries.length === 0 && (
          <div className="text-center py-12 text-[var(--color-text-soft)] font-semibold text-sm">
            No items found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
