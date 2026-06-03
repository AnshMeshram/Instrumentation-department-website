import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldAlert, Mail } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import { useScrollReveal } from "../hooks/useScrollReveal";

const COMMITTEES = [
  {
    id: "anti-ragging",
    name: "Anti-Ragging Committee",
    description: "Maintains a ragging-free campus culture by implementing guidelines and addressing student safety queries.",
    members: [
      { name: "Dr. S. D. Agashe", role: "Chairman", contact: "head.instrumentation@coeptech.ac.in" },
      { name: "Dr. D. N. Sonawane", role: "Member Secretary", contact: "dns.instru@coeptech.ac.in" },
      { name: "Prof. M. A. Khandekar", role: "Member Representative", contact: "mak.instru@coeptech.ac.in" }
    ]
  },
  {
    id: "iqac",
    name: "Internal Quality Assurance Cell (IQAC)",
    description: "Monitors academic quality metrics, accreditation documentations, feedback systems, and continuous teaching improvements.",
    members: [
      { name: "Dr. S. L. Patil", role: "Coordinator", contact: "slp.instru@coeptech.ac.in" },
      { name: "Dr. P. D. Shendge", role: "Quality Auditor", contact: "pds.instru@coeptech.ac.in" },
      { name: "Dr. U. M. Chaskar", role: "Member Representative", contact: "umc.instru@coeptech.ac.in" }
    ]
  },
  {
    id: "grievance",
    name: "Grievance Cell",
    description: "Provides students and staff members a platform to submit official complaints or academic feedback in confidence.",
    members: [
      { name: "Dr. R. T. Patil", role: "Chairman", contact: "rtp.instru@coeptech.ac.in" },
      { name: "Prof. S. B. Ghodke", role: "Grievance Officer", contact: "sbg.instru@coeptech.ac.in" }
    ]
  },
  {
    id: "womens-cell",
    name: "Women's Cell / ICC",
    description: "Promotes gender sensitivity, runs safety awareness campaigns, and handles grievances related to women employees and students.",
    members: [
      { name: "Dr. Mrs. R. P. Mudhalwadkar", role: "Presiding Officer", contact: "rpm.instru@coeptech.ac.in" },
      { name: "Mrs. S. V. Unde", role: "Faculty Representative", contact: "svu.instru@coeptech.ac.in" }
    ]
  },
  {
    id: "sports",
    name: "Sports & Extra-Curricular Committee",
    description: "Coordinates departmental participation in annual university sports matches, fests, and MESA activities.",
    members: [
      { name: "Dr. U. M. Chaskar", role: "Faculty President", contact: "umc.instru@coeptech.ac.in" },
      { name: "Prof. S. B. Ghodke", role: "Faculty Representative", contact: "sbg.instru@coeptech.ac.in" }
    ]
  }
];

function CommitteeAccordion({ committee, isOpen, onToggle }) {
  return (
    <Card className="border border-[var(--color-border)] bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <h2>
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between px-6 py-4 bg-[var(--color-surface-soft)] hover:bg-[var(--color-border)]/50 transition text-left cursor-pointer font-bold text-sm text-[var(--color-heading)]"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2">
            <ShieldAlert size={16} className="text-[var(--color-accent)]" />
            {committee.name}
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 text-[var(--color-text-soft)] ${
              isOpen ? "rotate-180 text-[var(--color-primary)]" : ""
            }`}
          />
        </button>
      </h2>

      <AnimatePresence initial={false}>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 border-t border-[var(--color-border)] bg-white space-y-4">
              <p className="text-xs text-[var(--color-text-soft)] leading-relaxed font-medium">
                {committee.description}
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] text-[var(--color-text-soft)] uppercase font-bold tracking-wider">
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Role</th>
                      <th className="pb-3">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)] font-medium text-[var(--color-text)]">
                    {committee.members.map((m, idx) => (
                      <tr key={idx} className="hover:bg-[var(--color-surface-soft)]/50 transition">
                        <td className="py-3 font-bold text-[var(--color-primary)]">{m.name}</td>
                        <td className="py-3">{m.role}</td>
                        <td className="py-3 font-semibold text-[var(--color-text-soft)] flex items-center gap-1.5">
                          <Mail size={12} className="text-[var(--color-accent)]" />
                          <a href={`mailto:${m.contact}`} className="hover:underline hover:text-[var(--color-primary)]">
                            {m.contact}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default function DeptCommittees() {
  useDocumentMetadata({
    title: "Department Committees",
    description: "Browse various departmental administrative committees, members, profiles, and safety grids."
  });

  const [openIndex, setOpenIndex] = useState(0);
  const { ref, isInView } = useScrollReveal();

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Department Committees"
        description="Official constituted committees responsible for administrative governance, safety, quality standards, and student grievances."
      />

      <div
        ref={ref}
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.5s ease, transform 0.5s ease"
        }}
        className="space-y-4"
      >
        {COMMITTEES.map((comm, idx) => (
          <CommitteeAccordion
            key={comm.id}
            committee={comm}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </div>
  );
}
