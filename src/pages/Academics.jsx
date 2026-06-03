import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Clock, FileText, ChevronRight } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";

const PROGRAMS = [
  {
    degree: "B.Tech in Instrumentation & Control",
    duration: "4 Years (Undergraduate)",
    description: "Focuses on hardware design, electronics, sensors, microcontroller interfaces, and industrial plant systems.",
    intake: "60 Seats"
  },
  {
    degree: "M.Tech in Process Automation",
    duration: "2 Years (Postgraduate)",
    description: "Advanced courses in process simulation, industrial digital networks, robust control models, and PLC-DCS setups.",
    intake: "18 Seats"
  },
  {
    degree: "Ph.D. in Instrumentation & Control Engineering",
    duration: "3-5 Years (Doctoral)",
    description: "Original research in sensors, biomedical electronics, intelligent robotic systems, and robust controllers.",
    intake: "Based on Vacancies"
  }
];

export default function Academics() {
  useDocumentMetadata({
    title: "Academic Programs",
    description: "Explore our undergraduate, postgraduate, and doctoral degree programs, syllabus details, and academic timetables.",
  });

  return (
    <div className="space-y-12 pb-12">
      <PageHeader
        title="Academic Programs & Schedules"
        description="Nurturing excellence through accredited undergraduate, postgraduate, and doctoral tracks in control systems engineering."
      />

      {/* Program Tracks Grid */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-[var(--color-heading)] flex items-center gap-2">
          <GraduationCap size={20} className="text-[var(--color-accent)]" />
          Offered Degree Programs
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {PROGRAMS.map((prog) => (
            <Card key={prog.degree} className="border border-[var(--color-border)] bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition duration-300">
              <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-[var(--color-heading)] leading-tight">
                    {prog.degree}
                  </h4>
                  <p className="text-2xs font-bold text-[var(--color-accent)] uppercase tracking-wider">
                    {prog.duration} &bull; Intake: {prog.intake}
                  </p>
                  <p className="text-xs text-[var(--color-text-soft)] leading-relaxed font-medium pt-2">
                    {prog.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card className="border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[var(--color-heading)]">Curriculum & Schemes</h4>
              <p className="text-xs text-[var(--color-text-soft)] font-medium">Syllabi, evaluation schemes, and course credit distribution.</p>
            </div>
            <Link to="/curriculum" className="text-[var(--color-primary)] hover:text-amber-600 transition">
              <ChevronRight size={20} />
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[var(--color-heading)]">Academic Timetables</h4>
              <p className="text-xs text-[var(--color-text-soft)] font-medium">Daily lecture schedules, exam timelines, and calendar events.</p>
            </div>
            <Link to="/time-table" className="text-[var(--color-primary)] hover:text-amber-600 transition">
              <ChevronRight size={20} />
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
