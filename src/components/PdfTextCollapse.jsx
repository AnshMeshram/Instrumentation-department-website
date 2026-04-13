function getLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function PdfTextCollapse({ title, subtitle, text, pageLabel }) {
  const lines = getLines(text);
  const preview = lines.slice(0, 4).join("  •  ");

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow border border-slate-200 bg-slate-50"
    >
      <div className="collapse-title flex min-h-0 items-start gap-3 py-4 pr-12">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1a3f70]">
            {pageLabel}
          </p>
          <h3 className="mt-1 text-sm font-semibold text-slate-900 md:text-base">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{preview}</p>
        </div>
      </div>

      <div className="collapse-content pt-0">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          {subtitle ? (
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
              {subtitle}
            </p>
          ) : null}

          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {lines.map((line, index) => (
              <div
                key={`${pageLabel}-${index}`}
                className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700"
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
