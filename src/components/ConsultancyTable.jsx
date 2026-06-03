import { Badge } from "./ui/badge";

const statusStyles = {
  Completed: "granted",
  Ongoing: "published",
};

export default function ConsultancyTable({ consultancies }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[0_22px_50px_-28px_rgba(0,0,0,0.25)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-primary)] px-4 py-4 text-white md:px-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/60">
          Consultancy pipeline
        </p>
        <p className="mt-1 text-sm font-medium text-white/80">
          Project status, leadership and funding overview.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-[var(--color-text)]">
          <thead className="bg-[var(--color-surface-soft)]/80 text-xs uppercase tracking-[0.08em] text-[var(--color-text-soft)]">
            <tr>
              <th scope="col" className="px-4 py-4 font-semibold">
                Title
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Project Leader
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Funding Agency
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Amount (Rs. in lakhs)
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Status
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Year
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {consultancies.map((consultancy) => {
              const badgeVariant =
                statusStyles[consultancy.status] || "default";

              return (
                <tr
                  key={consultancy.id}
                  className="align-top transition hover:bg-[var(--color-surface-soft)]/70"
                >
                  <td className="max-w-xs px-4 py-5 font-medium leading-6 text-[var(--color-heading)]">
                    {consultancy.title}
                  </td>
                  <td className="max-w-xs px-4 py-5 leading-6 text-[var(--color-text)]">
                    {consultancy.projectLeader}
                  </td>
                  <td className="max-w-sm px-4 py-5 leading-6 text-[var(--color-text)]">
                    {consultancy.fundingAgency}
                  </td>
                  <td className="px-4 py-5 text-[var(--color-text)]">
                    {consultancy.amount}
                  </td>
                  <td className="px-4 py-5">
                    <Badge variant={badgeVariant}>{consultancy.status}</Badge>
                  </td>
                  <td className="px-4 py-5 text-[var(--color-text)]">
                    {consultancy.yearLabel}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 border-t border-[var(--color-border)] bg-[var(--color-surface-soft)]/20 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-medium text-[var(--color-text-soft)]">
          Showing {consultancies.length} of {consultancies.length} consultancies
        </span>
      </div>
    </div>
  );
}
