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
    <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-white text-xs uppercase tracking-[0.08em] text-slate-600">
            <tr>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Title / Topic
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                PI / Co-PI
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Sanctioned Date
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Grant
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Status
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Sponsor
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Duration
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5edf6]">
            {papers.map((paper) => {
              const badgeStyle = statusStyles[paper.status] || "default";

              return (
                <tr
                  key={paper.id}
                  className="align-top transition hover:bg-[#f9fafb]"
                >
                  <td className="max-w-xs px-4 py-4 font-medium leading-6 text-slate-900">
                    {paper.title}
                  </td>
                  <td className="max-w-sm px-4 py-4 leading-6">
                    {paper.investigators.join(", ")}
                  </td>
                  <td className="px-4 py-4 text-slate-800">
                    {formatDate(paper.sanctionedDate)}
                  </td>
                  <td className="px-4 py-4 text-slate-800">
                    {paper.grantAmount}
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={badgeStyle}>{paper.status}</Badge>
                  </td>
                  <td className="max-w-xs px-4 py-4 leading-6 text-slate-800">
                    {paper.sponsoringAuthority}
                  </td>
                  <td className="px-4 py-4 text-slate-800">{paper.duration}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
