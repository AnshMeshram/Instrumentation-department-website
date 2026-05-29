import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

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

export default function ResearchPaperCard({ paper }) {
  const badgeStyle = statusStyles[paper.status] || "default";

  return (
    <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-6 text-[var(--color-heading)]">
            {paper.title}
          </h3>

          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <Badge variant={badgeStyle}>{paper.status}</Badge>
            <Badge variant="type">{paper.year}</Badge>
          </div>
        </div>

        <div className="mt-4 h-px w-full bg-[var(--color-border)]" />

        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="font-medium text-[var(--color-text-soft)]">
              PI / Co-PI
            </dt>
            <dd className="mt-1 leading-6 text-[var(--color-text)]">
              {paper.investigators.join(", ")}
            </dd>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-soft)]/50 p-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-soft)]">
                Sanctioned Date
              </dt>
              <dd className="mt-1 text-sm font-medium text-[var(--color-heading)]">
                {formatDate(paper.sanctionedDate)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-soft)]">
                Grant
              </dt>
              <dd className="mt-1 text-sm font-medium text-[var(--color-heading)]">
                {paper.grantAmount}
              </dd>
            </div>
          </div>

          <div>
            <dt className="font-medium text-[var(--color-text-soft)]">
              Sponsor
            </dt>
            <dd className="mt-1 text-[var(--color-text)]">
              {paper.sponsoringAuthority}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-[var(--color-text-soft)]">
              Duration
            </dt>
            <dd className="mt-1 text-[var(--color-text)]">{paper.duration}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
