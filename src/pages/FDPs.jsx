import { useMemo, useState } from "react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Activity, BookOpen, UserCheck } from "lucide-react";
import PdfInteractiveList from "../components/PdfInteractiveList";
import DocumentIntelligencePanel from "../components/DocumentIntelligencePanel";
import fdpAttendedData from "../data/fdpAttended.json";
import fdpConductedData from "../data/fdpConducted.json";
import {
  buildDocumentIntelligence,
  filterIntelligenceDocuments,
  summarizeDocuments,
} from "../lib/documentIntelligence";

function normalizeYearLabel(rawYear) {
  const match = String(rawYear || "").match(/(20\d{2})\s*-\s*(20\d{2}|\d{2})/);
  if (!match) return "Unknown Year";

  const start = Number(match[1]);
  const endRaw = match[2];
  const end =
    endRaw.length === 2
      ? Number(`${String(start).slice(0, 2)}${endRaw}`)
      : Number(endRaw);

  return `${start}-${end}`;
}

function extractYearLabel(page) {
  const lines = `${page.heading}\n${page.text}`
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 20);

  for (const line of lines) {
    const normalized = normalizeYearLabel(line);
    if (normalized !== "Unknown Year") return normalized;
  }

  return "Unknown Year";
}

function extractFacultyLabel(page) {
  const heading = (page.heading || "").trim();
  if (/^(Prof\.|Dr\.|Mrs\.|Mr\.|Ms\.)\s/.test(heading)) {
    return heading;
  }

  const lineMatch = page.text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => /(?:Prof\.|Dr\.|Mrs\.|Mr\.|Ms\.)\s/.test(line));

  if (!lineMatch) return "Unknown Faculty";

  const clean = lineMatch.replace(/^\d+\.?\s*/, "");
  const nameMatch = clean.match(
    /((?:Prof\.|Dr\.|Mrs\.|Mr\.|Ms\.)\s+[A-Za-z.\s]+)/,
  );
  return nameMatch ? nameMatch[1].trim() : "Unknown Faculty";
}

function SectionView({ pages, search }) {
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedFaculty, setSelectedFaculty] = useState("All");

  const preparedPages = useMemo(() => {
    const list = [];
    let lastYear = "Unknown Year";
    let lastFaculty = "Unknown Faculty";

    for (const page of pages) {
      const parsedYear = extractYearLabel(page);
      const parsedFaculty = extractFacultyLabel(page);

      const resolvedYear =
        parsedYear === "Unknown Year" ? lastYear : parsedYear;
      const resolvedFaculty =
        parsedFaculty === "Unknown Faculty" ? lastFaculty : parsedFaculty;

      if (parsedYear !== "Unknown Year") {
        lastYear = parsedYear;
      }
      if (parsedFaculty !== "Unknown Faculty") {
        lastFaculty = parsedFaculty;
      }

      list.push({
        ...page,
        resolvedYear,
        resolvedFaculty,
      });
    }

    return list;
  }, [pages]);

  const yearOptions = useMemo(() => {
    const years = new Set();
    preparedPages.forEach((p) => {
      if (p.resolvedYear && p.resolvedYear !== "Unknown Year") {
        years.add(p.resolvedYear);
      }
    });
    return Array.from(years).sort().reverse();
  }, [preparedPages]);

  const facultyOptions = useMemo(() => {
    const faculty = new Set();
    preparedPages.forEach((p) => {
      if (p.resolvedFaculty && p.resolvedFaculty !== "Unknown Faculty") {
        faculty.add(p.resolvedFaculty);
      }
    });
    return Array.from(faculty).sort();
  }, [preparedPages]);

  const indexedPages = useMemo(
    () =>
      buildDocumentIntelligence(
        preparedPages,
        (page) =>
          `${page.heading}\n${page.text}\n${page.resolvedYear}\n${page.resolvedFaculty}`,
        (page) => page.heading,
      ),
    [preparedPages],
  );

  const filteredPages = useMemo(() => {
    let result = filterIntelligenceDocuments(indexedPages, search);
    if (selectedYear !== "All") {
      result = result.filter((p) => p.resolvedYear === selectedYear);
    }
    if (selectedFaculty !== "All") {
      result = result.filter((p) => p.resolvedFaculty === selectedFaculty);
    }
    return result;
  }, [indexedPages, search, selectedYear, selectedFaculty]);

  const summary = useMemo(
    () => summarizeDocuments(filteredPages),
    [filteredPages],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">
            Year
          </span>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger>
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Years</SelectItem>
              {yearOptions.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">
            Faculty
          </span>
          <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
            <SelectTrigger>
              <SelectValue placeholder="All Faculty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Faculty</SelectItem>
              {facultyOptions.map((f) => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 p-6 shadow-inner transition hover:bg-white hover:shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
            Indexed records
          </p>
          <p className="mt-3 text-3xl font-[var(--font-serif)] text-[var(--color-heading)]">
            {summary.total}
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 p-6 shadow-inner transition hover:bg-white hover:shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
            Topics
          </p>
          <p className="mt-3 text-3xl font-[var(--font-serif)] text-[var(--color-heading)]">
            {summary.tagCount}
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 p-6 shadow-inner transition hover:bg-white hover:shadow-md">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
            Search Mode
          </p>
          <p className="mt-3 text-sm font-semibold text-[var(--color-heading)]">
            Full-Text Search Enabled
          </p>
        </div>
      </div>

      <PdfInteractiveList
        items={filteredPages}
        itemTypeLabel="Sr. No."
        getTitle={(page) => page.heading}
        getSubtitle={() => "FDP record from extracted PDF"}
        getText={(page) => page.text}
        getYearLabel={(page) => page.resolvedYear}
        getFacultyLabel={(page) => page.resolvedFaculty}
        getTags={(page) => page.extractedTags || []}
        emptyTitle="No pages found"
        emptyDescription="Try changing the search keywords or filters."
      />
    </div>
  );
}

export default function FDPs() {
  useDocumentMetadata({
    title: "STTP & FDP Programs",
    description: "Browse the records of Short Term Training Programs (STTP) and Faculty Development Programs (FDP) attended and conducted by the department.",
  });

  const [search, setSearch] = useState("");
  const intelligenceSummary = useMemo(
    () =>
      summarizeDocuments(
        buildDocumentIntelligence(
          [...fdpAttendedData, ...fdpConductedData],
          (page) => `${page.heading}\n${page.text}`,
          (page) => page.heading,
        ),
      ),
    [],
  );

  const summary = useMemo(
    () => ({
      attendedPages: fdpAttendedData.length,
      conductedPages: fdpConductedData.length,
      totalPages: fdpAttendedData.length + fdpConductedData.length,
    }),
    [],
  );

  return (
    <div className="space-y-12 pb-12">
      <section className="overflow-hidden rounded-[var(--radius-container)] border border-[var(--color-border)] border-b-[5px] border-b-[var(--color-highlight)] bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)]">
        <div className="px-8 py-12 lg:px-12 lg:py-14 space-y-10">
          <div className="grid gap-8 lg:grid-cols-[1fr,auto] items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="type"
                  className="bg-[var(--color-primary)] text-white px-4 py-1.5"
                >
                  Professional Development
                </Badge>
                <Badge
                  variant="default"
                  className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border-[var(--color-border)] px-4 py-1.5"
                >
                  Faculty Training
                </Badge>
              </div>

              <h1 className="mt-8 font-[var(--font-serif)] text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-heading)] md:text-6xl">
                STTPs & FDP Records
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
                A detailed record of Short Term Training Programs (STTPs) and
                Faculty Development Programs (FDPs) attended and conducted by the
                department faculty.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-3">
              <BookOpen size={20} className="text-[var(--color-accent)]" />
              <span className="text-sm font-bold text-[var(--color-heading)]">
                {summary.totalPages} records
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-[var(--color-border)] pt-8">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-5 py-5 transition-all hover:bg-white hover:shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                Total Indexed
              </p>
              <p className="mt-3 text-4xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {summary.totalPages}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-5 py-5 transition-all hover:bg-white hover:shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                Attended
              </p>
              <p className="mt-3 text-4xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {summary.attendedPages}
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-highlight)]/20 bg-[var(--color-highlight)]/5 px-5 py-5 transition-all hover:bg-white hover:shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-highlight)]">
                Conducted
              </p>
              <p className="mt-3 text-4xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {summary.conductedPages}
              </p>
            </div>
          </div>
        </div>
      </section>

      <DocumentIntelligencePanel
        title="Search FDP & STTP Records"
        subtitle="Search through the department's Faculty Development Programs (FDP) and Short Term Training Programs (STTP) by faculty, year, or topic."
        summary={intelligenceSummary}
        search={search}
        onSearchChange={setSearch}
        placeholder="Search faculty, year, topic, or keywords..."
      />

      <Tabs defaultValue="attended" className="w-full">
        <div className="mb-8 flex justify-center">
          <TabsList className="bg-[var(--color-surface-soft)] p-1.5 rounded-2xl border border-[var(--color-border)] h-auto">
            <TabsTrigger
              value="attended"
              className="rounded-xl px-8 py-3 text-sm font-bold transition-all data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              FDP Attended
            </TabsTrigger>
            <TabsTrigger
              value="conducted"
              className="rounded-xl px-8 py-3 text-sm font-bold transition-all data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              FDP Conducted
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="attended"
          className="mt-0 ring-0 focus-visible:ring-0 outline-none"
        >
          <SectionView pages={fdpAttendedData} search={search} />
        </TabsContent>

        <TabsContent
          value="conducted"
          className="mt-0 ring-0 focus-visible:ring-0 outline-none"
        >
          <SectionView pages={fdpConductedData} search={search} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
