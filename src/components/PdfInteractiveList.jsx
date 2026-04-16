import { Fragment, useMemo, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function splitLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function previewText(text, maxLines = 4) {
  const lines = splitLines(text);
  return lines.slice(0, maxLines).join(" • ");
}

function yearSortValue(yearLabel) {
  const match = String(yearLabel || "").match(/(20\d{2})/);
  return match ? Number(match[1]) : 0;
}

function DetailGrid({ text }) {
  const lines = useMemo(() => splitLines(text), [text]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Expanded text
        </p>
        <p className="text-xs text-slate-400">{lines.length} lines</p>
      </div>

      <div className="max-h-112 overflow-auto pr-1">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {lines.map((line, index) => (
            <div
              key={`${line}-${index}`}
              className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700"
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PdfInteractiveList({
  items,
  getTitle,
  getSubtitle,
  getText,
  getYearLabel,
  getFacultyLabel,
  emptyTitle,
  emptyDescription,
  itemTypeLabel = "Sr. No.",
}) {
  const [openId, setOpenId] = useState(null);

  const groupedItems = useMemo(() => {
    if (!getYearLabel || !getFacultyLabel) return null;

    const yearMap = new Map();

    for (const item of items) {
      const year = getYearLabel(item) || "Unknown Year";
      const faculty = getFacultyLabel(item) || "Unknown Faculty";

      if (!yearMap.has(year)) {
        yearMap.set(year, new Map());
      }

      const facultyMap = yearMap.get(year);
      if (!facultyMap.has(faculty)) {
        facultyMap.set(faculty, []);
      }

      facultyMap.get(faculty).push(item);
    }

    return Array.from(yearMap.entries())
      .sort((a, b) => yearSortValue(b[0]) - yearSortValue(a[0]))
      .map(([year, facultyMap]) => ({
        year,
        faculties: Array.from(facultyMap.entries())
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([faculty, facultyItems]) => ({
            faculty,
            items: facultyItems,
          })),
      }));
  }, [getFacultyLabel, getYearLabel, items]);

  function renderRows(rowItems) {
    return rowItems.map((item, index) => {
      const isOpen = openId === item.id;
      const title = getTitle(item);
      const subtitle = getSubtitle(item);
      const text = getText(item);

      return (
        <Fragment key={item.id}>
          <tr className="align-top transition hover:bg-[#f9fafb]">
            <td className="px-4 py-4 text-slate-800">{index + 1}</td>
            <td className="max-w-xs px-4 py-4 font-medium leading-6 text-slate-900">
              <div>{title}</div>
              {subtitle ? (
                <div className="mt-1 text-xs font-normal text-slate-500">
                  {subtitle}
                </div>
              ) : null}
            </td>
            <td className="max-w-md px-4 py-4 text-slate-700">
              {previewText(text)}
            </td>
            <td className="px-4 py-4 text-right">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="inline-flex items-center gap-2 rounded-full border border-[#cfe0f4] bg-[#edf4fd] px-3 py-2 text-xs font-semibold text-[#1a3f70] transition hover:bg-[#e0ecfb]"
              >
                {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                {isOpen ? "Close" : "Open"}
              </button>
            </td>
          </tr>

          {isOpen ? (
            <tr>
              <td colSpan={4} className="bg-[#fafcff] px-4 py-4">
                <DetailGrid text={text} />
              </td>
            </tr>
          ) : null}
        </Fragment>
      );
    });
  }

  if (!items.length) {
    return (
      <section className="rounded-xl border border-[#e5e7eb] bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-[#0f2f66]">{emptyTitle}</h2>
        <p className="mt-2 text-sm text-slate-600">{emptyDescription}</p>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      {groupedItems ? (
        groupedItems.map((yearGroup) => (
          <section
            key={yearGroup.year}
            className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm"
          >
            <div className="border-b border-[#e5edf6] bg-[#f8fbff] px-4 py-3 md:px-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1a3f70]">
                Year
              </p>
              <h3 className="mt-1 text-lg font-semibold text-[#0f2f66]">
                {yearGroup.year}
              </h3>
            </div>

            <div className="space-y-4 p-4 md:p-5">
              {yearGroup.faculties.map((facultyGroup) => (
                <section
                  key={`${yearGroup.year}-${facultyGroup.faculty}`}
                  className="overflow-hidden rounded-xl border border-[#e5edf6]"
                >
                  <div className="border-b border-[#e5edf6] bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Faculty
                    </p>
                    <h4 className="mt-1 text-base font-semibold text-slate-900">
                      {facultyGroup.faculty}
                    </h4>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-slate-700">
                      <thead className="bg-white text-xs uppercase tracking-[0.08em] text-slate-600">
                        <tr>
                          <th scope="col" className="px-4 py-3.5 font-semibold">
                            {itemTypeLabel}
                          </th>
                          <th scope="col" className="px-4 py-3.5 font-semibold">
                            Title / Heading
                          </th>
                          <th scope="col" className="px-4 py-3.5 font-semibold">
                            Preview
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 font-semibold text-right"
                          >
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e5edf6]">
                        {renderRows(facultyGroup.items)}
                      </tbody>
                    </table>
                  </div>
                </section>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-white text-xs uppercase tracking-[0.08em] text-slate-600">
                <tr>
                  <th scope="col" className="px-4 py-3.5 font-semibold">
                    {itemTypeLabel}
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">
                    Title / Heading
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">
                    Preview
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 font-semibold text-right"
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5edf6]">
                {renderRows(items)}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
