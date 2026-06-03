import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Microscope, FileText, Layers, Landmark, ArrowUpRight, GraduationCap } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";

const RESEARCH_AREAS = [
  {
    title: "Process Automation & control",
    description: "Design and modeling of advanced process controllers, industrial SCADA integrations, PID optimization, and loop stability analytics.",
    icon: Layers
  },
  {
    title: "Biomedical Instrumentation",
    description: "Development of bio-signal telemetry systems, heart-rate diagnostics, patient telemetry sensors, and clinical equipment signal conditioning.",
    icon: Microscope
  },
  {
    title: "Smart Sensors & Transducers",
    description: "R&D in digital telemetry protocols, MEMS sensors, transducer linearization models, and industrial fieldbus networks.",
    icon: Landmark
  }
];

export default function Research() {
  useDocumentMetadata({
    title: "Research Areas",
    description: "Learn about the department's core research areas, sponsored projects, government research grants, and labs.",
  });

  return (
    <div className="space-y-12 pb-12">
      <PageHeader
        title="Research & R&D Hub"
        description="Fostering innovation through active research groups, governmental grants, and industrial automation consultancy projects."
      />

      {/* Quick stats grid */}
      <section className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        <Card className="border border-[var(--color-border)] bg-white text-center">
          <CardContent className="p-6">
            <p className="text-2xl font-black font-[var(--font-serif)] text-[var(--color-primary)]">15+</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-soft)] mt-2">Active Projects</p>
          </CardContent>
        </Card>
        <Card className="border border-[var(--color-border)] bg-white text-center">
          <CardContent className="p-6">
            <p className="text-2xl font-black font-[var(--font-serif)] text-[var(--color-primary)]">1.2 Cr</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-soft)] mt-2">Sponsored Funding</p>
          </CardContent>
        </Card>
        <Card className="border border-[var(--color-border)] bg-white text-center">
          <CardContent className="p-6">
            <p className="text-2xl font-black font-[var(--font-serif)] text-[var(--color-primary)]">22</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-soft)] mt-2">Registered Ph.D. Scholars</p>
          </CardContent>
        </Card>
        <Card className="border border-[var(--color-border)] bg-white text-center">
          <CardContent className="p-6">
            <p className="text-2xl font-black font-[var(--font-serif)] text-[var(--color-primary)]">450+</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-soft)] mt-2">Total Publications</p>
          </CardContent>
        </Card>
      </section>

      {/* Core Research Areas */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-[var(--color-heading)] flex items-center gap-2">
          <GraduationCap size={20} className="text-[var(--color-accent)]" />
          Primary Research Domains
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {RESEARCH_AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <Card key={area.title} className="border border-[var(--color-border)] bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex rounded-xl bg-[var(--color-primary-soft)] p-3.5 text-[var(--color-primary)]">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-sm font-bold text-[var(--color-heading)] uppercase tracking-wider font-sans">
                    {area.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-soft)] leading-relaxed font-medium">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* R&D Directories Access Links */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card className="border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="space-y-2">
              <h4 className="text-base font-bold text-[var(--color-heading)]">Research Publications</h4>
              <p className="text-xs text-[var(--color-text-soft)] leading-relaxed font-medium">
                Browse through our list of journal publications, national and international conference proceedings, and book chapters.
              </p>
            </div>
            <Link
              to="/publications"
              className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-primary)] hover:text-amber-600 transition pt-6"
            >
              <span>Publications Directory</span>
              <ArrowUpRight size={14} />
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="space-y-2">
              <h4 className="text-base font-bold text-[var(--color-heading)]">Patents & Intellectual Property</h4>
              <p className="text-xs text-[var(--color-text-soft)] leading-relaxed font-medium">
                View filed and granted patents representing hardware designs, transducer models, and process plant innovations.
              </p>
            </div>
            <Link
              to="/patents"
              className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-primary)] hover:text-amber-600 transition pt-6"
            >
              <span>Patents Directory</span>
              <ArrowUpRight size={14} />
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
