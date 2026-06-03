import useDocumentMetadata from "../hooks/useDocumentMetadata";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { FlaskConical } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const LABS_DATA = [
  {
    name: "Control Systems Lab",
    description: "Equipped for modeling, design, and simulation of control loops. Students study feedback mechanisms, PID controller designs, and industrial servomotors.",
    equipment: ["DC Servomotors", "PID Controllers", "MATLAB & Simulink", "PLC Trainers"]
  },
  {
    name: "Process Instrumentation Lab",
    description: "Focuses on calibration and measurement techniques. Includes pneumatic control valves, level/flow/temperature loops, and digital data acquisition units.",
    equipment: ["Pneumatic Control Valves", "Flow Loop Trainers", "Calibration Baths", "DCS Simulator"]
  },
  {
    name: "Signal Processing Lab",
    description: "Equipped with high-performance DSP processors, computers, and logic analyzers to design filtering and signal estimation algorithms.",
    equipment: ["DSP Evaluation Board", "Digital Oscilloscopes", "Logic Analyzers", "LabVIEW Studio"]
  },
  {
    name: "Embedded Systems Lab",
    description: "Focuses on microcontrollers, IoT processors, and real-time firmware execution. Students design automated measurement prototypes.",
    equipment: ["ARM Cortex Dev Kits", "Arduino & Raspberry Pi", "RTOS Workstations", "Solder Stations"]
  },
  {
    name: "Biomedical Instrumentation Lab",
    description: "Dedicated to physiological measurement techniques, medical imaging concepts, bio-signal acquisition amplifiers, and safety analysis.",
    equipment: ["ECG & EEG simulators", "Defibrillator Analyzers", "Bio-amplifiers", "Pacemaker Simulator"]
  },
  {
    name: "VLSI & Sensors Lab",
    description: "Designed for sensor prototyping, microelectronic layout designs, and MEMS transducer modeling under laboratory conditions.",
    equipment: ["FPGA Boards", "EDA Design Tools", "MEMS Design Software", "Clean Workstations"]
  }
];

export default function Laboratories() {
  useDocumentMetadata({
    title: "Laboratories",
    description: "Explore the state-of-the-art laboratory facilities and experimental setups in the Instrumentation & Control Engineering Department."
  });

  const { ref, isInView } = useScrollReveal();

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Laboratories"
        description="Providing hands-on experimental facilities, industrial standard instrumentation, and testing rigs for research and student learning."
      />

      <div
        ref={ref}
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.5s ease, transform 0.5s ease"
        }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {LABS_DATA.map((lab) => (
          <Card
            key={lab.name}
            className="border border-[var(--color-border)] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
          >
            <CardContent className="p-6 space-y-4 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="inline-flex rounded-xl bg-[var(--color-primary-soft)] p-3 text-[var(--color-accent)]">
                  <FlaskConical size={20} />
                </div>
                <h3 className="text-base font-bold text-[var(--color-heading)]">
                  {lab.name}
                </h3>
                <p className="text-xs text-[var(--color-text-soft)] leading-relaxed font-medium">
                  {lab.description}
                </p>
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {lab.equipment.map((item) => (
                    <Badge
                      key={item}
                      variant="default"
                      className="bg-[var(--color-surface-soft)] hover:bg-[var(--color-border)] text-[var(--color-text)] text-2xs px-2 py-0.5"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>

                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-600 transition-colors"
                >
                  View Lab Details
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
