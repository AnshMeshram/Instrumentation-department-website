import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Construction, LayoutDashboard, Clock } from "lucide-react";

export default function PlaceholderPage({ title, description }) {
  return (
    <div className="space-y-12 pb-12">
      <section className="overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="px-8 py-12 lg:px-12 lg:py-16 relative">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="type" className="bg-[var(--color-primary)] text-white px-4 py-1.5">Module Pending</Badge>
            <Badge variant="default" className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border-[var(--color-border)] px-4 py-1.5 flex items-center gap-2">
               <Clock size={12} />
               Coming Soon
            </Badge>
          </div>

          <h1 className="mt-8 font-[var(--font-serif)] text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-6xl max-w-3xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
            {description}
          </p>
          
          <div className="mt-12 flex flex-wrap gap-6">
             <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border)]">
                <div className="h-10 w-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                   <Construction size={20} />
                </div>
                <span className="text-sm font-bold text-[var(--color-heading)]">Module Implementation Ongoing</span>
             </div>
             <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border)]">
                <div className="h-10 w-10 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                   <LayoutDashboard size={20} />
                </div>
                <span className="text-sm font-bold text-[var(--color-heading)]">Portal Synchronization Pending</span>
             </div>
          </div>
        </div>
      </section>

      <Card className="border-dashed border-2 border-[var(--color-border)] bg-[var(--color-surface-soft)]/30 rounded-[2.5rem]">
         <CardContent className="p-16 text-center">
            <div className="mx-auto h-20 w-20 rounded-3xl bg-white shadow-xl flex items-center justify-center text-[var(--color-accent)] mb-8">
               <Construction size={40} />
            </div>
            <h2 className="text-2xl font-black text-[var(--color-heading)]">Information Repository Synchronization</h2>
            <p className="mt-4 max-w-xl mx-auto text-[var(--color-text-soft)] font-medium">
               This database module is currently being populated with verified departmental records. 
               The content will be automatically synchronized upon validation by the administrative board.
            </p>
         </CardContent>
      </Card>
    </div>
  );
}
