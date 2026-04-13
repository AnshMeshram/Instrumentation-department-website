import { Badge } from "./ui/badge";

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

export default function PatentTable({ patents }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-white text-xs uppercase tracking-[0.08em] text-slate-600">
            <tr>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Title / Topic
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Faculty / Students
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Application No.
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Application Date
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Granted Date
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Status
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5edf6]">
            {patents.map((patent) => {
              const badgeStyle = statusStyles[patent.status] || "default";

              return (
                <tr
                  key={patent.id}
                  className="align-top transition hover:bg-[#f9fafb]"
                >
                  <td className="max-w-xs px-4 py-4 font-medium leading-6 text-slate-900">
                    {patent.title}
                  </td>
                  <td className="max-w-sm px-4 py-4 leading-6">
                    {patent.facultyStudents.join(", ")}
                  </td>
                  <td className="px-4 py-4 text-slate-800">
                    {patent.applicationNumber}
                  </td>
                  <td className="px-4 py-4 text-slate-800">
                    {formatDate(patent.applicationDate)}
                  </td>
                  <td className="px-4 py-4 text-slate-800">
                    {formatDate(patent.grantedDate)}
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={badgeStyle}>{patent.status}</Badge>
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant="type">{patent.type}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
