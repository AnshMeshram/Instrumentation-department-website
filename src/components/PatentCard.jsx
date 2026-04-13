import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const statusStyles = {
  Applied: "applied",
  Published: "published",
  Granted: "granted",
};

export default function PatentCard({ patent }) {
  const badgeStyle = statusStyles[patent.status] || "default";

  return (
    <Card className="transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-6 text-slate-900">
            {patent.title}
          </h3>

          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <Badge variant={badgeStyle}>{patent.status}</Badge>
            <Badge variant="type">{patent.type}</Badge>
          </div>
        </div>

        <div className="mt-4 h-px w-full bg-[#e6edf7]" />

        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="font-medium text-slate-500">Faculty / Students</dt>
            <dd className="mt-1 leading-6 text-slate-700">
              {patent.facultyStudents.join(", ")}
            </dd>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-lg bg-white p-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Application No.
              </dt>
              <dd className="mt-1 break-all text-sm font-medium text-slate-800">
                {patent.applicationNumber}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Application Date
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                {formatDate(patent.applicationDate)}
              </dd>
            </div>
          </div>

          <div>
            <dt className="font-medium text-slate-500">Granted Date</dt>
            <dd className="mt-1 text-slate-700">
              {formatDate(patent.grantedDate)}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
