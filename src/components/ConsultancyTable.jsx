import { Badge } from "./ui/badge";

const statusStyles = {
  Completed: "granted",
  Ongoing: "published",
};

export default function ConsultancyTable({ consultancies }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-white text-xs uppercase tracking-[0.08em] text-slate-600">
            <tr>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Title
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Project Leader
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Funding Agency
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Amount (Rs. in lakhs)
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Status
              </th>
              <th scope="col" className="px-4 py-3.5 font-semibold">
                Year
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5edf6]">
            {consultancies.map((consultancy) => {
              const badgeVariant =
                statusStyles[consultancy.status] || "default";

              return (
                <tr
                  key={consultancy.id}
                  className="align-top transition hover:bg-[#f9fafb]"
                >
                  <td className="max-w-xs px-4 py-4 font-medium leading-6 text-slate-900">
                    {consultancy.title}
                  </td>
                  <td className="max-w-xs px-4 py-4 leading-6 text-slate-800">
                    {consultancy.projectLeader}
                  </td>
                  <td className="max-w-sm px-4 py-4 leading-6 text-slate-800">
                    {consultancy.fundingAgency}
                  </td>
                  <td className="px-4 py-4 text-slate-800">
                    {consultancy.amount}
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={badgeVariant}>{consultancy.status}</Badge>
                  </td>
                  <td className="px-4 py-4 text-slate-800">
                    {consultancy.yearLabel}
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
