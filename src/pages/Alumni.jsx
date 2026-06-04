import { useState, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { GraduationCap, Linkedin, Award, Briefcase, Filter } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";

const NOTABLE_ALUMNI = [
  {
    name: "Dr. Abhay Kumar",
    batch: "Class of 1985",
    role: "Senior Director, R&D",
    company: "Emerson Automation Solutions",
    linkedin: "https://linkedin.com",
    image: "/department-images/dept2.jpg",
    achievement: "Pioneered industrial ethernet implementations for control valves."
  },
  {
    name: "Ms. Radhika Apte",
    batch: "Class of 1998",
    role: "Global Vice President, Systems",
    company: "Honeywell Aerospace",
    linkedin: "https://linkedin.com",
    image: "/department-images/dept3.jpg",
    achievement: "Awarded 'Woman Leader in Avionics' 2024."
  }
];

const ALUMNI_LIST = [
  { name: "Siddharth Joshi", batch: "2015", role: "Process Safety Engineer", company: "Honeywell", linkedin: "https://linkedin.com" },
  { name: "Amit Kulkarni", batch: "2012", role: "Principal Automation Consultant", company: "Emerson", linkedin: "https://linkedin.com" },
  { name: "Pooja Deshpande", batch: "2018", role: "Biomedical Systems Designer", company: "AFMC Research", linkedin: "https://linkedin.com" },
  { name: "Nikhil Patil", batch: "2020", role: "Embedded Systems Developer", company: "Rockwell Automation", linkedin: "https://linkedin.com" },
  { name: "Shreya Shah", batch: "2016", role: "Control Systems Lead", company: "Thermax", linkedin: "https://linkedin.com" },
  { name: "Vikram Mehta", batch: "2011", role: "Director of Automation", company: "Forbes Marshall", linkedin: "https://linkedin.com" },
  { name: "Sneha Rao", batch: "2021", role: "Systems Engineer", company: "TCS", linkedin: "https://linkedin.com" },
  { name: "Anish Meshram", batch: "2019", role: "Senior Controls Engineer", company: "Siemens", linkedin: "https://linkedin.com" }
];

export default function Alumni() {
  useDocumentMetadata({
    title: "Alumni Network",
    description: "Connect with our alumni community. View distinguished alumni, graduation batches, and current industry standings.",
  });

  const [selectedBatch, setSelectedBatch] = useState("All");

  const filteredAlumni = useMemo(() => {
    return ALUMNI_LIST.filter((alumnus) => selectedBatch === "All" || alumnus.batch === selectedBatch);
  }, [selectedBatch]);

  const batchOptions = useMemo(() => {
    const batches = Array.from(new Set(ALUMNI_LIST.map((alumnus) => alumnus.batch)));
    return batches.sort((a, b) => Number(b) - Number(a));
  }, []);

  return (
    <div className="space-y-12 pb-12">
      <PageHeader
        title="Alumni Network"
        description="Our graduates represent the department across global industrial automation, research institutes, and elite technology firms."
      />

      {/* Featured Notable Alumni Showcase */}
      <section className="space-y-6">
        <h3 className="text-lg font-bold text-[var(--color-heading)] flex items-center gap-2">
          <Award size={20} className="text-[var(--color-accent)]" />
          Featured Notable Alumni
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {NOTABLE_ALUMNI.map((alumni) => (
            <Card key={alumni.name} className="border border-[var(--color-border)] bg-white overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="grid gap-4 sm:grid-cols-12">
                <div className="sm:col-span-5 aspect-video sm:aspect-square bg-[var(--color-surface-soft)] border-r border-[var(--color-border)]">
                  <img
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "/faculty_images/image.png"; }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-[var(--color-heading)]">
                        {alumni.name}
                      </h4>
                      <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-soft)] hover:text-[var(--color-highlight)] transition">
                        <Linkedin size={16} />
                      </a>
                    </div>
                    <p className="text-xs text-[var(--color-accent)] font-bold uppercase tracking-wider">
                      {alumni.batch}
                    </p>
                    <p className="text-xs font-semibold text-[var(--color-text)]">
                      {alumni.role} — <span className="text-[var(--color-text-soft)]">{alumni.company}</span>
                    </p>
                    <p className="text-xs text-[var(--color-text-soft)] italic font-medium leading-relaxed pt-2">
                      &ldquo;{alumni.achievement}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Filterable Alumni Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8">
          <h3 className="text-lg font-bold text-[var(--color-heading)] flex items-center gap-2">
            <GraduationCap size={20} className="text-[var(--color-primary)]" />
            Alumni Directory
          </h3>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[var(--color-text-soft)]" />
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Filter by Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Graduation Batches</SelectItem>
                {batchOptions.map((batch) => (
                  <SelectItem key={batch} value={batch}>
                    Class of {batch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredAlumni.map((alumnus) => (
            <Card key={alumnus.name} className="border border-[var(--color-border)] bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition duration-300">
              <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[var(--color-heading)]">
                      {alumnus.name}
                    </h4>
                    <a href={alumnus.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-soft)] hover:text-[var(--color-highlight)] transition">
                      <Linkedin size={14} />
                    </a>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                    Class of {alumnus.batch}
                  </p>
                  <p className="text-xs text-[var(--color-text-soft)] font-medium">
                    {alumnus.role}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--color-text-soft)] pt-1">
                    <Briefcase size={10} />
                    <span>{alumnus.company}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Directory Footer */}
        <div className="text-center text-xs text-[var(--color-text-soft)] border-t border-[var(--color-border)] pt-6">
          Showing {filteredAlumni.length} of {ALUMNI_LIST.length} directory listings
        </div>
      </section>
    </div>
  );
}
