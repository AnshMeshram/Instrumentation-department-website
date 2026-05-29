import { useMemo, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
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
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            Year
          </span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-heading)] outline-none focus:border-[var(--color-accent)]"
          >
            <option value="All">All Years</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-text-soft)]">
            Faculty
          </span>
          <select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-heading)] outline-none focus:border-[var(--color-accent)]"
          >
            <option value="All">All Faculty</option>
            {facultyOptions.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 p-6 shadow-inner transition hover:bg-white hover:shadow-md">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
            Indexed records
          </p>
          <p className="mt-3 text-3xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
            {summary.total}
          </p>
        </div>
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 p-6 shadow-inner transition hover:bg-white hover:shadow-md">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
            Auto-tags
          </p>
          <p className="mt-3 text-3xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
            {summary.tagCount}
          </p>
        </div>
        <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 p-6 shadow-inner transition hover:bg-white hover:shadow-md">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
            Inferred mode
          </p>
          <p className="mt-3 text-sm font-semibold text-[var(--color-heading)]">
            Full-text PDF retrieval
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
      <section className="overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full -mr-32 -mt-32 blur-3xl" />

        <div className="grid gap-12 px-8 py-12 lg:grid-cols-[1.3fr,0.7fr] lg:px-12 lg:py-16 relative">
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
              STTPs & <br />
              FDP Records
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-soft)] font-medium">
              A detailed record of Short Term Training Programs (STTPs) and
              Faculty Development Programs (FDPs) attended and conducted by the
              department faculty.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-3 transition-all hover:bg-white hover:shadow-md group">
                <BookOpen
                  size={20}
                  className="text-[var(--color-accent)] group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-bold text-[var(--color-heading)]">
                  {summary.totalPages} total records
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-6 py-3 transition-all hover:bg-white hover:shadow-md group">
                <UserCheck
                  size={20}
                  className="text-[var(--color-accent)] group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-bold text-[var(--color-heading)]">
                  Validated Certification
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 px-8 py-8 shadow-inner transition-all hover:bg-white hover:shadow-md group">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
                Program Aggregate
              </p>
              <p className="mt-4 text-5xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                {summary.totalPages}
              </p>
              <p className="mt-2 text-[10px] font-bold text-[var(--color-accent)] uppercase">
                Total Indexed
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[2rem] border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-6 py-6 shadow-inner transition-all hover:bg-white hover:shadow-md group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                  Attended
                </p>
                <p className="mt-2 text-3xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                  {summary.attendedPages}
                </p>
              </div>
              <div className="rounded-[2rem] border border-[var(--color-highlight)]/20 bg-[var(--color-highlight)]/5 px-6 py-6 shadow-inner transition-all hover:bg-white hover:shadow-md group">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-highlight)]">
                  Conducted
                </p>
                <p className="mt-2 text-3xl font-black font-[var(--font-serif)] text-[var(--color-heading)]">
                  {summary.conductedPages}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DocumentIntelligencePanel
        title="FDP records with extracted metadata"
        subtitle="The PDF corpus is now indexed for full-text search, inferred year/faculty grouping, and auto-tagging across the extracted text."
        summary={intelligenceSummary}
        search={search}
        onSearchChange={setSearch}
        placeholder="Search faculty, year, topic, or extracted PDF text..."
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
