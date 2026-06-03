import { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, Trophy, Sparkles, BookOpen } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";

const ACHIEVEMENTS_CATEGORIES = ["All", "Student", "Faculty"];

const ACHIEVEMENTS_DATA = [
  {
    title: "AIR 15 in GATE 2025 (Instrumentation Engineering)",
    category: "Student",
    description: "Final year student Nikhil Patil secured All India Rank 15 in the Graduate Aptitude Test in Engineering (GATE) 2025.",
    badge: "GATE Ranker",
    icon: Trophy
  },
  {
    title: "Best Faculty Researcher Award 2024",
    category: "Faculty",
    description: "Dr. Abhay Kumar received the University Research Excellence Award for sponsoring control projects and publishing papers in IEEE journals.",
    badge: "IEEE Recognition",
    icon: Award
  },
  {
    title: "First Prize at Smart India Hackathon (SIH-2024)",
    category: "Student",
    description: "A team of six students from the department won the first prize of Rs 1 Lakh for building an automated crop monitoring drone using sensors.",
    badge: "SIH Winner",
    icon: Sparkles
  },
  {
    title: "Consultancy Milestone with Bhabha Atomic Research Centre",
    category: "Faculty",
    description: "Successful delivery and commissioning of specialized radiation sensor signal conditioning modules for reactor security control loops.",
    badge: "Govt Project",
    icon: ShieldCheck
  }
];

export default function Achievements() {
  useDocumentMetadata({
    title: "Achievements",
    description: "Discover national and international awards, hackathon victories, and academic accomplishments of our students and faculty.",
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredAchievements = ACHIEVEMENTS_DATA.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Departmental Achievements"
        description="Celebrating milestones in academic research, national competitions, hackathons, and institutional credentials."
      />

      {/* Category Tabs */}
      <div className="flex justify-center">
        <div className="bg-white border border-[var(--color-border)] p-1 rounded-full shadow-sm max-w-xs w-full">
          <div className="flex justify-between items-center">
            {ACHIEVEMENTS_CATEGORIES.map((cat) => (
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
                    layoutId="achievement-tab-bg"
                    className="absolute inset-0 bg-slate-100 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <Motion.div layout className="grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredAchievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <Motion.div
                key={item.title + index}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border border-[var(--color-border)] bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition duration-300 h-full">
                  <CardContent className="p-6 space-y-4 flex flex-col justify-between h-full">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex rounded-xl bg-[var(--color-primary-soft)] p-3 text-[var(--color-primary)]">
                          <Icon size={20} />
                        </div>
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-2xs font-bold text-amber-700 ring-1 ring-amber-600/10">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[var(--color-heading)] leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[var(--color-text-soft)] leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Motion.div>
            );
          })}
        </AnimatePresence>
      </Motion.div>
    </div>
  );
}
