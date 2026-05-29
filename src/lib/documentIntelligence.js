const DOMAIN_TAGS = [
  {
    terms: ["control", "controller", "feedback", "pid", "sliding mode"],
    tag: "Control Systems",
  },
  {
    terms: ["sensor", "instrumentation", "measurement", "calibration"],
    tag: "Instrumentation",
  },
  {
    terms: ["power", "converter", "drive", "battery", "solar"],
    tag: "Power Electronics",
  },
  {
    terms: ["machine learning", "deep learning", "ai", "neural"],
    tag: "Intelligent Systems",
  },
  { terms: ["biomedical", "health", "ecg", "medical"], tag: "Biomedical" },
  { terms: ["robot", "robotics", "autonomous", "vehicle"], tag: "Robotics" },
  {
    terms: ["fdp", "sttp", "workshop", "training"],
    tag: "Faculty Development",
  },
  { terms: ["mom", "minutes", "meeting"], tag: "Governance" },
  {
    terms: ["timetable", "time table", "schedule", "class"],
    tag: "Academic Schedule",
  },
  { terms: ["deadline", "submission", "notice", "circular"], tag: "Deadline" },
];

function normalize(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function deriveTags(text) {
  const lower = normalize(text).toLowerCase();
  return unique(
    DOMAIN_TAGS.flatMap(({ terms, tag }) =>
      terms.some((term) => lower.includes(term)) ? [tag] : [],
    ),
  );
}

function deriveDocumentType(text) {
  const lower = normalize(text).toLowerCase();

  if (lower.includes("timetable") || lower.includes("time table"))
    return "Timetable";
  if (lower.includes("minutes") || lower.includes("mom")) return "MoM";
  if (lower.includes("deadline") || lower.includes("submission"))
    return "Deadline";
  if (lower.includes("fdp") || lower.includes("sttp")) return "FDP / STTP";
  if (lower.includes("conference")) return "Conference";
  if (lower.includes("journal")) return "Journal";
  if (lower.includes("book") || lower.includes("chapter"))
    return "Book / Chapter";
  return "Document";
}

function findYear(text) {
  const match = String(text || "").match(
    /(20\d{2})(?:\s*[-/]\s*(20\d{2}|\d{2}))?/,
  );
  if (!match) return null;

  if (!match[2]) return match[1];

  const start = Number(match[1]);
  const endRaw = match[2];
  const end =
    endRaw.length === 2
      ? Number(`${String(start).slice(0, 2)}${endRaw}`)
      : Number(endRaw);
  return `${start}-${end}`;
}

function toUtcStamp(dateValue) {
  const date = new Date(dateValue);
  const year = String(date.getUTCFullYear()).padStart(4, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

export function buildDocumentIntelligence(documents, getText, getTitle) {
  return documents.map((document, index) => {
    const title = normalize(
      getTitle?.(document) ??
        document.title ??
        document.heading ??
        `Document ${index + 1}`,
    );
    const text = normalize(getText?.(document) ?? document.text ?? "");
    const year = findYear(`${title} ${text}`) || document.year || "Unknown";
    const tags = deriveTags(`${title} ${text}`);

    return {
      ...document,
      title,
      extractedYear: year,
      extractedTags: tags,
      documentType: deriveDocumentType(`${title} ${text}`),
      searchBlob: `${title} ${text} ${year} ${tags.join(" ")}`.toLowerCase(),
    };
  });
}

export function filterIntelligenceDocuments(documents, query) {
  const normalizedQuery = normalize(query).toLowerCase();
  if (!normalizedQuery) return documents;

  return documents.filter((document) =>
    document.searchBlob.includes(normalizedQuery),
  );
}

export function createIcsContent(event) {
  const start = toUtcStamp(event.start);
  const end = toUtcStamp(
    event.end || new Date(new Date(event.start).getTime() + 60 * 60 * 1000),
  );
  const uid = `${normalize(event.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}-${start}@coep`;
  const description = normalize(
    event.description || event.notes || event.category || "",
  );
  const location = normalize(event.location || "");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//COEP Instrumentation//Department Website//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${normalize(event.title)}`,
    description ? `DESCRIPTION:${description}` : null,
    location ? `LOCATION:${location}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function createGoogleCalendarUrl(event) {
  const start = toUtcStamp(event.start);
  const end = toUtcStamp(
    event.end || new Date(new Date(event.start).getTime() + 60 * 60 * 1000),
  );
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: normalize(event.title),
    dates: `${start}/${end}`,
    details: normalize(
      event.description || event.notes || event.category || "",
    ),
    location: normalize(event.location || ""),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.rel = "noreferrer";
  link.click();

  URL.revokeObjectURL(url);
}

export function summarizeDocuments(documents) {
  const tags = new Map();
  const types = new Map();

  for (const document of documents) {
    for (const tag of document.extractedTags || []) {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    }

    types.set(
      document.documentType,
      (types.get(document.documentType) || 0) + 1,
    );
  }

  return {
    total: documents.length,
    tagCount: tags.size,
    topTags: Array.from(tags.entries())
      .sort((first, second) => second[1] - first[1])
      .slice(0, 6)
      .map(([tag, count]) => ({ tag, count })),
    topTypes: Array.from(types.entries())
      .sort((first, second) => second[1] - first[1])
      .slice(0, 4)
      .map(([type, count]) => ({ type, count })),
    latestYear: documents.reduce((latest, document) => {
      const year = String(document.extractedYear || "");
      return year > latest ? year : latest;
    }, ""),
  };
}
