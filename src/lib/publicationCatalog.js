const MONTH_PATTERN =
  /(January|February|March|April|May|June|July|August|September|October|November|December)/i;

const VENUE_PATTERN =
  /(journal|conference|proceedings|transactions|letters|review|arxiv|publisher:|ieee|springer|elsevier|sage publications|international journal|international conference|book|chapter|patent office|technology and health care|engineering, technology & applied science research)/i;

const BOILERPLATE_PATTERN =
  /^(sr\.|no\.?|authors|title of the publication|name of the international|year|summary:|pages:|volume:|publisher:|prof\.|dr\.|mrs\.|mr\.|ms\.)/i;

const INVALID_FACULTY_PATTERN =
  /^(sr\.?|no\.?|pages?:|volume:|summary:?|information processing|electronics and informatics|conference|journal)$/i;

const FACULTY_ALIASES = [
  {
    canonical: "Prof. S. D. Agashe",
    pattern: /(?:s\.?\s*d\.?\s*agashe|sudhir\s+d\.?\s+agashe)/i,
  },
  {
    canonical: "Prof. S. L. Patil",
    pattern: /(?:s\.?\s*l\.?\s*patil|sanjaykumar\s+l\s+patil)/i,
  },
  {
    canonical: "Prof. C. Y. Patil",
    pattern: /(?:c\.?\s*y\.?\s*patil|chetankumar\s+y\s+patil|chetan\s+patil)/i,
  },
  {
    canonical: "Prof. R. D. Kokate",
    pattern: /(?:r\.?\s*d\.?\s*kokate|rajendra\s+d\s+kokate)/i,
  },
  {
    canonical: "Prof. P. D. Shendge",
    pattern: /(?:p\.?\s*d\.?\s*shendge|pramod\s+d\s+shendge)/i,
  },
  {
    canonical: "Prof. D. N. Sonawane",
    pattern:
      /(?:d\.?\s*n\.?\s*sonawane|dayaram\s+n\s+sonawane|dayaram\s+sonawane)/i,
  },
  {
    canonical: "Prof. R. P. Mudhalwadkar",
    pattern:
      /(?:r\.?\s*p\.?\s*mudhalwadkar|rohini\s+p\s+mudhalwadkar|rohini\s+mudhalwadkar)/i,
  },
  {
    canonical: "Prof. U. M. Chaskar",
    pattern: /(?:u\.?\s*m\.?\s*chaskar|uttam\s+m\s+chaskar|uttam\s+chaskar)/i,
  },
  {
    canonical: "Prof. M. A. Khandekar",
    pattern: /(?:m\.?\s*a\.?\s*khandekar|meera\s+a\s+khandekar)/i,
  },
  {
    canonical: "Prof. S. S. Korde (Ketaki Ghodinde)",
    pattern: /(?:s\.?\s*s\.?\s*korde|ketaki\s+ghodinde)/i,
  },
  {
    canonical: "Prof. K. A. Bhole",
    pattern: /(?:k\.?\s*a\.?\s*bhole|kalyani\s+bhole)/i,
  },
  {
    canonical: "Prof. A. S. Deshpande",
    pattern:
      /(?:a\.?\s*s\.?\s*deshpande|amruta\s+s\s+deshpande|amruta\s+deshpande)/i,
  },
  {
    canonical: "Prof. G. V. Lakhekar",
    pattern: /(?:g\.?\s*v\.?\s*lakhekar|girish\s+v(?:ithalrao)?\s+lakhekar)/i,
  },
];

function normalizeFacultyLabel(value) {
  return String(value || "")
    .replace(/[,:;\s]+$/u, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isInvalidFacultyLabel(value) {
  const normalized = normalizeFacultyLabel(value);
  if (!normalized) return true;
  if (INVALID_FACULTY_PATTERN.test(normalized)) return true;
  if (/^\d/.test(normalized)) return true;
  if (normalized.split(" ").length < 2) return true;
  return false;
}

function extractCanonicalFaculty(value) {
  const text = String(value || "");
  for (const alias of FACULTY_ALIASES) {
    if (alias.pattern.test(text)) {
      return alias.canonical;
    }
  }

  return "";
}

function splitLines(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function normalizeYearLabel(rawValue) {
  const normalized = String(rawValue || "")
    .replace(/[–—−â]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  const match = normalized.match(/^((?:20\d{2}))\s*-\s*((?:20\d{2})|\d{2})$/);
  if (!match) return "";

  const start = match[1];
  const endRaw = match[2];
  const end = endRaw.length === 2 ? `${start.slice(0, 2)}${endRaw}` : endRaw;
  if (Number(end) !== Number(start) + 1) return "";
  return `${start}-${end}`;
}

function extractFacultyFromHeading(heading) {
  const cleanHeading = normalizeFacultyLabel(heading);
  const canonicalFromHeading = extractCanonicalFaculty(cleanHeading);
  if (canonicalFromHeading) return canonicalFromHeading;

  if (
    /^(Prof\.|Dr\.|Mrs\.|Mr\.|Ms\.)\s/i.test(cleanHeading) &&
    !isInvalidFacultyLabel(cleanHeading)
  ) {
    return cleanHeading;
  }

  return "Unknown Faculty";
}

function extractFacultyFromText(lines) {
  const textBlob = lines.slice(0, 30).join(" ");
  const canonical = extractCanonicalFaculty(textBlob);
  if (canonical) return canonical;

  for (const line of lines.slice(0, 12)) {
    if (/^(Prof\.|Dr\.|Mrs\.|Mr\.|Ms\.)\s/i.test(line)) {
      const normalized = normalizeFacultyLabel(line);
      if (!isInvalidFacultyLabel(normalized)) {
        return normalized;
      }
    }
  }

  return "Unknown Faculty";
}

function extractSessionYear(lines) {
  for (const line of lines) {
    const year = normalizeYearLabel(line);
    if (year) return year;
  }

  return "Unknown Year";
}

function isBoilerplateLine(line) {
  return BOILERPLATE_PATTERN.test(line);
}

function isYearLine(line) {
  return Boolean(normalizeYearLabel(line));
}

function looksLikeVenueLine(line) {
  return VENUE_PATTERN.test(line);
}

function looksLikeAuthorContinuation(line) {
  if (!line) return false;
  if (isYearLine(line) || looksLikeVenueLine(line) || isBoilerplateLine(line)) {
    return false;
  }

  if (line.includes(",")) return true;
  if (/\b(?:Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.)\b/i.test(line)) return true;
  if (/\b[A-Z]\.(?:\s+[A-Z]\.){0,4}\b/.test(line)) return true;

  return false;
}

function extractPublicationUrl(text, title) {
  const rawText = String(text || "");

  const urlMatch = rawText.match(/https?:\/\/[^\s)\]]+/i);
  if (urlMatch) return urlMatch[0].replace(/[.,;]+$/, "");

  const doiMatch = rawText.match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
  if (doiMatch) return `https://doi.org/${doiMatch[0].replace(/[.,;]+$/, "")}`;

  const arxivMatch = rawText.match(/arXiv:(\d{4}\.\d{4,5})(v\d+)?/i);
  if (arxivMatch) {
    return `https://arxiv.org/abs/${arxivMatch[1]}`;
  }

  const query = encodeURIComponent(String(title || rawText).slice(0, 180));
  return `https://scholar.google.com/scholar?q=${query}`;
}

function extractPublishedOn(text) {
  const matches = String(text || "").match(
    new RegExp(`${MONTH_PATTERN.source}\\s+20\\d{2}`, "ig"),
  );
  if (matches && matches.length) {
    return matches[matches.length - 1].replace(/\s+/g, " ").trim();
  }

  return "";
}

function detectCategory(text) {
  const rawText = String(text || "");
  if (/patent/i.test(rawText)) return "Patent";
  if (/book|chapter|select proceedings/i.test(rawText)) return "Book/Chapter";
  if (
    /conference|proceedings|icc|icca|i2ct|conit|globconet|icacrs|iccie|iconat/i.test(
      rawText,
    )
  ) {
    return "Conference";
  }
  if (
    /journal|transactions|letters|review|arxiv|engineering, technology & applied science research/i.test(
      rawText,
    )
  ) {
    return "Journal";
  }

  return "Other";
}

function isTitleLikeLine(line) {
  if (!line) return false;
  if (isYearLine(line) || looksLikeVenueLine(line) || isBoilerplateLine(line))
    return false;
  if (line.length < 12) return false;
  return true;
}

function cleanExtractedTitle(title, authors) {
  let cleanedTitle = String(title || "").trim();
  const authorCandidates = String(authors || "")
    .split(",")
    .map((author) => author.trim())
    .filter(Boolean)
    .sort((first, second) => second.length - first.length);

  for (const author of authorCandidates) {
    if (
      cleanedTitle.startsWith(`${author} `) &&
      cleanedTitle.length > author.length + 12
    ) {
      cleanedTitle = cleanedTitle.slice(author.length).trim();
      break;
    }
  }

  return cleanedTitle;
}

function parseBlock(block, fallbackFaculty, fallbackYear) {
  const lines = block.lines.filter((line) => !isBoilerplateLine(line));
  if (!lines.length) return null;

  const normalizedText = lines.join(" ");
  const venueStartIndex = lines.findIndex(
    (line, index) => index > 0 && looksLikeVenueLine(line),
  );
  const frontLines =
    venueStartIndex >= 0 ? lines.slice(0, venueStartIndex) : lines.slice();
  const venueLines = venueStartIndex >= 0 ? lines.slice(venueStartIndex) : [];

  let authorEndIndex = 0;
  for (let index = 0; index < frontLines.length; index += 1) {
    const line = frontLines[index];

    if (index === 0) {
      authorEndIndex = 1;
      continue;
    }

    if (looksLikeAuthorContinuation(line)) {
      authorEndIndex = index + 1;
      continue;
    }

    if (isTitleLikeLine(line)) {
      break;
    }
  }

  const authors = frontLines
    .slice(0, Math.max(1, authorEndIndex))
    .join(" ")
    .replace(/^\d+\.\s*/, "")
    .trim();
  const inferredTitle = frontLines
    .slice(Math.max(1, authorEndIndex))
    .join(" ")
    .trim();
  const title =
    inferredTitle ||
    authors ||
    `Publication details unavailable in source text (Entry ${block.id})`;
  const normalizedAuthors =
    authors || "Authors not clearly identified in source text";
  const cleanedTitle = cleanExtractedTitle(title, normalizedAuthors);
  const venue = venueLines
    .filter((line) => !isYearLine(line))
    .join(" ")
    .trim();
  const publishedOn = extractPublishedOn(normalizedText);
  const sessionYear = block.year || fallbackYear || "Unknown Year";
  const facultyCandidate =
    block.faculty || fallbackFaculty || "Unknown Faculty";
  const faculty =
    extractCanonicalFaculty(`${facultyCandidate} ${normalizedText}`) ||
    (isInvalidFacultyLabel(facultyCandidate)
      ? "Unknown Faculty"
      : facultyCandidate);

  return {
    id: block.id,
    faculty,
    sessionYear,
    category: detectCategory(normalizedText),
    title: cleanedTitle,
    authors: normalizedAuthors,
    venue,
    publishedOn,
    publicationUrl: extractPublicationUrl(normalizedText, cleanedTitle),
    rawText: normalizedText,
    sourcePage: block.pageId,
  };
}

export function buildPublicationCatalog(pages) {
  const records = [];
  let currentFaculty = "Unknown Faculty";
  let currentYear = "Unknown Year";
  let currentBlock = null;

  function finalizeCurrentBlock() {
    if (!currentBlock) return;

    const parsed = parseBlock(currentBlock, currentFaculty, currentYear);
    if (parsed) {
      records.push(parsed);
    }

    currentBlock = null;
  }

  for (const page of pages) {
    const lines = splitLines(page.text);
    const headingFaculty = extractFacultyFromHeading(page.heading);
    const textFaculty = extractFacultyFromText(lines);

    if (headingFaculty !== "Unknown Faculty") {
      currentFaculty = headingFaculty;
    } else if (textFaculty !== "Unknown Faculty") {
      currentFaculty = textFaculty;
    }

    for (const line of lines) {
      if (isBoilerplateLine(line)) {
        continue;
      }

      if (/^\d{1,2}\.\s+/.test(line)) {
        finalizeCurrentBlock();
        currentBlock = {
          id: page.id,
          pageId: page.id,
          faculty: currentFaculty,
          year: currentYear,
          lines: [line],
        };
        continue;
      }

      const yearLabel = normalizeYearLabel(line);
      if (yearLabel) {
        currentYear = yearLabel;
        continue;
      }

      if (currentBlock) {
        currentBlock.lines.push(line);
      }
    }
  }

  finalizeCurrentBlock();

  return records
    .filter((record) => {
      const isPlaceholderTitle = /Publication details unavailable/i.test(
        record.title,
      );
      const isPlaceholderAuthor = /Authors not clearly identified/i.test(
        record.authors,
      );

      return !(isPlaceholderTitle && isPlaceholderAuthor);
    })
    .map((record, index) => ({
      ...record,
      serialNumber: index + 1,
    }));
}

export function getPublicationOptions(publications) {
  const years = new Set();
  const faculties = new Set();
  const authors = new Set();
  const categories = new Set();

  for (const publication of publications) {
    if (publication.sessionYear && publication.sessionYear !== "Unknown Year") {
      years.add(publication.sessionYear);
    }
    if (publication.faculty && publication.faculty !== "Unknown Faculty") {
      faculties.add(publication.faculty);
    }
    if (publication.authors) {
      authors.add(publication.authors.split(",")[0].trim());
    }
    if (publication.category) {
      categories.add(publication.category);
    }
  }

  return {
    yearOptions: Array.from(years).sort().reverse(),
    facultyOptions: Array.from(faculties).sort(),
    authorOptions: Array.from(authors).sort(),
    categoryOptions: Array.from(categories).sort(),
  };
}
