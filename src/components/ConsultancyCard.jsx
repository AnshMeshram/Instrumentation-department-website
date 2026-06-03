import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const statusStyles = {
  Completed: "granted",
  Ongoing: "published",
};

export default function ConsultancyCard({ consultancy }) {
  const badgeVariant = statusStyles[consultancy.status] || "default";

  return (
    <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-6 text-[var(--color-heading)]">
            {consultancy.title}
          </h3>

          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <Badge variant={badgeVariant}>{consultancy.status}</Badge>
            <Badge variant="type">{consultancy.yearLabel}</Badge>
          </div>
        </div>

        <div className="mt-4 h-px w-full bg-[var(--color-border)]" />

        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="font-medium text-[var(--color-text-soft)]">Project Leader</dt>
            <dd className="mt-1 leading-6 text-[var(--color-text)]">
              {consultancy.projectLeader}
            </dd>
          </div>

          <div>
            <dt className="font-medium text-[var(--color-text-soft)]">Funding Agency</dt>
            <dd className="mt-1 leading-6 text-[var(--color-text)]">
              {consultancy.fundingAgency}
            </dd>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-lg bg-white p-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-soft)]">
                Amount (Rs. in lakhs)
              </dt>
              <dd className="mt-1 text-sm font-medium text-[var(--color-heading)]">
                {consultancy.amount}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-soft)]">
                Year
              </dt>
              <dd className="mt-1 text-sm font-medium text-[var(--color-heading)]">
                {consultancy.yearLabel}
              </dd>
            </div>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
