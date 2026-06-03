import { Badge } from "./ui/badge";

function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const statusStyles = {
  Ongoing: "published",
  Completed: "granted",
};

export default function ResearchPaperTable({ papers }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[0_22px_50px_-28px_rgba(0,0,0,0.25)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-primary)] px-4 py-4 text-white md:px-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
          Research project register
        </p>
        <p className="mt-1 text-sm font-medium text-white/80">
          Sanctioned dates, sponsors and current status.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-[var(--color-text)]">
          <thead className="bg-[var(--color-surface-soft)]/80 text-xs uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
            <tr>
              <th scope="col" className="px-4 py-4 font-semibold">
                Title / Topic
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                PI / Co-PI
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Sanctioned Date
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Grant
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Status
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Sponsor
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Duration
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {papers.map((paper) => {
              const badgeStyle = statusStyles[paper.status] || "default";

              return (
                <tr
                  key={paper.id}
                  className="align-top transition hover:bg-[var(--color-surface-soft)]/70"
                >
                  <td className="max-w-xs px-4 py-5 font-medium leading-6 text-[var(--color-heading)]">
                    {paper.title}
                  </td>
                  <td className="max-w-sm px-4 py-5 leading-6 text-[var(--color-text)]">
                    {paper.investigators.join(", ")}
                  </td>
                  <td className="px-4 py-5 text-[var(--color-text)]">
                    {formatDate(paper.sanctionedDate)}
                  </td>
                  <td className="px-4 py-5 text-[var(--color-text)]">
                    {paper.grantAmount}
                  </td>
                  <td className="px-4 py-5">
                    <Badge variant={badgeStyle}>{paper.status}</Badge>
                  </td>
                  <td className="max-w-xs px-4 py-5 leading-6 text-[var(--color-text)]">
                    {paper.sponsoringAuthority}
                  </td>
                  <td className="px-4 py-5 text-[var(--color-text)]">
                    {paper.duration}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 border-t border-[var(--color-border)] bg-[var(--color-surface-soft)]/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-medium text-[var(--color-text-soft)]">
          Showing {papers.length} of {papers.length} projects
        </span>
      </div>
    </div>
  );
}
