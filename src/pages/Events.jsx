import { useState, useMemo } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Tag } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const EVENT_CATEGORIES = ["All", "Academic", "Student", "Outreach"];

const EVENTS_DATA = [
  {
    title: "National Conference on Process Automation (NCPA-2026)",
    category: "Academic",
    date: "15 June 2026",
    time: "09:00 AM - 05:00 PM",
    venue: "Main Auditorium, COEP Tech",
    description: "Annual conference hosting academic researchers and industrial experts to discuss recent trends in smart grids, PLC-SCADA, and process plants.",
    image: "/department-images/dept2.jpg"
  },
  {
    title: "MESA Induction & Welcome Event",
    category: "Student",
    date: "28 July 2026",
    time: "02:00 PM - 05:30 PM",
    venue: "Department Seminar Hall",
    description: "Welcome address and orientation program for the incoming batch of undergraduate students, conducted by the MESA student committee.",
    image: "/department-images/dept3.jpg"
  },
  {
    title: "Hands-on Workshop on Embedded IoT Controllers",
    category: "Outreach",
    date: "10 August 2026",
    time: "10:00 AM - 04:30 PM",
    venue: "Virtual Lab Simulation Center",
    description: "One-day practical workshop for engineering students on designing control algorithms with ESP32 and industrial sensors.",
    image: "/department-images/dept2.jpg"
  },
  {
    title: "Expert Lecture on Bio-analytical Instrumentation",
    category: "Academic",
    date: "04 September 2026",
    time: "11:00 AM - 01:00 PM",
    venue: "Classroom 402, Shivajinagar",
    description: "Invited research talk by Dr. AFMC Pune directors on recent telemetry developments in heart-rate monitors and clinical systems.",
    image: "/department-images/dept3.jpg"
  }
];

export default function Events() {
  useDocumentMetadata({
    title: "Department Events",
    description: "Keep track of guest lectures, workshops, conferences, and student fests hosted by the department.",
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((ev) => activeCategory === "All" || ev.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Departmental Events"
        description="Stay updated with guest lectures, national conferences, industrial seminars, and MESA activities."
      />

      {/* Category Tabs */}
      <div className="flex justify-center">
        <div className="bg-white border border-[var(--color-border)] p-1 rounded-full shadow-sm max-w-sm w-full">
          <div className="flex justify-between items-center">
            {EVENT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative flex-1 py-2 text-xs font-bold rounded-full transition cursor-pointer ${
                  activeCategory === cat
                    ? "text-[var(--color-primary)] font-black"
                    : "text-[var(--color-text-soft)] hover:text-[var(--color-primary)]"
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {activeCategory === cat && (
                  <Motion.span
                    layoutId="event-tab-bg"
                    className="absolute inset-0 bg-slate-100 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <Motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((ev, index) => (
            <Motion.div
              key={ev.title + index}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border border-[var(--color-border)] bg-white overflow-hidden shadow-sm hover:shadow-md transition h-full flex flex-col justify-between">
                <div>
                  <div className="aspect-video bg-slate-100 border-b border-[var(--color-border)] relative">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-strong)]">
                      {ev.category}
                    </Badge>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-base font-bold text-[var(--color-heading)] leading-tight">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-soft)] leading-relaxed font-medium">
                      {ev.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[var(--color-border)]/50 bg-slate-50/50 space-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-soft)]">
                    <Calendar size={14} className="text-[var(--color-accent)]" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-soft)]">
                    <Clock size={14} className="text-[var(--color-accent)]" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-soft)]">
                    <MapPin size={14} className="text-[var(--color-accent)]" />
                    <span className="truncate">{ev.venue}</span>
                  </div>
                </div>
              </Card>
            </Motion.div>
          ))}
        </AnimatePresence>
      </Motion.div>
    </div>
  );
}
