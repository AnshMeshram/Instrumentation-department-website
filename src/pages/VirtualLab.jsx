import React from "react";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Activity, Cpu, GitBranch, Layout, PlayCircle } from "lucide-react";

export default function VirtualLab() {
  return (
    <div className="space-y-12 pb-12">
      <PageHeader
        title="Virtual Laboratory"
        subtitle="Exploring Closed-Loop Control Systems through interactive simulation and technical analysis."
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Aim & Objective */}
        <div className="space-y-8 lg:col-span-1">
          <Card className="border-none bg-white shadow-sm overflow-hidden">
            <div className="h-2 bg-[var(--color-accent)]" />
            <CardContent className="p-8">
              <div className="flex items-center gap-3 text-[var(--color-accent)] mb-6">
                <PlayCircle size={24} />
                <h2 className="text-xl font-bold font-[var(--font-serif)]">Aim & Objective</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[var(--color-heading)] mb-3">Primary Aim</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-soft)] font-medium">
                    To analyze and implement a closed-loop control system using Pulse Width Modulation (PWM) 
                    for precise speed and position control in industrial actuators.
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[var(--color-heading)] mb-3">Key Objectives</h3>
                  <ul className="space-y-3">
                    {[
                      "Understand PWM signal generation and its effect on motor torque.",
                      "Implement a feedback mechanism using rotary encoders.",
                      "Compare open-loop vs. closed-loop stability and error margins.",
                      "Evaluate system response using digital oscilloscopes."
                    ].map((obj, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[var(--color-text-soft)] font-medium">
                        <span className="text-[var(--color-accent)] font-bold">0{i+1}</span>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-black text-white shadow-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 text-[var(--color-accent)] mb-6">
                <Cpu size={24} />
              <h2 className="text-xl font-bold font-[var(--font-serif)] !text-white">System Working</h2>
            </div>
              <p className="text-sm leading-relaxed text-white/80 font-medium">
                The system operates by continuously comparing the <strong>Set Point (SP)</strong> 
                with the <strong>Process Variable (PV)</strong>. The resulting error signal is 
                processed by the PID controller to adjust the PWM duty cycle, thereby 
                minimizing the steady-state error.
              </p>
              <div className="mt-8 space-y-4">
                <Badge className="bg-white/10 text-[var(--color-accent)] border-none px-3 py-1">PWM Frequency: 25kHz</Badge>
                <Badge className="bg-white/10 text-[var(--color-highlight)] border-none px-3 py-1 ml-2">Sampling Rate: 1ms</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Diagrams & Waveforms */}
        <div className="space-y-8 lg:col-span-2">
          {/* Working Flow Diagram */}
          <Card className="border-none bg-white shadow-sm overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 text-[var(--color-accent)] mb-8">
                <GitBranch size={24} />
                <h2 className="text-xl font-bold font-[var(--font-serif)]">Working Flow Diagram</h2>
              </div>
              
              <div className="relative flex flex-col items-center gap-8 py-10">
                <div className="flex flex-col items-center">
                  <div className="rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface-soft)] px-6 py-4 font-bold text-[var(--color-heading)] shadow-sm">
                    START: Reference Input
                  </div>
                  <div className="h-8 w-0.5 bg-[var(--color-border-strong)]" />
                  <div className="rounded-full bg-[var(--color-accent)] p-3 text-white shadow-lg">
                    <Activity size={20} />
                  </div>
                  <div className="h-8 w-0.5 bg-[var(--color-border-strong)]" />
                  <div className="rounded-xl border-2 border-[var(--color-primary)] bg-white px-6 py-4 font-bold text-[var(--color-primary)] shadow-sm">
                    Error Comparator (SP - PV)
                  </div>
                  <div className="h-8 w-0.5 bg-[var(--color-border-strong)]" />
                  <div className="rounded-xl border-2 border-[var(--color-highlight)] bg-white px-6 py-4 font-bold text-[var(--color-highlight)] shadow-sm">
                    PID Control Logic
                  </div>
                  <div className="h-8 w-0.5 bg-[var(--color-border-strong)]" />
                  <div className="rounded-xl border-2 border-black bg-black px-6 py-4 font-bold text-white shadow-xl">
                    PWM Output (Duty Cycle Adjusted)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Waveforms & Circuit */}
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-none bg-white shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 text-[var(--color-accent)] mb-6">
                  <Layout size={20} />
                  <h2 className="text-lg font-bold font-[var(--font-serif)]">PWM Waveform</h2>
                </div>
                <div className="h-40 w-full bg-[var(--color-surface-soft)] rounded-lg flex items-center justify-center relative overflow-hidden">
                   {/* CSS Styled PWM Waveform */}
                   <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="w-full h-20 flex items-end gap-1">
                        {[1, 0, 1, 0, 1, 0, 1, 0].map((v, i) => (
                          <div 
                            key={i} 
                            className={`flex-1 ${v ? 'bg-[var(--color-accent)] h-full' : 'bg-transparent h-0.5 border-t-2 border-[var(--color-border-strong)]'}`}
                            style={{ width: v ? '40%' : '10%' }}
                          />
                        ))}
                      </div>
                   </div>
                   <span className="absolute bottom-2 right-4 text-[10px] font-bold text-[var(--color-text-soft)] uppercase tracking-widest">50% Duty Cycle</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-white shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 text-[var(--color-highlight)] mb-6">
                  <Activity size={20} />
                  <h2 className="text-lg font-bold font-[var(--font-serif)] text-[var(--color-heading)]">Output Response</h2>
                </div>
                <div className="h-40 w-full bg-[var(--color-surface-soft)] rounded-lg flex items-center justify-center relative overflow-hidden">
                   {/* CSS Styled Sine Waveform */}
                   <div className="absolute inset-0 p-4">
                      <svg viewBox="0 0 100 40" className="w-full h-full">
                        <path 
                          d="M0 20 Q 12.5 0, 25 20 T 50 20 T 75 20 T 100 20" 
                          fill="none" 
                          stroke="var(--color-highlight)" 
                          strokeWidth="2"
                        />
                      </svg>
                   </div>
                   <span className="absolute bottom-2 right-4 text-[10px] font-bold text-[var(--color-text-soft)] uppercase tracking-widest">Steady State Reached</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
