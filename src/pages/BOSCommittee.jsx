import { ClipboardList, ExternalLink, Calendar, Users } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import toast from "react-hot-toast";
import { useScrollReveal } from "../hooks/useScrollReveal";

const MEMBERS = [
  { name: "Dr. S. D. Agashe", affiliation: "Professor, Department of Instrumentation, COEP Tech", role: "Chairman" },
  { name: "Dr. D. N. Sonawane", affiliation: "Associate Professor, Department of Instrumentation, COEP Tech", role: "Member Secretary" },
  { name: "Dr. Radhakant Padhi", affiliation: "Professor, Aerospace Department, IISc Bangalore", role: "External Academic Expert" },
  { name: "Mr. Nitin Gupte", affiliation: "Director, Emerson Export Engineering, Pune", role: "Industry Representative" },
  { name: "Dr. P. S. V. Nataraj", affiliation: "Professor, Systems & Control Engineering, IIT Bombay", role: "External Academic Expert" }
];

const MEETINGS = [
  {
    title: "48th Board of Studies (BOS) Meeting Minutes",
    date: "2026-01-15",
    description: "Updates to B.Tech final-year electives and M.Tech Term-II evaluation credits approved."
  },
  {
    title: "47th Board of Studies (BOS) Meeting Minutes",
    date: "2025-06-18",
    description: "Restructuring of Second-year transducing lab modules and core syllabus revisions."
  },
  {
    title: "46th Board of Studies (BOS) Meeting Minutes",
    date: "2024-11-20",
    description: "Approval of industry-sponsored micro-credentials and internship credit integration."
  },
  {
    title: "45th Board of Studies (BOS) Meeting Minutes",
    date: "2024-05-14",
    description: "Review of NBA accreditation files, program outcomes, and research lab updates."
  }
];

export default function BOSCommittee() {
  useDocumentMetadata({
    title: "BOS Committee & Minutes",
    description: "Board of Studies (BOS) constitution, committee members, and minutes of meetings for Instrumentation & Control Engineering."
  });

  const handleViewPdf = (title) => {
    toast.success(`Opening PDF: ${title}`);
  };

  const { ref: reveal1Ref, isInView: reveal1InView } = useScrollReveal();
  const { ref: reveal2Ref, isInView: reveal2InView } = useScrollReveal();

  return (
    <div className="space-y-12 pb-12">
      <PageHeader
        title="BOS Committee & Minutes"
        description="Official Board of Studies (BOS) details, constitution of members, and recorded minutes of curriculum design meetings."
      />

      {/* Members Section */}
      <section
        ref={reveal1Ref}
        style={{
          opacity: reveal1InView ? 1 : 0,
          transform: reveal1InView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.5s ease, transform 0.5s ease"
        }}
        className="space-y-6"
      >
        <h3 className="text-lg font-bold text-[var(--color-heading)] flex items-center gap-2">
          <Users size={20} className="text-[var(--color-accent)]" />
          Board of Studies Members
        </h3>
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-[var(--color-surface-soft)] border-b border-[var(--color-border)] text-xs font-bold uppercase tracking-wider text-[var(--color-text-soft)]">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Designation / Affiliation</th>
                  <th className="p-4">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] font-medium text-[var(--color-text)]">
                {MEMBERS.map((member, idx) => (
                  <tr key={idx} className="hover:bg-[var(--color-surface-soft)]/50 transition">
                    <td className="p-4 font-bold text-[var(--color-primary)]">{member.name}</td>
                    <td className="p-4">{member.affiliation}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-600/10">
                        {member.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Minutes of Meetings Section */}
      <section
        ref={reveal2Ref}
        style={{
          opacity: reveal2InView ? 1 : 0,
          transform: reveal2InView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.5s ease, transform 0.5s ease"
        }}
        className="space-y-6"
      >
        <h3 className="text-lg font-bold text-[var(--color-heading)] flex items-center gap-2">
          <ClipboardList size={20} className="text-[var(--color-accent)]" />
          Minutes of Meetings
        </h3>
        <div className="grid gap-6">
          {MEETINGS.map((meeting, idx) => (
            <Card key={idx} className="border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition">
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] text-[var(--color-text-soft)] font-semibold flex items-center gap-1">
                    <Calendar size={10} />
                    {meeting.date}
                  </span>
                  <h4 className="text-sm font-bold text-[var(--color-heading)]">
                    {meeting.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-soft)] leading-relaxed font-medium">
                    {meeting.description}
                  </p>
                </div>
                <button
                  onClick={() => handleViewPdf(meeting.title)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-border-strong)] bg-white hover:bg-[var(--color-surface-soft)] text-[var(--color-heading)] px-4 py-2 text-2xs font-bold transition shrink-0 cursor-pointer active:scale-95"
                >
                  View PDF
                  <ExternalLink size={10} />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
