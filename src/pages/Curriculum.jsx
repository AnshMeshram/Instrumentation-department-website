import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, Download, GraduationCap } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import { useScrollReveal } from "../hooks/useScrollReveal";

const CURRICULUM_DATA = {
  btech: [
    {
      semester: "Semester I & II (First Year)",
      courses: [
        { code: "PH-19001", name: "Engineering Physics", credits: 4 },
        { code: "MA-19002", name: "Linear Algebra & Calculus", credits: 5 },
        { code: "EE-19003", name: "Basic Electrical Engineering", credits: 3 },
        { code: "ME-19004", name: "Engineering Graphics", credits: 3 }
      ]
    },
    {
      semester: "Semester III (Second Year)",
      courses: [
        { code: "IE-20001", name: "Transducers & Sensors", credits: 4 },
        { code: "IE-20002", name: "Analog & Digital Electronics", credits: 4 },
        { code: "IE-20003", name: "Electrical & Electronic Measurements", credits: 3 },
        { code: "MA-20004", name: "Numerical Methods & Probability", credits: 3 }
      ]
    },
    {
      semester: "Semester IV (Second Year)",
      courses: [
        { code: "IE-20005", name: "Linear Control Systems", credits: 4 },
        { code: "IE-20006", name: "Signal Conditioning Circuits", credits: 4 },
        { code: "IE-20007", name: "Microcontrollers & Applications", credits: 3 },
        { code: "IE-20008", name: "Feedback Systems Lab", credits: 2 }
      ]
    },
    {
      semester: "Semester V (Third Year)",
      courses: [
        { code: "IE-30001", name: "Process Instrumentation", credits: 4 },
        { code: "IE-30002", name: "Digital Signal Processing", credits: 4 },
        { code: "IE-30003", name: "Analytical Instrumentation", credits: 3 },
        { code: "IE-30004", name: "Control System Design", credits: 3 }
      ]
    }
  ],
  mtech: [
    {
      semester: "Semester I (First Year)",
      courses: [
        { code: "IE-501", name: "Mathematical Methods in Control", credits: 4 },
        { code: "IE-502", name: "Advanced Process Control", credits: 4 },
        { code: "IE-503", name: "Industrial Automation Systems", credits: 3 },
        { code: "IE-504", name: "Transducer Design & Modeling", credits: 3 }
      ]
    },
    {
      semester: "Semester II (First Year)",
      courses: [
        { code: "IE-505", name: "Robust and Optimal Control", credits: 4 },
        { code: "IE-506", name: "System Identification & Adaptive Control", credits: 4 },
        { code: "IE-507", name: "Digital Signal Processors", credits: 3 },
        { code: "IE-508", name: "Mini Project", credits: 2 }
      ]
    },
    {
      semester: "Semester III (Second Year)",
      courses: [
        { code: "IE-601", name: "Advanced Instrumentation Seminar", credits: 2 },
        { code: "IE-602", name: "Dissertation Phase I", credits: 12 },
        { code: "IE-603", name: "Industry Internship Project", credits: 4 }
      ]
    },
    {
      semester: "Semester IV (Second Year)",
      courses: [
        { code: "IE-604", name: "Dissertation Phase II", credits: 20 },
        { code: "IE-605", name: "Project Viva Voce", credits: 2 }
      ]
    }
  ]
};

function SemesterAccordion({ semester, courses, isOpen, onToggle }) {
  return (
    <Card className="border border-[var(--color-border)] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <h2>
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between px-6 py-4 bg-[var(--color-surface-soft)] hover:bg-[var(--color-border)]/50 transition text-left cursor-pointer font-bold text-sm text-[var(--color-heading)]"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2">
            <BookOpen size={16} className="text-[var(--color-accent)]" />
            {semester}
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
            <div className="p-6 border-t border-[var(--color-border)] bg-white overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-[var(--color-text-soft)] uppercase font-bold tracking-wider">
                    <th className="pb-3">Course Code</th>
                    <th className="pb-3">Course Name</th>
                    <th className="pb-3 text-right">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] font-medium text-[var(--color-text)]">
                  {courses.map((c) => (
                    <tr key={c.code} className="hover:bg-[var(--color-surface-soft)]/50 transition">
                      <td className="py-3 font-bold text-[var(--color-accent)]">{c.code}</td>
                      <td className="py-3">{c.name}</td>
                      <td className="py-3 text-right font-bold">{c.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export default function Curriculum() {
  useDocumentMetadata({
    title: "Curriculum & Schemes",
    description: "Browse detailed undergraduate and postgraduate curriculum, course schemes, credits, and syllabus details."
  });

  const [activeTab, setActiveTab] = useState("btech");
  const [openSemesterIndex, setOpenSemesterIndex] = useState(0);

  const semesters = CURRICULUM_DATA[activeTab];
  const { ref, isInView } = useScrollReveal();

  const handleDownload = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Generating PDF...",
        success: "Syllabus PDF downloaded successfully!",
        error: "Failed to download syllabus."
      }
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Curriculum & Schemes"
        description="Official syllabus templates and course credit structures approved by the Board of Studies (BOS)."
      />

      {/* Program Selector Tabs using Radix Tabs */}
      <Tabs.Root value={activeTab} onValueChange={(val) => { setActiveTab(val); setOpenSemesterIndex(0); }}>
        <Tabs.List className="flex justify-center border-b border-[var(--color-border)] pb-4 gap-4 relative">
          <Tabs.Trigger
            value="btech"
            className={`pb-2 px-4 text-sm font-bold relative transition cursor-pointer outline-none ${
              activeTab === "btech"
                ? "text-[var(--color-primary)] font-extrabold"
                : "text-[var(--color-text-soft)] hover:text-[var(--color-primary)]"
            }`}
          >
            B.Tech Curriculum
            {activeTab === "btech" && (
              <Motion.span
                layoutId="curriculum-tab-line"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Tabs.Trigger>
          <Tabs.Trigger
            value="mtech"
            className={`pb-2 px-4 text-sm font-bold relative transition cursor-pointer outline-none ${
              activeTab === "mtech"
                ? "text-[var(--color-primary)] font-extrabold"
                : "text-[var(--color-text-soft)] hover:text-[var(--color-primary)]"
            }`}
          >
            M.Tech Curriculum
            {activeTab === "mtech" && (
              <Motion.span
                layoutId="curriculum-tab-line"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>

      {/* Actions and Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--color-surface-soft)] border border-[var(--color-border)] p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <GraduationCap className="text-[var(--color-accent)]" size={24} />
          <div>
            <p className="text-xs font-bold text-[var(--color-heading)]">
              Syllabus Version: Academic Year 2025-26
            </p>
            <p className="text-[10px] text-[var(--color-text-soft)]">
              Accredited by National Board of Accreditation (NBA)
            </p>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)] px-4 py-2 text-2xs font-bold text-white shadow-sm hover:bg-[var(--color-accent)] transition-colors cursor-pointer active:scale-95"
        >
          Download Full PDF
        </button>
      </div>

      {/* Exclusive Semester Accordion */}
      <div
        ref={ref}
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.5s ease, transform 0.5s ease"
        }}
        className="space-y-4"
      >
        {semesters.map((sem, index) => (
          <SemesterAccordion
            key={sem.semester}
            semester={sem.semester}
            courses={sem.courses}
            isOpen={openSemesterIndex === index}
            onToggle={() => setOpenSemesterIndex(openSemesterIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}
